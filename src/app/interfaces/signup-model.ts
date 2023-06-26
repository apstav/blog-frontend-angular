import { Subscription } from 'rxjs';

export interface SignupModel {
  sub: Subscription;
  error: string;
  loading: boolean;
  data: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  };
}
