import { Link } from './link';

export class CourseLevel {
  id?: number;
  levelName?: string;
  _links?: LevelLinks;
}

export class LevelLinks {
  courses?: Link;
}
