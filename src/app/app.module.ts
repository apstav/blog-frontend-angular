import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { PostComponent } from './post/post.component';
import { LoginComponent } from './login/login.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { WritePostComponent } from './write-post/write-post.component';
import { ContactComponent } from './contact/contact.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { FooterComponent } from './common/footer/footer.component';
import { AreaComponent } from './common/area/area.component';
import { TokenInterceptorService } from './services/token-interceprtor.service';

@NgModule({
  declarations: [
    AppComponent,
    AllPostsComponent,
    PostComponent,
    LoginComponent,
    ProfileEditComponent,
    ProfileComponent,
    SignupComponent,
    WritePostComponent,
    ContactComponent,
    NavbarComponent,
    FooterComponent,
    AreaComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
