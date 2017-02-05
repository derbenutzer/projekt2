import { Pipe, PipeTransform } from '@angular/core';
import {Forum} from "./forum";


@Pipe({
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

}
