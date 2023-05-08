import { Injectable, inject } from '@angular/core';
import { traceUntilFirst } from '@angular/fire/performance';
import {
  Auth,
  FacebookAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  User,
  authState,
  getRedirectResult,
  signInWithRedirect,
  signOut,
} from '@angular/fire/auth';
import { Observable, EMPTY, map } from 'rxjs';
import { Router } from '@angular/router';
import { FirebaseError } from '@firebase/util';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static async signInGuard(): Promise<boolean> {
    const auth = inject(Auth);
    const router = inject(Router);
    try {
      const u = await getRedirectResult(auth);
      if (!!u) {
        router.navigate(['/']);
        return false;
      } else {
        return true;
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/account-exists-with-different-credential') {
          // https://github.com/firebase/firebase-js-sdk/issues/5057
          const credential = OAuthProvider.credentialFromError(error);
          const email = error.customData?.['email'];
          console.log(credential);
          console.log(email);
        }
      }
      return true;
    }
  }

  public readonly user: Observable<User | null> = EMPTY;
  public readonly isLoggedIn: Observable<boolean>;

  userData: any;

  constructor(private auth: Auth) {
    this.user = authState(this.auth);
    this.isLoggedIn = this.user.pipe(
      traceUntilFirst('auth'),
      map((u) => !!u)
    );
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(this.auth, provider);
  }

  loginWithFacebook() {
    const provider = new FacebookAuthProvider();
    signInWithRedirect(this.auth, provider);
  }

  async logout() {
    return await signOut(this.auth);
  }
}
