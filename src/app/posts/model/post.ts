import {User} from "../../users/model/user";

export class Post {
  _id: string;
  title: string;
  content: string;
  author: User;
  createDate: string;
  postedIn: string;
}
