import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Lecture } from 'src/app/shared/lecture';
import { Video } from 'src/app/shared/video';

@Component({
  selector: 'app-lecture-video',
  templateUrl: './lecture-video.component.html',
  styleUrls: ['./lecture-video.component.css'],
})
export class LectureVideoComponent implements OnChanges {
  @Input() lecture: Lecture = new Lecture();
  video: Video = new Video();

  constructor(private courseService: CourseService) {}

  ngOnChanges(): void {
    if (!this.lecture?._links) return;
    this.courseService.getVideoByLecture(this.lecture).subscribe((data) => {
      this.video = data;
    });
  }
}
