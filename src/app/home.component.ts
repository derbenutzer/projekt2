import { Component, OnInit } from '@angular/core';
import {Forum} from "./forum";
import {ForumService} from "./forum.service";

@Component({
  selector: 'create-forum',
  template: `
    <h2>{{title}}</h2>
    <div class="grid grid-pad">
      <a *ngFor="let forum of forums"  [routerLink]="['/detail', forum._id]"  class="linkToForum">
      <div class="module forum">
          <h4>{{forum.title}}</h4>
        </div>
      </a>
    </div>
  `,
})


export class HomeComponent implements OnInit {

  title="Startseite";

  forums: Forum[] = [];

  constructor(private forumService: ForumService) { }

  ngOnInit(): void {
    console.log("onInit Home");
    this.forumService.getForums()
      .then(forums => this.forums = forums);
  }
}
