import { Component } from '@angular/core';
import { Forum } from '../forum-detail/model/forum';
import { ForumService } from './service/forum.service';

import { OnInit } from '@angular/core';
//import { RouterModule }   from '@angular/router';
import { Router }   from '@angular/router';
import {ForumList} from "./model/forum-list";


@Component({
  selector: 'my-forums',
  template: `
    <ul></ul>
  `,
})


export class ForumsComponent implements OnInit {

  ngOnInit(): void {
    this.getForums();
  }

  constructor(
    private router: Router,
    private forumService: ForumService) { }

  //forums: Forum[];
  forumList: ForumList;
  selectedForum: Forum;

/*  getForums(): void {
    this.forumService.getForums().then(forums => this.forums = forums);
  }*/

  getForums(): void {
   this.forumService.getForums().then(forumList => this.forumList = forumList);
   }


  onSelect(forum: Forum): void {
    this.selectedForum = forum;
  }

  // gotoDetail(): void {
  //   this.router.navigate(['/detail', this.selectedForum.id]);
  // }

}


