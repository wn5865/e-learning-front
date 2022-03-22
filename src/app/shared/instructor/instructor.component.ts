import { Component, Input, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/shared/course';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css'],
})
export class InstructorComponent implements OnInit {
  @Input() course!: Course;
  instructor!: User;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService
      .getInstructorByCourse(this.course)
      .subscribe((data) => (this.instructor = data));
  }
}
