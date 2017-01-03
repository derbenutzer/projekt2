import {Post} from "./post";

export class PostList {

  constructor(public posts: Post[]){};

  getSortedByDate(): Post[] {
    return this.posts.sort((p1,p2) => +new Date(p2.createDate) - +new Date(p1.createDate));
  }

  findById(id: number): Post {
    return this.posts.find(post => post.id === +id);
  }

  //ToDo: Filter functions
/*  filterByLocation(location: string): Forum[] {
    return this.forums.sort((f1,f2) => +new Date(f1.createDate) - +new Date(f2.createDate));
  }*/

}
