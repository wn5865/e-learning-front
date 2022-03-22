import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';
import { Chapter } from 'src/app/shared/chapter';
import { Course } from 'src/app/shared/course';
import { CourseCategory } from 'src/app/shared/course-category';
import { CourseLevel } from 'src/app/shared/course-level';
import { Lecture } from 'src/app/shared/lecture';
import { Review } from 'src/app/shared/review';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-lecture-detail',
  templateUrl: './lecture-detail.component.html',
  styleUrls: ['./lecture-detail.component.css'],
})
export class LectureDetailComponent implements OnInit {
  courseId: number = 0;
  lectureId: number = 0;
  course: Course = new Course();
  instructor: User = new User();
  category: CourseCategory = new CourseCategory();
  level: CourseLevel = new CourseLevel();
  reviews: Review[] = [];
  chapters: Chapter[] = [];
  lectures: Lecture[][] = [];
  currentLecture: Lecture = new Lecture();
  activeId: number = 1;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => this.init());
  }

  async init() {
    let paramMap = this.route.snapshot.paramMap;
    this.courseId = Number(paramMap.get('courseId'));
    this.lectureId = Number(paramMap.get('lectureId'));

    try {
      this.course = await firstValueFrom(
        this.courseService.getCoursesById(this.courseId)
      );
      this.chapters = await firstValueFrom(
        this.courseService.getChaptersByCourse(this.course)
      );
      this.lectures = await Promise.all(
        this.chapters.map((ch) => {
          return firstValueFrom(this.courseService.getLecturesByChapter(ch));
        })
      );
      this.instructor = await firstValueFrom(
        this.courseService.getInstructorByCourse(this.course)
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
      this.currentLecture = this.lectures
        .flat()
        .find((lec) => lec.id === this.lectureId)!;
    } catch (error) {
      throw error;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if ((event.target as Window).innerWidth >= 992) {
      this.activeId === 0 && (this.activeId = 1);
    } else {
      this.activeId !== 0 && (this.activeId = 0);
    }
  }
}
