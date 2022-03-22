import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/shared/course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit {
  courses!: Course[];

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(() => this.getCourses());
  }

  getCourses(): void {
    const params: ParamMap = this.route.snapshot.queryParamMap;
    if (params.has('id')) {
      this.getCoursesByCategory(Number(params.get('id')));
    } else if (params.has('keyword')) {
      this.getCoursesByTitle(params.get('keyword') || '');
    } else {
      this.getAllCourses();
    }
  }

  public getAllCourses(): void {
    this.courseService.getAllCourses().subscribe((data) => {
      this.courses = data;
    });
  }
  getCoursesByCategory(id: number): void {
    this.courseService
      .getCoursesByCategory(id)
      .subscribe((data) => (this.courses = data));
  }
  getCoursesByTitle(keyword: string): void {
    this.courseService
      .getCoursesByTitle(keyword)
      .subscribe((data) => (this.courses = data));
  }
}
