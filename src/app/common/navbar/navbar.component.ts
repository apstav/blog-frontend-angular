import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  page: Observable<string> | undefined;
  User: Observable<User> | undefined;

  constructor(
    private utils: UtilsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.page = this.utils.page;
    this.User = this.authService.$User;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
