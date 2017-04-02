import { Pipe, PipeTransform } from '@angular/core';


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
