import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BouquetsService, Bouquet } from 'src/app/services/bouquets.service';

@Component({
  selector: 'home',
  templateUrl: 'home.html',
  styleUrls: ['home.scss']
})
export class Home implements OnInit {
  featuredBouquets: Bouquet[] = [];
  email = '';
  subscribed = false;

  constructor(private bouquetsService: BouquetsService, private router: Router) {}

  ngOnInit() {
    this.featuredBouquets = this.bouquetsService.getFeatured();
  }

  goToShop() {
    this.router.navigate(['/shop']);
  }

  goToBouquet(id: number) {
    this.router.navigate(['/bouquet', id]);
  }

  subscribe() {
    if (this.email.trim()) {
      this.subscribed = true;
    }
  }
}
