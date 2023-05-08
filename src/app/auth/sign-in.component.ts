import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from './auth.service';

@Component({
  selector: 'tbsim-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  loginForm = new FormGroup({
    email: new FormControl(null),
    password: new FormControl(null),
  });
  faFacebookF = faFacebookF;
  faGoogle = faGoogle;

  constructor(public readonly auth: AuthService) {}

  onSubmit(formData: FormGroup, loginDirective: FormGroupDirective) {
    const email = formData.value.email;
    const password = formData.value.password;
  }

  /*
  async loginAnonymously() {
    await signInAnonymously(this.auth);
    await this.router.navigate(['/']);
  }
*/
}
