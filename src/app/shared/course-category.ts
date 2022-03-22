import { Link } from './link';

export class CourseCategory {
  id?: number;
  name?: string;
  _links?: CourseCategoryLinks;
}

export class CourseCategoryLinks {
  courses?: Link;
}
