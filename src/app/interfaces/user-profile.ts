import { Subscription } from 'rxjs';

export interface UserProfile {
  sub: Subscription;
  error: string;
  loading: boolean;
  data: {
    img: File | string;
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
    role: string;
    joined: string;
    bio: string;
  };
  hasReact: string;
}

export interface UserProfileAPI {
  img: string | File;
  email: string;
  firstname: string;
  lastname: string;
  bio: string;
}
