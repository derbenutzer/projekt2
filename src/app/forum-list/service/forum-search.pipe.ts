import { Pipe, PipeTransform } from '@angular/core';
import {Forum} from "../../forum-detail/model/forum";


@Pipe({
  name: 'forumSearch'
})
export class ForumSearchPipe implements PipeTransform {

  transform(forumArray: Forum[], filterStrings: string): any {

    if(!filterStrings) {
      return forumArray;
    }

    let filterStr = filterStrings.toLowerCase();
    return forumArray.filter(forum => forum.title.toLowerCase().indexOf(filterStr) !== -1 || forum.categories.toString().toLowerCase().indexOf(filterStr) !== -1 || forum.institution.toString().toLowerCase().indexOf(filterStr) !== -1) ;
  }

}
