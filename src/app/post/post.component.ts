import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PostDetailsModel, PostReact } from '../interfaces/post-details-model';
import { UserProfile } from '../interfaces/user-profile';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit, OnDestroy {
  post: PostDetailsModel = {
    sub: null!,
    error: null!,
    loading: false,
    postId: null!,
    data: null,
  };

  User: UserProfile = {
    sub: null!,
    error: null!,
    loading: false,
    data: {
      _id: '',
      firstname: null!,
      role: null!,
      img: null!,
      email: null!,
      lastname: null!,
      joined: null!,
      bio: null!,
    },
    hasReact: null!,
  };

  postReact: PostReact = {
    sub: null!,
    error: null!,
    loading: false,
    body: {
      postId: null!,
      reactName: null!,
    },
  };

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getLoggedUserData();
    this.post.postId = this.route.snapshot.paramMap.get('postId') as string;
    this.getPostDetails(this.post.postId);
  }

  ngOnDestroy(): void {
    this.User.sub.unsubscribe();
  }

  getLoggedUserData() {
    this.User.loading = true;
    this.User.error;
    this.authService.$User.subscribe({
      next: (res: any) => {
        (this.User.data = res), (this.User.loading = false);
      },
      error: (err) => {
        (this.User.error = err), (this.User.loading = false);
      },
    });
  }

  getPostDetails(postId: string) {
    this.post.error;
    this.post.loading = true;

    this.post.sub = this.postService.getPostDetails(postId).subscribe({
      next: (res: any) => {
        (this.post.data = res),
          console.log(this.post.data),
          (this.post.loading = false),
          this.post.sub.unsubscribe();
      },
      error: (err) => {
        (this.post.error = err),
          (this.post.loading = false),
          this.post.sub.unsubscribe();
      },
    });
  }

  doReact(reactName) {
    if (!this.User.data) {
      return;
    }

    this.postReact.body.postId = this.post.postId;
    this.postReact.body.reactName = reactName;

    this.postReact.loading = true;
    this.postReact.error;

    this.postService.postReact(this.postReact.body).subscribe({
      next: (res: any) => {
        this.post.data.reacts = res.reacts;
        this.checkHasReact();
      },
      error: (err) => {
        this.postReact.error = err;
        this.postReact.loading = false;
        this.postReact.sub.unsubscribe();
      },
      complete: () => {
        (this.postReact.loading = false), this.postReact.sub.unsubscribe();
      },
    });
  }

  checkHasReact() {
    this.User.hasReact;
    const REACTS = ['like', 'love', 'sad', 'funny', 'informative'];
    let checkR = [];

    REACTS.forEach((r) => {
      checkR = this.post.data.reacts[r].filter((e) => e == this.User.data._id);
      if (checkR.length > 0) {
        this.User.hasReact = r;
      }
    });
  }
}
