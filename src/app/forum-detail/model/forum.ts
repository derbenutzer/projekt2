//import {ForumOwner} from "./forum-owner";

export class Forum {

  _id:string;
  __v:number;
  createDate:string;

  title:string;
  owner:string;
  categories:string[];

  constructor(
    title: string,
    owner: string,
    categories: string[]
  ) {
    this.title=title;
    this.owner=owner;
    this.categories=categories;
  }
}
