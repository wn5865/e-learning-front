import { Component, Input, OnChanges } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Review } from 'src/app/shared/review';

@Component({
  selector: 'app-course-reviews',
  templateUrl: './course-reviews.component.html',
  styleUrls: ['./course-reviews.component.css'],
})
export class CourseReviewsComponent implements OnChanges {
  @Input() reviews!: Review[];

  constructor(private courseService: CourseService) {}

  ngOnChanges() {
    this.reviews
      .map((review) => this.courseService.getUserByReview(review))
      .map((obs, i) => obs.subscribe((data) => (this.reviews[i].user = data)));
  }
}
