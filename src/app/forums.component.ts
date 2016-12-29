import { Component } from '@angular/core';
import { Forum } from './forum';
import { ForumService } from './forum.service';

import { OnInit } from '@angular/core';
//import { RouterModule }   from '@angular/router';
import { Router }   from '@angular/router';


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

  forums: Forum[];
  selectedForum: Forum;

  getForums(): void {
    this.forumService.getForums().then(forums => this.forums = forums);
  }


  onSelect(forum: Forum): void {
    this.selectedForum = forum;
  }

  // gotoDetail(): void {
  //   this.router.navigate(['/detail', this.selectedForum.id]);
  // }

}


