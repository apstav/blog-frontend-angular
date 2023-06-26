import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  UrlSegment,
  ɵafterNextNavigation,
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AllPostsModel } from '../interfaces/all-posts-model';
import { User } from '../interfaces/user';
import { UserProfile } from '../interfaces/user-profile';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  User: Observable<User> = new Observable<User>();
  areaId: string = 'all';
  userProfile: UserProfile = {
    sub: new Subscription(),
    error: null!,
    loading: null!,
    data: {
      img: null!,
      _id: null!,
      email: null!,
      firstname: null!,
      lastname: null!,
      role: null!,
      joined: null!,
      bio: null!,
    },
    hasReact: null!,
  };

  userAllPosts: AllPostsModel = {
    sub: new Subscription(),
    error: null!,
    loading: false,
    items: [],
    totalPosts: 0,
    totalPages: [],
    currentPage: 0,
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.User = this.authService.$User;
    this.route.params.subscribe((params) => {
      if (!params['areaId']) {
        this.areaId = 'all';
        this.getUserPosts(params['userId'], 'all');
      } else {
        this.areaId = params['areaId'];
      }
      this.getUserProfile(params['userId']);
      this.getUserPosts(params['userId'], this.areaId);
    });
  }

  getUserProfile(id: string) {
    this.User = this.authService.$User;
    this.userProfile.loading = true;
    this.userProfile.error;

    this.authService.getUserProfile(id).subscribe({
      next: (res: any) => {
        this.userProfile.data = res;
      },
      error: (err) => {
        console.log(err),
          (this.userProfile.error = err),
          (this.userProfile.loading = false),
          this.userProfile.sub.unsubscribe();
      },
      complete: () => {
        this.userProfile.loading = false;
      },
    });
  }

  getUserPosts(id: string, areaId: string) {
    this.userAllPosts.loading = true;
    this.userAllPosts.error;

    this.userAllPosts.sub = this.postService.getpostList(id, areaId).subscribe({
      next: (res: any) => {
        (this.userAllPosts.items = res.result),
          (this.userAllPosts.loading = false),
          this.userAllPosts.sub.unsubscribe();
      },
      error: (err) => {
        (this.userAllPosts.error = err),
          (this.userAllPosts.loading = false),
          this.userAllPosts.sub.unsubscribe();
      },
    });
  }
}
