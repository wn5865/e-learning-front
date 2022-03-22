import { Component, Input } from '@angular/core';
import { Course } from 'src/app/shared/course';
import { CourseCategory } from 'src/app/shared/course-category';
import { User } from 'src/app/shared/user';
import { Image } from '../../shared/image';
import { CourseLevel } from '../../shared/course-level';
import { Lecture } from 'src/app/shared/lecture';

@Component({
  selector: 'app-course-header',
  templateUrl: './course-header.component.html',
  styleUrls: ['./course-header.component.css'],
})
export class CourseHeaderComponent {
  @Input() course!: Course;
  @Input() image!: Image;
  @Input() category!: CourseCategory;
  @Input() instructor!: User;
  @Input() level!: CourseLevel;
  @Input() currentLecture!: Lecture;
  constructor() {}
}
