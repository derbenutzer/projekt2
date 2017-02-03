import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Forum } from './forum';
import { ForumService } from './forum.service';
import {MockPostService} from "./mock-post.service";
import {Post} from "./post";
import {PostList} from "./post-list";



@Component({
  selector: 'my-forum-detail',
  template: `
    <div *ngIf="forum">
      <h2>{{forum.title}}</h2>
      <div>
        <label>Id: </label><span>{{forum._id}}</span></div>
      <div>
        <label>Owner: </label><span>{{forum.owner}}</span></div>
      <div>
        <label>Category: </label><span>{{forum.categories}}</span></div>
      <div>
        <label>Location: </label><span>{{forum.location}}</span></div>
      <button class="waves-effect waves-light btn" (click)="goBack()">Back</button>
      <button class="waves-effect waves-light btn" (click)="deleteForum()"><i class="material-icons left">delete</i>Löschen</button>
      <button [routerLink]="['/forum',forum._id,'edit']" class="waves-effect waves-light btn"><i class="material-icons left">edit</i>Editieren</button>
      <div>
        <h3>Beiträge</h3>
        <button routerLink="/create-post" class="btn">Eintrag erstellen</button>
        <ul class="postList collection">
          <li class="collection-item avatar" *ngFor="let post of postList.getSortedByDate()">
            <img src="assets/images/fake-user.jpg" alt="user image" class="circle">
            <div>
              <a [routerLink]="['/post', post.id]"  class="linkToPost">{{ post.title }}</a>
              <div>Posted by: {{ post.author.getName() }} on: <time>{{ post.createDate | amDateFormat:'LL'}}</time></div>
            </div>      
          </li>
        </ul>
      </div>
    </div>
  `,
})

export class ForumDetailComponent implements OnInit {

  @Input() forum: Forum;

  postList: PostList = new PostList([]);
  id: string;

  constructor(
    private forumService: ForumService,
    private postService: MockPostService,
    private route: ActivatedRoute,
    private location: Location
  ) {}



  ngOnInit(): void {

    console.log(this.route.params);

    this.route.params
      .switchMap((params: Params) => this.forumService.getForum(params['id']))
      .subscribe(forum => this.forum = forum);

    console.log(this.forum);

    this.postService.getPostList()
      .then(postList => this.postList = postList);
  }


  goBack(): void {
    this.location.back();
  }

  deleteForum(): void {
    this.forumService.deleteForum(this.forum._id);
  }
}

