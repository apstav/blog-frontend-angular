import { Subscription } from 'rxjs';

export interface PostDetailsModel {
  sub: Subscription;
  error: string;
  loading: boolean;
  postId: string;
  data: any;
}

export interface PostReact {
  sub: Subscription;
  error: string;
  loading: boolean;
  body: {
    postId: string;
    reactName: string;
  };
}
