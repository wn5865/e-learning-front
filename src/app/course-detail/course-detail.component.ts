import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';
import { Chapter } from 'src/app/shared/chapter';
import { Course } from 'src/app/shared/course';
import { CourseCategory } from 'src/app/shared/course-category';
import { CourseLevel } from 'src/app/shared/course-level';
import { Image } from 'src/app/shared/image';
import { Lecture } from 'src/app/shared/lecture';
import { User } from 'src/app/shared/user';
import { Review } from 'src/app/shared/review';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
})
export class CourseDetailComponent implements OnInit {
  course: Course = new Course();
  instructor: User = new User();
  category: CourseCategory = new CourseCategory();
  level: CourseLevel = new CourseLevel();
  reviews: Review[] = [];
  chapters: Chapter[] = [];
  lectures: Lecture[][] = [];
  image: Image = new Image();
  currentLecture: Lecture = new Lecture();

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => this.init());
  }

  async init() {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    try {
      this.course = await firstValueFrom(this.courseService.getCoursesById(id));
      this.chapters = await firstValueFrom(
        this.courseService.getChaptersByCourse(this.course)
      );
      this.lectures = await Promise.all(
        this.chapters.map(async (ch) => {
          return firstValueFrom(this.courseService.getLecturesByChapter(ch));
        })
      );
      this.instructor = await firstValueFrom(
        this.courseService.getInstructorByCourse(this.course)
      );
      this.image = await firstValueFrom(
        this.courseService.getImageByCourseId(this.course)
      );
      this.reviews = await firstValueFrom(
        this.courseService.getReviewsByCourse(this.course)
      );
      this.category = await firstValueFrom(
        this.courseService.getCategoryByCourse(this.course)
      );
      this.level = await firstValueFrom(
        this.courseService.getLevelByCourse(this.course)
      );
      this.currentLecture = this.lectures[0][0];
    } catch (error) {
      throw error;
    }
  }
}
