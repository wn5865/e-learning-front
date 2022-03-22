import { Component, Input, OnInit } from '@angular/core';
import { Chapter } from 'src/app/shared/chapter';
import { Lecture } from 'src/app/shared/lecture';

@Component({
  selector: 'app-course-accordion',
  templateUrl: './course-accordion.component.html',
  styleUrls: ['./course-accordion.component.css'],
})
export class CourseAccordionComponent implements OnInit {
  @Input() chapters: Chapter[] = [];
  @Input() lectures: Lecture[][] = [];

  constructor() {}

  ngOnInit(): void {}
}
