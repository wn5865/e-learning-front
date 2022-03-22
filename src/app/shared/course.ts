import { Link } from './link';

export class Course {
  id?: number;
  categoryId?: number;
  levelId?: number;
  imageId?: string;

  title?: string;
  subtitle?: string;
  description?: string;
  objectives?: string;
  requirement?: string;
  target?: string;
  price?: number;
  videoDuration?: Date;
  numStudents?: number;
  numRatings?: number;
  totalRating?: number;

  created?: Date;
  lastUpdated?: Date;

  _links?: CourseLinks;
}

export class CourseLinks {
  self?: Link;
  course?: Link;
  instructor?: Link;
  image?: Link;
  reviews?: Link;
  category?: Link;
  chapters?: Link;
  level?: Link;
}
