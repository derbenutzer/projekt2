
import { Injectable } from '@angular/core';

import { Forum } from './forum';
import { FORUMS } from './mock-forums';
import {ForumList} from "./forum-list";
//import { Promise} from '@angular/core';

@Injectable()
export class ForumService {

  getForums(): Promise<ForumList> {
    return Promise.resolve(FORUMS);
  }

  saveForum(forum: Forum): void {
    console.log("saved Forum");
  }

  deleteForum(id: String): void {
    console.log("deleted Forum");
  }

}
