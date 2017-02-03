import { Component, OnInit } from '@angular/core';
import {Forum} from "./forum";
import {ForumService} from "./forum.service";
import {ForumList} from "./forum-list";
import {AuthHttp} from "angular2-jwt";

@Component({
  selector: 'home',
  template: `
    <h2>{{title}}</h2>
    <div class="forumList collection">
      <a *ngFor="let forum of forumList.getSortedByDate()" class="collection-item" [routerLink]="['/forum', forum._id]">
        <div class="categoriesContainer right">
          <div class="categories right">
            <div *ngFor="let category of forum.categories" class="chip">
              {{category}}
            </div>
          </div>
        </div>
        <span class="forumLITitle">{{forum.title}}</span>
        <span class="forumLICreateDate"><i class="fa fa-calendar" aria-hidden="true"></i>{{forum.createDate | amDateFormat:'LL'}}</span>
      </a>
    </div>
  `,
  providers:[AuthHttp]
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
