//import {ForumOwner} from "./forum-owner";

import {Post} from "../../posts/model/post";
export class Forum {

  _id:string;
  __v:number;
  createDate:string;

  title:string;
  owner:string;
  categories:string[];
  institutions:string[];

  posts:Post[];

  constructor(
    title: string,
    owner: string,
    categories: string[],
    institutions: string[]
  ) {
    this.title=title;
    this.owner=owner;
    this.categories=categories;
    this.institutions=institutions;
  }
}
