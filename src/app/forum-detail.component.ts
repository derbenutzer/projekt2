import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Forum } from './forum';
import { ForumService } from './forum.service';


@Component({
  selector: 'my-forum-detail',
  template: `
    <div *ngIf="forum">
      <h2>{{forum.title}}</h2>
      <div>
        <label>Id: </label><span>{{forum.id}}</span></div>
      <div>
        <label>Owner: </label><span>{{forum.owner}}</span></div>
      <div>
        <label>Category: </label><span>{{forum.categories}}</span></div>
      <div>
        <label>Location: </label><span>{{forum.location}}</span></div>
      <button (click)="goBack()">Back</button>
    </div>
  `,
})

export class ForumDetailComponent implements OnInit {

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.forumService.getForum(params['id']))
      .subscribe(forum => this.forum = forum);
  }

  constructor(
    private forumService: ForumService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  @Input() forum: Forum;

  goBack(): void {
    this.location.back();
  }
}
