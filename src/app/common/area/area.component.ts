import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AreasModel } from 'src/app/interfaces/areas-model';
import { AreaService } from 'src/app/services/area.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css'],
})
export class AreaComponent implements OnInit {
  @Input() areaId: string | undefined;
  @Input() userName: string | undefined;
  @Input() userId: string | undefined;

  sectionTitle: string | undefined;
  areas: AreasModel = {
    sub: null!,
    error: null!,
    loading: false,
    items: [],
    totalPosts: 0,
    currentAreaId: 'all',
  };

  constructor(
    private areaService: AreaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.userName) {
      this.sectionTitle = this.userName + "'s";
    } else {
      this.sectionTitle = 'Post';
    }

    if (!this.userId) {
      this.userId = 'all';
    }

    if (!this.areaId) {
      this.areaId = 'all';
    }

    this.route.params.subscribe((params) => {
      if (!params['areaId']) {
        this.areas.currentAreaId = 'all';
      } else {
        this.areas.currentAreaId = params['areaId'];
      }
    });

    this.getAreaPostsCount();
  }

  getAreaPostsCount() {
    this.areas.loading = true;
    this.areas.error = '';

    this.areas.sub = this.areaService.getAreaPostsCount(this.userId).subscribe({
      next: (res: any) => {
        (this.areas.items = res),
          this.areas.items.forEach((c) => {
            //this.areas.totalPosts += c.count;
            //c.count += 1;
            console.log(c.count);
          }),
          (this.areas.loading = false),
          this.areas.sub.unsubscribe();
      },
      error: (err) => {
        (this.areas.error = err),
          (this.areas.loading = false),
          this.areas.sub.unsubscribe();
      },
    });
  }
}
