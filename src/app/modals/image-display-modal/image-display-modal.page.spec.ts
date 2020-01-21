import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImageDisplayModalPage } from './image-display-modal.page';

describe('ImageDisplayModalPage', () => {
  let component: ImageDisplayModalPage;
  let fixture: ComponentFixture<ImageDisplayModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageDisplayModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageDisplayModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
