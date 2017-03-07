import { Component } from '@angular/core';
import { Location } from '@angular/common';
import {PostService} from "./service/post.service";
import {ForumService} from "../forum-list/service/forum.service";
import {ForumDetailService} from "../forum-detail/service/forum-detail.service";
import {Post} from "./model/post";

//Zimport {MockPostService} from "./service/mock-post.service";

@Component({
  selector: 'create-post',
  template: `    
    <h2>{{pageTitle}}</h2>
    <form *ngIf="post" (submit)="sendForm()">
      <div class="form-group">
        <label for="title">Titel</label>
        <input name="title" type="text" class="form-control" [(ngModel)]="post.title" required>
      </div>
      <div class="form-group">
        <label for="owner">Autor</label>
        <input name="author" type="text" class="form-control" [(ngModel)]="post.author" required>
      </div>
      <div class="form-group">
        <label for="owner">Eintrag</label>
        <input name="content" type="text" class="form-control"  [(ngModel)]="post.content" required>
      </div>
      <button class="btn waves-effect waves-light" type="submit" name="action">Senden
        <i class="material-icons right">send</i>
      </button>
      <button type="button" class="waves-effect waves-light btn" (click)="goBack()">Back</button>
    </form>
  `,
})
export class CreatePostComponent {

  pageTitle="Eintrag erstellen";
  submitted = false;

  post:Post;

  constructor(
    private postService: PostService,
    private forumDetailService: ForumDetailService,
    private location: Location
  ) {
    this.postService.getPost()
      .then(post => this.post = post);
  };

  onDestroy(){
    this.postService.idOfPostToModify = null;
  }

  sendForm(): void {
    this.postService.handlePostFormSubmit(this.post._id,{"author":this.post.author,"title": this.post.title, "content": this.post.content, "postedIn":this.forumDetailService.openForumId});
    this.submitted = true;
  };

  goBack(): void {
    this.location.back();
  }

}
