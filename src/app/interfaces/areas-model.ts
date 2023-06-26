import { Subscription } from 'rxjs';

export interface AreasModel {
  sub: Subscription;
  error: string;
  loading: boolean;
  items: {
    _id: string;
    areaname: string;
    count: number;
  }[];
  totalPosts: number;
  currentAreaId: string;
}
