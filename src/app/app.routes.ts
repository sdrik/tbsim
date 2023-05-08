import { Route } from '@angular/router';
import { SignInComponent } from './auth/sign-in.component';
import { AuthService } from './auth/auth.service';

export const appRoutes: Route[] = [
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [AuthService.signInGuard],
  },
];
