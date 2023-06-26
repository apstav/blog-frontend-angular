import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupModel } from '../interfaces/signup-model';
import { AuthService } from '../services/auth.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  signupData: SignupModel = {
    sub: null!,
    error: null!,
    loading: false,
    data: {
      firstname: null!,
      lastname: null!,
      email: null!,
      password: null!,
    },
  };

  constructor(
    private _utils: UtilsService,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._utils.page.next('signup');
  }

  ngOnDestroy(): void {
    this._utils.page.next('');
  }
  signUp(): void {
    this.signupData.data = this._utils.trimObject(this.signupData.data);
    this.signupData.loading = true;
    this.signupData.error;

    this.signupData.sub = this._authService
      .signUp(this.signupData.data)
      .subscribe({
        next: (res) => {
          (this.signupData.loading = false),
            this.signupData.sub.unsubscribe(),
            this._router.navigate(['/profile', res.user._id]);
        },
        error: (err) => {
          console.error(err);
          (this.signupData.error = err),
            (this.signupData.loading = false),
            this.signupData.sub.unsubscribe();
        },
      });
  }
}
