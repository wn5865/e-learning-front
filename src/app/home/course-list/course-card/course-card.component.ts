import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/shared/course';
import { Image } from '../../../shared/image';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
})
export class CourseCardComponent implements OnInit, OnChanges {
  @Input() course!: Course;
  image!: Image;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.courseService.getImageByCourseId(this.course).subscribe((data) => {
      this.image = data;
    });
  }
}
