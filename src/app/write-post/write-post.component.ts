import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AreaList } from '../interfaces/areas-list';
import { WritePost } from '../interfaces/write-post';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';
import { AreaService } from '../services/area.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-write-post',
  templateUrl: './write-post.component.html',
  styleUrls: ['./write-post.component.css'],
})
export class WritePostComponent implements OnInit {
  apiUrl;

  areaList: AreaList = {
    sub: null!,
    error: null!,
    loading: false,
    items: [],
  };

  post: WritePost = {
    sub: null!,
    error: null!,
    loading: false,
    data: {
      title: null!,
      area: null!,
      body: null!,
      img: '',
    },
  };

  image;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private areaService: AreaService,
    private postService: PostService,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: [''],
      area: [''],
      body: [''],
      img: [''],
    });
  }

  ngOnInit(): void {
    this.getAreas();
  }

  savePost() {
    this.post.loading = true;
    this.post.error;

    this.form = this.fb.group({
      title: [this.post.data.title],
      area: [this.post.data.area],
      body: [this.post.data.body],
      img: [this.post.data.img],
    });

    this.postService.writePost(this.form.value).subscribe({
      next: (res: any) => {
        this.router.navigate(['/all_posts']);
      },
      error: (err) => {
        (this.post.error = err),
          (this.post.loading = false),
          this.post.sub.unsubscribe();
      },
      complete: () => {
        this.post.loading = false;
        this.post.sub.unsubscribe();
      },
    });
  }

  getAreas() {
    this.areaList.loading = true;
    this.areaList.error;

    this.areaService.getAreaList().subscribe({
      next: (res: any) => {
        (this.areaList = res), console.log(this.areaList.items[0]);
      },
      error: (err) => {
        (this.areaList.error = err),
          (this.areaList.loading = false),
          this.areaList.sub.unsubscribe();
      },
      complete: () => {
        this.areaList.loading = false;
        this.areaList.sub.unsubscribe();
      },
    });
  }

  fileChangeEvent(e) {
    if (e.target.files.length > 0) {
      const file = (e.target as HTMLInputElement).files![0];
      const reader = new FileReader();
      reader.onload = () => {
        this.post.data.img = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
