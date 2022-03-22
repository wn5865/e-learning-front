import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseListComponent } from './home/course-list/course-list.component';
import { LectureDetailComponent } from './lecture-detail/lecture-detail.component';

import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { CourseFormComponent } from './course-form/course-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/:id', component: CourseDetailComponent },
  {
    path: 'courses/:courseId/lectures/:lectureId',
    component: LectureDetailComponent,
    canActivate: [OktaAuthGuard],
  },
  {
    path: 'register-course',
    component: CourseFormComponent,
    canActivate: [OktaAuthGuard],
  },
  { path: 'login/callback', component: OktaCallbackComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
