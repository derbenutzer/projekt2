import {User} from "../../users/model/user";

export class Post {

  id: number;
  title: string;
  content: string;
  author: User;
  createDate: string;

}
