import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { PostComponent } from './post/post.component';
import { ContactComponent } from './contact/contact.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { LoginComponent } from './login/login.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { WritePostComponent } from './write-post/write-post.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/signup',
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
    //canActivate: [NoAuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    //canActivate: [NoAuthGuard],
  },
  {
    path: 'profile/:userId',
    component: ProfileComponent,
  },
  {
    path: 'profile/:userId/:areaId',
    component: ProfileComponent,
  },
  {
    path: 'write_post',
    component: WritePostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'post/details/:postId',
    component: PostComponent,
  },
  {
    path: 'all_posts',
    component: AllPostsComponent,
  },
  {
    path: 'all_posts/:areaId',
    component: AllPostsComponent,
  },
  {
    path: 'profile_edit',
    component: ProfileEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
