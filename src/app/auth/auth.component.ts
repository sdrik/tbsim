import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'tbsim-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnDestroy {
  private readonly isLoggedInSubscription: Subscription;

  showLoginButton = false;
  showLogoutButton = false;

  constructor(public readonly auth: AuthService) {
    this.isLoggedInSubscription = auth.isLoggedIn.subscribe((isLoggedIn) => {
      this.showLoginButton = !isLoggedIn;
      this.showLogoutButton = isLoggedIn;
    });
  }

  ngOnDestroy(): void {
    this.isLoggedInSubscription.unsubscribe();
  }
}
