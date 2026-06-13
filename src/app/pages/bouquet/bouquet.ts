import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BouquetsService, Bouquet } from 'src/app/services/bouquets.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-bouquet',
  templateUrl: 'bouquet.html',
  styleUrls: ['bouquet.scss']
})
export class BouquetPage implements OnInit {
  bouquet: Bouquet | undefined;
  related: Bouquet[] = [];
  added = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bouquetsService: BouquetsService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.bouquet = this.bouquetsService.getById(id);
      this.related = this.bouquetsService.getAll()
        .filter(b => b.id !== id)
        .slice(0, 3);
      this.added = false;
    });
  }

  addToCart() {
    if (this.bouquet) {
      this.cartService.add(this.bouquet);
      this.added = true;
      setTimeout(() => this.added = false, 2500);
    }
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToBouquet(id: number) {
    this.router.navigate(['/bouquet', id]);
  }

  goToShop() {
    this.router.navigate(['/shop']);
  }
}
