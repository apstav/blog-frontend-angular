import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoginModel } from '../interfaces/login-model';
import { Router } from '@angular/router';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginData: LoginModel = {
    sub: null!,
    error: null!,
    loading: false,
    data: {
      email: null!,
      password: null!,
    },
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.utils.page.next('login');
  }

  ngOnDestroy(): void {
    this.utils.page.next('');
  }

  login() {
    this.loginData.data = this.utils.trimObject(this.loginData.data);

    this.loginData.error = null!;
    this.loginData.loading = true;

    this.loginData.sub = this.authService.login(this.loginData.data).subscribe(
      {
        next: (res) => {
          this.loginData.sub.unsubscribe();
          this.router.navigate(['/profile', res.user._id]);
        },
        error: (err) => {
          this.loginData.error = err;
          this.loginData.loading = false;
          this.loginData.sub.unsubscribe();
        },
      }
      // (res) => {
      //   this.loginData.loading = false;
      //   this.loginData.sub.unsubscribe();
      //   this.router.navigate(['/profile', res.user._id]);
      // },
      // (err) => {
      //   this.loginData.error = err;
      //   this.loginData.loading = false;
      //   this.loginData.sub.unsubscribe();
      // }
    );
  }
}
