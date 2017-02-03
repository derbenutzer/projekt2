import { Component } from '@angular/core';
import { Location } from '@angular/common';

import {MockPostService} from "./mock-post.service";

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
      <div class="form-group">
        <label for="categories">Tags</label>
        <input name="tagInput" type="text" class="form-control" [(ngModel)]="tagInput">
      </div>
      <button class="btn waves-effect waves-light" type="submit" name="action">Senden
        <i class="material-icons right">send</i>
      </button>
      <button class="waves-effect waves-light btn" (click)="goBack()">Back</button>
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
  tags: string[];

  constructor(
    private postService: MockPostService,
    private location: Location
  ) { };

  sendForm(): void {

    if(this.tagInput){
      this.tags = this.tagInput.split(",");
    }
    else{
      this.tags = ["noch keine Tags"]
    }

    this.postService.createNewPost(this.author, this.title, this.content, this.tags);
    this.submitted = true;
  };

  goBack(): void {
    this.location.back();
  }

}
