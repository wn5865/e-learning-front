import { Link } from './link';
import { User } from './user';

export class Review {
  id?: number;
  content?: string;
  rating?: number;
  created?: string;
  lastUpdated?: string;
  user?: User;
  _links?: ReviewLinks;
}

export class ReviewLinks {
  user?: Link;
  course?: Link;
}
