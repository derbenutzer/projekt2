import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Post } from './model/post';
//import { MockPostService } from "./service/mock-post.service";
import { PostList } from "./model/post-list";
import {PostService} from "./service/post.service";



@Component({
  selector: 'my-forum-detail',
  template: `
    <div *ngIf="post">
      <h2>{{post.title}}</h2>
      <div>
        <label>Id: </label><span>{{post.id}}</span></div>
      <div>
        <label>Author: </label><span>{{post.author.getName()}}</span></div>
      <div>
        <label>Created: </label><time>{{post.createDate | amDateFormat:'LL'}}</time></div>
      <button class="btn"(click)="goBack()">Back</button>
      <div>{{post.content}}</div>
    </div>
  `,
})

export class PostDetailComponent implements OnInit {

  @Input() post: Post;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private location: Location
  ) {}



  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.postService.getPost(params['id']))
      .subscribe(post => this.post = post);
  }


  goBack(): void {
    this.location.back();
  }

}

