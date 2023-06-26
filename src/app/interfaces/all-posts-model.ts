import { Subscription } from 'rxjs';

export interface AllPostsModel {
  sub: Subscription;
  error: string;
  loading: boolean;
  items: any[];
  totalPosts: number;
  totalPages: number[];
  currentPage: number;
}
