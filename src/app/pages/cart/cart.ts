import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, CartItem } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.html',
  styleUrls: ['cart.scss']
})
export class CartPage implements OnInit, OnDestroy {
  items: CartItem[] = [];
  private sub = new Subscription();

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.sub.add(
      this.cartService.items.subscribe(items => {
        this.items = items;
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  get total() { return this.cartService.total; }

  remove(id: number) { this.cartService.remove(id); }

  updateQty(id: number, qty: number) { this.cartService.updateQuantity(id, qty); }

  goToShop() { this.router.navigate(['/shop']); }

  checkout() {
    alert('Thank you! Our team will reach out to confirm your order.');
    this.cartService.clear();
  }
}
