import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../services/utils.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { UserProfile, UserProfileAPI } from '../interfaces/user-profile';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent implements OnInit {
  apiUrl;

  user: UserProfile = {
    sub: new Subscription(),
    error: '',
    loading: false,
    data: {
      img: null!,
      _id: '',
      email: '',
      firstname: '',
      lastname: '',
      role: '',
      joined: '',
      bio: '',
    },
    hasReact: '',
  };

  imgErr = null!;

  image;

  editUser = {
    sub: new Subscription(),
    loading: false,
    error: '',
  };
  registeredBlobUrls: any;

  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private utils: UtilsService,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: [''],
      firstname: [''],
      lastname: [''],
      bio: [''],
      img: [''],
    });
  }

  ngOnInit(): void {
    this.user.loading = true;
    this.user.error;

    //this.user.sub =
    this.authService.fetchUserData().subscribe({
      next: (res: any) => {
        (res = this.utils.makeObjectSelected(res, [
          'img',
          'firstname',
          'lastname',
          'email',
          'bio',
        ])),
          (this.user.data = res);
        // (this.user.loading = false),
        // this.user.sub.unsubscribe();
      },
      error: (err) => {
        (this.user.error = err),
          (this.user.loading = false),
          this.user.sub.unsubscribe();
      },

      complete: () => {
        this.user.loading = false;
        this.user.sub.unsubscribe();
      },
    });
  }

  editProfile() {
    this.editUser.loading = true;
    this.editUser.error;

    this.user.data = this.utils.trimObject(this.user.data);

    this.form = this.fb.group({
      email: [this.user.data.email],
      firstname: [this.user.data.firstname],
      lastname: [this.user.data.lastname],
      bio: [this.user.data.bio],
      img: [this.user.data.img],
    });
    console.log(this.form.value);
    this.authService.editUser(this.form.value).subscribe({
      next: (res: any) => {
        this.authService.$User.next({
          _id: res._id,
          firstname: res.firstname,
          role: res.role,
        });
        this.router.navigate(['/profile/_id']);
        console.log(res);
      },
      error: (err) => {
        (this.editUser.error = err),
          (this.editUser.loading = false),
          this.editUser.sub.unsubscribe();
      },
      complete: () => {
        this.editUser.loading = false;
        this.editUser.sub.unsubscribe();
      },
    });
  }

  fileChangeEvent(e) {
    if (e.target.files.length > 0) {
      //this.image = e.target.files[0];

      const file = (e.target as HTMLInputElement).files![0];

      const reader = new FileReader();
      reader.onload = () => {
        this.user.data.img = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }
}
