import { Component } from '@angular/core';
import { Location } from '@angular/common';
//import {Forum} from "./forum";
import {ForumService} from "../forum-list/service/forum.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Forum} from "./model/forum";
//import {ForumOwner} from "./forum-owner";

@Component({
  selector: 'create-forum',
  template: `    
    <h2>{{pageTitle}}</h2>
    <div *ngIf="forum">
    <form (submit)="sendForm()">
      <div class="form-group">
        <label for="title">Titel</label>
        <input name="title" type="text" class="form-control" [(ngModel)]="forum.title" placeholder="Titel" required>
      </div>
      <div class="form-group">
        <label for="owner">Erstellt von:</label>
        <input name="owner" type="text" class="form-control" [(ngModel)]="forum.owner" placeholder="Name des Erstellers" required>
      </div>
      <div class="form-group">
        <label for="categories">Kategorien</label>
        <input name="categoriesInput" type="text" class="form-control" [(ngModel)]="categoriesInput" placeholder="Kategorie1, Kategorie2, Kategorie3, etc." >
      </div>
      <button class="btn waves-effect waves-light" type="submit" name="action">Senden
        <i class="material-icons right">send</i>
      </button>
      <button type="button" class="waves-effect waves-light btn" (click)="goBack()">Zurück</button>
    </form>
    </div>
  `,
})
export class CreateForumComponent {

  submitted = false;
  isEdit = false;

  pageTitle: string;
  categoriesInput: string;
  forum: Forum;

  constructor(private forumService: ForumService,
              private route: ActivatedRoute,
              private location: Location) {
  };

  ngOnInit(): void {

    if (window.location.href.indexOf("edit") > -1) {

      this.route.params
        .switchMap((params: Params) => this.forumService.getForum(params['id']))
        .subscribe(forum => {
          this.forum = forum;
          this.categoriesInput = forum.categories.join(",");
          this.isEdit = true;
          this.pageTitle="Forum editieren";
        })
    }
    else {
      this.forum  = new Forum('', '', ['']);
      this.categoriesInput="";
      this.pageTitle="Forum erstellen";
    }
  }

  handleCategoriesInput(): void {
    if(this.categoriesInput){
      this.forum.categories = this.categoriesInput.split(",");
    }
    else{
      this.forum.categories = ["noch keine Kategorie"]
    }
  }

  sendForm(): void {

    this.handleCategoriesInput();

    if(this.isEdit){
      this.updateForum();
    }
    else{
      this.createNewForum();
    }

    this.submitted = true;

  };

  createNewForum(): void {
    this.forumService.createNewForum(this.forum.title, this.forum.owner, this.forum.categories);
  }

  updateForum(): void {
    this.forumService.updateForum(this.forum._id, this.forum.title, this.forum.owner, this.forum.categories);
  }

  goBack(): void {
    this.location.back();
  }

}
