import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  cartCount = 0;
  menuOpen = false;
  isHomePage = false;
  private subs = new Subscription();

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.subs.add(
      this.cartService.items.subscribe(() => {
        this.cartCount = this.cartService.count;
      })
    );
    this.subs.add(
      this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: NavigationEnd) => {
        this.isHomePage = e.urlAfterRedirects === '/home' || e.urlAfterRedirects === '/';
        this.menuOpen = false;
      })
    );
    this.isHomePage = this.router.url === '/home' || this.router.url === '/';
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  navigate(path: string) {
    this.menuOpen = false;
    this.router.navigate([path]);
  }
}
