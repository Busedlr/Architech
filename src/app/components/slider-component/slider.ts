import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {
	IonSlides,
	ModalController,
	Events,
	AlertController,
	PopoverController,
} from '@ionic/angular';
import { ProjectData } from 'src/app/services/project-data';
import { SegmentsService } from 'src/app/services/segments-service';
import { ImageDisplayModalPage } from 'src/app/modals/image-display/image-display.page';
import { EditPopover } from '../segment-menu/segment-menu';

@Component({
	selector: 'slider',
	templateUrl: './slider.html',
	styleUrls: ['./slider.scss'],
})
export class SliderComponent implements OnInit {
	@ViewChild('slides', { static: false }) slides: IonSlides;
	@Input('items') items: any;
	@Input('itemType') itemType: string;
	files: any = [];
	images: any = [];
	flagged: any = [];
	slideOpts: any;
	loading: boolean = true;
	changeItemName: number = null;
	editMode: boolean;
	itemClicked: any;

	constructor(
		public projectData: ProjectData,
		public segmentsService: SegmentsService,
		public modalController: ModalController,
		public alertController: AlertController,
		public popoverCtrl: PopoverController,
		public events: Events
	) {
		events.subscribe('get-active-index', () => {
			this.slides.getActiveIndex().then((res) => {
				this.segmentsService.activeIndex = res;
			});
		});

		events.subscribe('change slide per view', (number) => {
			this.changeSlidesPerView(number);
			this.projectData.changeSettings('slider', 'slides_per_view', number);
		});
	}

	async ngOnInit() {
		const settings = await this.projectData.getSettings();

		this.slideOpts = {
			slidesPerView: settings.slider.slides_per_view,
			freeMode: settings.slider.free_mode,
			allowTouchMove: false,
		};
	}

	async presentPopover(ev: any) {
		const popover = await this.popoverCtrl.create({
			component: EditPopover,
			event: ev,
			translucent: true,
		});

		popover.onWillDismiss().then(async (res) => {
			if (res) {
				this.editMode = res.data;
				this.itemClicked = await this.slides.getActiveIndex();
			}
		});

		this.segmentsService.getActiveImageIndex();
		return await popover.present();
	}

	closeEditMode() {
		this.editMode = false;
		this.itemClicked = null;
	}

	async changeSlidesPerView(number) {
		const swiper = await this.slides.getSwiper();
		swiper.params.slidesPerView = number;
		this.projectData.settings.slides_per_view = number;
	}

	itemClick(itemIndex) {
		this.changeItemName = null;
		if (!this.editMode) {
			this.openModal(itemIndex);
		} else {
			this.itemClicked = itemIndex;
		}
	}

	async openModal(openingImageIndex) {
		const modal = await this.modalController.create({
			component: ImageDisplayModalPage,
			componentProps: {
				index: openingImageIndex,
			},
			cssClass: 'images-modal',
		});
		return await modal.present();
	}

	simulateClick(id) {
		document.getElementById(id).click();
	}

	async deleteImage() {
		let item = this.segmentsService.images[this.segmentsService.itemClicked];
		this.segmentsService.itemsToDelete.push(item);
		this.segmentsService.images.splice(this.segmentsService.itemClicked, 1);
		if (this.segmentsService.images.length <= 0) {
			this.segmentsService.toggleEditMode();
			this.segmentsService.itemClicked = null;
		}
	}

	onChangeName(i) {
		this.changeItemName = i;
	}

	async changeName(id, image) {
		this.changeItemName = null;
		const newName = document.getElementById(id) as HTMLInputElement;
		if (newName.value) {
			const name = newName.value + this.segmentsService.getDocType(image);
			const metadata = await this.projectData.updateMetadata(
				name,
				'extension',
				image.fullPath
			);
			this.segmentsService.images[this.segmentsService.itemClicked].name =
				metadata.customMetadata.name;
		}
	}

	closeChangeName() {
		this.changeItemName = null;
	}

	toggleImageFlag(image) {
		image.flagged = !image.flagged;
	}
}
