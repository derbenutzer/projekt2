import {Post} from "./post";

export class PostList {

  constructor(public posts: Post[]) {};

  getSortedByDate(): Post[] {
    return this.posts.sort((p1, p2) => +new Date(p2.createDate) - +new Date(p1.createDate));
  }
}
