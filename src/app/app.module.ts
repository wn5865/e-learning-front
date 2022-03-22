// modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// services
import { UserService } from './services/user.service';
import { CourseService } from './services/course.service';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ShowcaseComponent } from './home/showcase/showcase.component';
import { FooterComponent } from './footer/footer.component';

// course list
import { CourseListComponent } from './home/course-list/course-list.component';
import { CourseCardComponent } from './home/course-list/course-card/course-card.component';

// navigation bar
import { NavbarComponent } from './navbar/navbar.component';
import { NavCategoriesComponent } from './navbar/nav-categories/nav-categories.component';
import { NavSearchComponent } from './navbar/nav-search/nav-search.component';
import { NavLoginStatusComponent } from './navbar/nav-login-status/nav-login-status.component';

// course detail
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseReviewsComponent } from './course-detail/course-reviews/course-reviews.component';
import { CourseHeaderComponent } from './course-detail/course-header/course-header.component';
import { CourseAccordionComponent } from './course-detail/course-accordion/course-accordion.component';

// lecture detail
import { LectureDetailComponent } from './lecture-detail/lecture-detail.component';
import { LectureSideNavComponent } from './lecture-detail/lecture-side-nav/lecture-side-nav.component';
import { LectureVideoComponent } from './lecture-detail/lecture-video/lecture-video.component';

// course form
import { CourseFormComponent } from './course-form/course-form.component';

// shared
import { InstructorComponent } from './shared/instructor/instructor.component';
import { CourseRatingComponent } from './shared/course-rating/course-rating.component';

// Okta Configuration
import appConfig from './config/app-config';
import { OktaAuth } from '@okta/okta-auth-js';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
const oktaAuth = new OktaAuth(appConfig.oidc);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ShowcaseComponent,
    NavCategoriesComponent,
    NavSearchComponent,
    FooterComponent,
    CourseCardComponent,
    InstructorComponent,
    CourseRatingComponent,
    CourseListComponent,
    CourseDetailComponent,
    CourseReviewsComponent,
    CourseHeaderComponent,
    CourseAccordionComponent,
    LectureDetailComponent,
    LectureSideNavComponent,
    LectureVideoComponent,
    NavLoginStatusComponent,
    CourseFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    OktaAuthModule,
  ],
  providers: [
    CourseService,
    UserService,
    { provide: OKTA_CONFIG, useValue: { oktaAuth } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
