import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { CourseCategory } from 'src/app/shared/course-category';

@Component({
  selector: 'app-nav-categories',
  templateUrl: './nav-categories.component.html',
  styleUrls: ['./nav-categories.component.css'],
})
export class NavCategoriesComponent implements OnInit {
  categories: CourseCategory[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.getCourseCategories();
  }

  getCourseCategories(): void {
    this.courseService
      .getCategories()
      .subscribe((data) => (this.categories = data));
  }
}
