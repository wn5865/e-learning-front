import { Chapter } from './chapter';
import { Course } from './course';
import { CourseCategory } from './course-category';
import { CourseLevel } from './course-level';
import { Lecture } from './lecture';
import { User } from './user';

export class CourseForm {
  course?: Course;
  instructor?: User;
  level?: CourseLevel;
  category?: CourseCategory;
  chapters?: Chapter[];
  lectures?: Lecture[];
  groups?: number[];
}
