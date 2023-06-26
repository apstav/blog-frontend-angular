import { Subscription } from 'rxjs';

export interface WritePost {
  sub: Subscription;
  error: string;
  loading: boolean;
  data: {
    title: string;
    area: string;
    body: string;
    img: string;
  };
}
