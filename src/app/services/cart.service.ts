import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Bouquet } from './bouquets.service';

export interface CartItem {
  bouquet: Bouquet;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private items$ = new BehaviorSubject<CartItem[]>([]);

  get items() {
    return this.items$.asObservable();
  }

  get count(): number {
    return this.items$.value.reduce((sum, item) => sum + item.quantity, 0);
  }

  get total(): number {
    return this.items$.value.reduce((sum, item) => sum + item.bouquet.price * item.quantity, 0);
  }

  get snapshot(): CartItem[] {
    return this.items$.value;
  }

  add(bouquet: Bouquet): void {
    const current = [...this.items$.value];
    const existing = current.find(i => i.bouquet.id === bouquet.id);
    if (existing) {
      existing.quantity++;
      this.items$.next(current);
    } else {
      this.items$.next([...current, { bouquet, quantity: 1 }]);
    }
  }

  remove(bouquetId: number): void {
    this.items$.next(this.items$.value.filter(i => i.bouquet.id !== bouquetId));
  }

  updateQuantity(bouquetId: number, qty: number): void {
    if (qty <= 0) {
      this.remove(bouquetId);
      return;
    }
    const current = [...this.items$.value];
    const item = current.find(i => i.bouquet.id === bouquetId);
    if (item) {
      item.quantity = qty;
      this.items$.next(current);
    }
  }

  clear(): void {
    this.items$.next([]);
  }
}
