import { Link } from './link';

export class Chapter {
  id?: number;
  sortOrder?: number;
  title?: string;
  created?: string;
  _links?: ChapterLinks;
}

export class ChapterLinks {
  self?: Link;
  chapter?: Link;
  course?: Link;
  lectures?: Link;
}
