import { Component, OnInit } from '@angular/core';
import {Forum} from "./forum";
import {ForumService} from "./forum.service";
import {ForumList} from "./forum-list";

@Component({
  selector: 'create-forum',
  template: `
    <h2>{{title}}</h2>
    <div class="grid grid-pad">
      <a *ngFor="let forum of forumList.getSortedByDate()"  [routerLink]="['/forum', forum._id]"  class="linkToForum">
      <div class="module forum">
          <h3>Title: {{forum.title}}</h3>
          <div>Created: {{forum.createDate | amDateFormat:'LL'}}</div>
        </div>
      </a>
    </div>
  `,
})


export class HomeComponent implements OnInit {

  title="Startseite";

  forumList: ForumList = new ForumList([]);

  constructor(private forumService: ForumService) { }

  ngOnInit(): void {
    console.log("onInit Home");
    this.forumService.getForums()
      .then(forumList => this.forumList = forumList);
  }
}
