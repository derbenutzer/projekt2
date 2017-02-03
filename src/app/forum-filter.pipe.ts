import { Pipe, PipeTransform } from '@angular/core';
import {ForumList} from "./forum-list";


@Pipe({
  name: 'forumFilter'
})
export class ForumFilterPipe implements PipeTransform {

  transform(forumList: ForumList, filterStrings: string): any {
    if(!filterStrings) {
      return forumList.getSortedByDate();
    }

    let filterStr = filterStrings.toLowerCase();
    return forumList.forums.filter(forum => forum.title.toLowerCase().indexOf(filterStr) !== -1 || forum.categories.toString().toLowerCase().indexOf(filterStr) !== -1) ;
  }

}
