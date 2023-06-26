import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllPostsModel } from '../interfaces/all-posts-model';
import { PostService } from '../services/post.service';
import { Subscription } from 'rxjs';

const apiUrl = 'http://localhost:3000';
@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css'],
})
export class AllPostsComponent implements OnInit {
  allPosts: AllPostsModel = {
    sub: new Subscription(),
    error: null!,
    loading: false,
    items: []!,
    totalPosts: 0,
    totalPages: [],
    currentPage: 0,
  };

  currentAreaId: string = 'all';
  constructor(public postService: PostService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getAllPosts();
      if (!params['areaId']) {
        this.currentAreaId = 'all';
        this.getAllPosts();
      } else {
        this.currentAreaId = params['areaId'];
        this.getAllPosts();
      }
    });
  }
  getAllPosts() {
    this.allPosts.loading = true;
    this.allPosts.error;
    //this.getAllPosts() =
    this.postService.getpostList('all', this.currentAreaId).subscribe({
      next: (res: any) => {
        (this.allPosts.items = res.result),
          (this.allPosts.totalPosts = res.totalPosts),
          // (this.allPosts.currentPage = res.currentPage),
          // (this.allPosts.totalPages = Array(res.totalPages)
          //   .fill(5)
          //   .map((x, i) => i)),
          (this.allPosts.loading = false),
          this.allPosts.sub.unsubscribe();
      },
      error: (err) => {
        (this.allPosts.error = err),
          (this.allPosts.loading = false),
          this.allPosts.sub.unsubscribe();
      },
    });
  }
}

// changePage(page) {
//   this.allPosts.loading = true;
//   this.allPosts.error;

//   this.postService.getpostList('all', this.currentAreaId, page).subscribe(
//     (res: any) => {
//       this.allPosts.items = res.result;
//       this.allPosts.totalPosts = res.totalPosts;
//       this.allPosts.currentPage = res.currentPage;
//       this.allPosts.totalPages = Array(res.totalPages)
//         .fill(5)
//         .map((x, i) => i);

//       this.allPosts.loading = false;
//       this.allPosts.sub.unsubscribe();
//     },
//     (err) => {
//       this.allPosts.error = err;
//       this.allPosts.loading = false;
//       this.allPosts.sub.unsubscribe();
//     }
//   );
//}
