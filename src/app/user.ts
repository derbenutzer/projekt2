import {Post} from "./post";

export class User {

  posts: Post[];

  constructor(
    public firstname:string,
    public lastname: string,
    public email: string
  ) {};

  getName(): string {
    return this.firstname;
  }

}
