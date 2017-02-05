import { Pipe, PipeTransform } from '@angular/core';
import {Forum} from "./forum";


@Pipe({
  name: 'forumFilter'
})
export class ForumFilterPipe implements PipeTransform {

  transform(forumArray: Forum[], filterStrings: string): any {

    if(!filterStrings) {
      return forumArray;
    }

    let filterStr = filterStrings.toLowerCase();
    return forumArray.filter(forum => forum.title.toLowerCase().indexOf(filterStr) !== -1 || forum.categories.toString().toLowerCase().indexOf(filterStr) !== -1) ;
  }

}
