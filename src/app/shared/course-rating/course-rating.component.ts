import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Course } from 'src/app/shared/course';

@Component({
  selector: 'app-course-rating',
  templateUrl: './course-rating.component.html',
  styleUrls: ['./course-rating.component.css'],
})
export class CourseRatingComponent implements OnChanges {
  @Input() course!: Course;
  avgRating!: number;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    let numerator = this?.course?.totalRating;
    let denominator = this?.course?.numRatings;
    numerator && denominator && (this.avgRating = numerator / denominator);
  }
}
