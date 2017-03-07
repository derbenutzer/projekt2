import { Component } from '@angular/core';
import { Location } from '@angular/common';
import {PostService} from "./service/post.service";
import {ForumService} from "../forum-list/service/forum.service";
import {ForumDetailService} from "../forum-detail/service/forum-detail.service";

//Zimport {MockPostService} from "./service/mock-post.service";

@Component({
  selector: 'create-post',
  template: `    
    <h2>{{pageTitle}}</h2>
    <form (submit)="sendForm()">
      <div class="form-group">
        <label for="title">Titel</label>
        <input name="title" type="text" class="form-control" [(ngModel)]="title" required>
      </div>
      <div class="form-group">
        <label for="owner">Autor</label>
        <input name="author" type="text" class="form-control" [(ngModel)]="author" required>
      </div>
      <div class="form-group">
        <label for="owner">Eintrag</label>
        <input name="content" type="text" class="form-control"  [(ngModel)]="content" required>
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

  id: string;
  title: string;
  author: string;
  content: string;
  tagInput:string;

  constructor(
    private postService: PostService,
    private forumDetailService: ForumDetailService,
    private location: Location
  ) { };

  sendForm(): void {
    this.postService.createNewPost({"author":this.author,"title": this.title, "content": this.content, "postedIn":this.forumDetailService.openForumId});
    this.submitted = true;
  };

  goBack(): void {
    this.location.back();
  }

}
