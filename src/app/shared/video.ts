import { Link } from './link';

export class Video {
  id?: number;
  name?: string;
  type?: string;
  data?: string;
  url?: string;
  size?: number;
  duration?: string;
  created?: string;
  _links?: VideoLinks;
}

export class VideoLinks {
  lecture?: Link;
}
