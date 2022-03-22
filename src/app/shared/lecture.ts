import { Link } from './link';

export class Lecture {
  id?: number;
  uuid?: string;
  sortOrder?: number;
  title?: string;
  created?: string;
  resourses?: string[];
  _links?: LectureLinks;
}

export class LectureLinks {
  questions?: Link;
  chapter?: Link;
  completedUsers?: Link;
  video?: Link;
}
