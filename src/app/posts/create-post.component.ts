import { Component } from '@angular/core';
import {PostService} from "./service/post.service";
import {Post} from "./model/post";
import {ForumDetailService} from "../forum-detail/service/forum-detail.service";
import {ForumService} from "../forum-list/service/forum.service";
import {Router} from "@angular/router";
import {AuthService} from "../shared/auth.service";

//import {MockPostService} from "./service/mock-post.service";

@Component({
  selector: 'create-post',
  template: `    
    <h2>{{pageTitle}}</h2>
    <form *ngIf="post" (submit)="sendForm()">
      <div class="form-group">
        <label for="title">Titel</label>
        <input id="title" name="title" type="text" class="form-control" [(ngModel)]="post.title" required>
      </div>
      <div class="form-group">
        <label class="active" for="content">Eintrag</label>
        <textarea id="content" name="content" type="text" class="form-control materialize-textarea"  [(ngModel)]="post.content" required></textarea>
      </div>
      <button class="btn waves-effect waves-light" type="submit" name="action">Speichern
      </button>
      <button type="button" class="waves-effect waves-light btn" (click)="goBack()">Zurück</button>
    </form>
  `,
})
export class CreatePostComponent {

  pageTitle="Eintrag erstellen";
  post:Post;
  backUrl = "/forum";

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private forumDetailService: ForumDetailService,
    private forumService: ForumService,
    private router: Router
  ) {
    this.postService.getPost()
      .then(post => {
        console.log(post);
        return this.post = post
      });
  };

  ngOnInit(){
    if(!this.authService.loggedIn()){
      this.router.navigate(["/home"]);
      return;
    }

    if(this.postService.idOfPostToModify===undefined){
      this.router.navigate(["/forum-list"]);
      return;
    }
  }

  ngOnDestroy(){
    this.postService.idOfPostToModify = null;
    this.forumDetailService.openForumId = null;
  }

  sendForm(): void {

    let forumId = this.forumDetailService.openForumId;
    let keyValuePairs = {"author":this.authService.getUserName(),"authorId":this.authService.getDatabaseId(), "title": this.post.title, "content": this.post.content, "postedIn":forumId};

    this.postService.handlePostFormSubmit(this.post._id, keyValuePairs)
      .then(post => {
        this.forumService.addPost(forumId);
        this.goBack();
      });

  };

  goBack(): void {
    this.router.navigate([this.backUrl+"/"+this.forumDetailService.openForumId]);
  }

}
