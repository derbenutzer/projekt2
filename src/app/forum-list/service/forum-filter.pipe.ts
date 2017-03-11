import { Pipe, PipeTransform } from '@angular/core';
import {Forum} from "../../forum-detail/model/forum";


/*@Pipe({
  name: 'forumCategoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {
  transform(forumArray: Forum[], filterStrings: string[]): any {
    if(!filterStrings) {
      return forumArray;
    }
    //filterString must not contain any of the characters that are special in regular expressions
    return forumArray.filter(forum => new RegExp(filterStrings.join("|")).test(forum.categories.toString()));
  }
}*/

@Pipe({
  name: 'forumFilter'
})
export class ForumFilterPipe implements PipeTransform {

  transform(forumArray: any, filter: any): any {
    if (filter && Array.isArray(forumArray)) {

      let filterKeys = Object.keys(filter);

      return forumArray.filter(forum =>
        filterKeys.reduce((memo, keyName) =>
        (memo && new RegExp(filter[keyName].join('|'), 'gi').test(forum[keyName].toString())) || filter[keyName] === "", true));
    }
    else {
      return forumArray;
    }
  }
}
