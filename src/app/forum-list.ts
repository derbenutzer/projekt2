import {Forum} from "./forum";

export class ForumList {

  constructor(public forums: Forum[]){};

  getSortedByDate(): Forum[] {
    return this.forums.sort((f1,f2) => +new Date(f2.createDate) - +new Date(f1.createDate));
  }

  //ToDo: Filter functions
/*  filterByLocation(location: string): Forum[] {
    return this.forums.sort((f1,f2) => +new Date(f1.createDate) - +new Date(f2.createDate));
  }*/

}
