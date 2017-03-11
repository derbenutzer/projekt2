import {Forum} from "../../forum-detail/model/forum";

export class ForumList {

  constructor(public forums: Forum[]){};

  getSortedByDate(): Forum[] {
    return this.forums.sort((f1,f2) => +new Date(f2.createDate) - +new Date(f1.createDate));
  }

  getFilteredByOwnerId(ownerId: string) : Forum[] {
    return this.forums.filter( forum => forum.owner == ownerId);
  }

  //ToDo: Filter functions
/*  filterByLocation(location: string): Forum[] {
    return this.forums.sort((f1,f2) => +new Date(f1.createDate) - +new Date(f2.createDate));
  }*/

}
