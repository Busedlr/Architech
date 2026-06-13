import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BouquetsService, Bouquet } from 'src/app/services/bouquets.service';

type Filter = 'all' | 'wedding' | 'ceremony' | 'premium';

@Component({
  selector: 'app-shop',
  templateUrl: 'shop.html',
  styleUrls: ['shop.scss']
})
export class ShopPage implements OnInit {
  bouquets: Bouquet[] = [];
  activeFilter: Filter = 'all';
  filters: { key: Filter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'wedding', label: 'Wedding' },
    { key: 'ceremony', label: 'Ceremony' },
    { key: 'premium', label: 'Premium' }
  ];

  constructor(private bouquetsService: BouquetsService, private router: Router) {}

  ngOnInit() {
    this.bouquets = this.bouquetsService.getAll();
  }

  setFilter(f: Filter) {
    this.activeFilter = f;
    this.bouquets = this.bouquetsService.getByCategory(f);
  }

  goToBouquet(id: number) {
    this.router.navigate(['/bouquet', id]);
  }
}
