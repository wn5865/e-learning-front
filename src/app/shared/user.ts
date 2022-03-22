import { Link } from './link';

export class User {
  id?: number;
  name?: string;
  email?: string;
  created?: string;
  _links?: UserLinks;
}

export class UserLinks {
  cart?: Link;
  enrollment?: Link;
  wishlist?: Link;
  reviews?: Link;
  completedLectures?: Link;
  courses?: Link;
}
