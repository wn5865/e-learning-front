import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../shared/course';
import { CourseCategory } from '../shared/course-category';
import { map, Observable } from 'rxjs';
import { User } from '../shared/user';
import { Chapter } from '../shared/chapter';
import { Lecture } from '../shared/lecture';
import { Video } from '../shared/video';
import { CourseLevel } from '../shared/course-level';
import { Review } from '../shared/review';
import { Image } from '../shared/image';
import appConfig from '../config/app-config';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private baseUrl: string = `${appConfig.API_URL}/api`;
  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<Course[]> {
    const url = `${this.baseUrl}/courses`;
    return this.queryCourses(url);
  }

  getCoursesById(id: number): Observable<Course> {
    const url = `${this.baseUrl}/courses/${id}`;
    return this.http.get<Course>(url);
  }

  getCoursesByCategory(id: number): Observable<Course[]> {
    const url = `${this.baseUrl}/courses/search/findByCategoryId?id=${id}`;
    return this.queryCourses(url);
  }

  getCoursesByTitle(keyword: string): Observable<Course[]> {
    const url = `${this.baseUrl}/courses/search/findByTitleContaining?title=${keyword}`;
    return this.queryCourses(url);
  }

  queryCourses(url: string): Observable<Course[]> {
    return this.http
      .get<ResponseCourses>(url)
      .pipe(map((response) => response._embedded.courses));
  }

  getCategories(): Observable<CourseCategory[]> {
    const url = `${this.baseUrl}/course-categories`;
    return this.http
      .get<ResponseCourseCategories>(url)
      .pipe(map((response) => response._embedded.courseCategories));
  }

  getCategoryByCourse(course: Course): Observable<CourseCategory> {
    const url = course._links?.category?.href!;
    return this.http.get<CourseCategory>(url);
  }

  getLevelByCourse(course: Course): Observable<CourseLevel> {
    const url = course._links?.level?.href!;
    return this.http.get<CourseLevel>(url);
  }

  getInstructorByCourse(course: Course): Observable<User> {
    const url = course._links?.instructor?.href!;
    return this.http.get<User>(url);
  }

  getChaptersByCourse(course: Course): Observable<Chapter[]> {
    const url = course._links?.chapters?.href!;
    return this.http
      .get<ResponseChapters>(url)
      .pipe(map((response) => response._embedded.chapters));
  }

  getReviewsByCourse(course: Course): Observable<Review[]> {
    const url = course._links?.reviews?.href!;
    return this.http
      .get<ResponseReviews>(url)
      .pipe(map((res) => res._embedded.reviews));
  }

  getUserByReview(review: Review): Observable<User> {
    const url = review._links?.user?.href!;
    return this.http.get<User>(url);
  }

  getLecturesByChapter(chapter: Chapter): Observable<Lecture[]> {
    const url = chapter._links?.lectures?.href!;
    return this.http
      .get<ResponseLectures>(url)
      .pipe(map((response) => response._embedded.lectures));
  }

  getLecturesByCourse(course: Course): Observable<Lecture[]> {
    const url = `${this.baseUrl}/lectures/search/findLecturesByCourseId?id=${course.id}`;
    return this.http
      .get<ResponseLectures>(url)
      .pipe(map((response) => response._embedded.lectures));
  }

  getVideoByLecture(lecture: Lecture): Observable<Video> {
    const url = lecture._links?.video?.href!;
    return this.http.get<Video>(url);
  }

  getImageByCourseId(course: Course): Observable<Image> {
    const url = `${this.baseUrl}/courses/${course.id}/image`;
    return this.http.get<Image>(url);
  }

  getLevels(): Observable<CourseLevel[]> {
    const url = `${this.baseUrl}/levels`;
    return this.http
      .get<ResponseLevels>(url)
      .pipe(map((res) => res._embedded.levels));
  }
}

interface ResponseCourses {
  _embedded: {
    courses: Course[];
  };
}

interface ResponseChapters {
  _embedded: {
    chapters: Chapter[];
  };
}

interface ResponseLectures {
  _embedded: {
    lectures: Lecture[];
  };
}

interface ResponseCourseCategories {
  _embedded: {
    courseCategories: CourseCategory[];
  };
}

interface ResponseReviews {
  _embedded: {
    reviews: Review[];
  };
}

interface ResponseLevels {
  _embedded: {
    levels: CourseLevel[];
  };
}

interface ResponseImage {
  _embedded: {
    images: Image[];
  };
}
