import { Component } from '@angular/core';
//import {Forum} from "./forum";
import {ForumService} from "./forum.service";
//import {ForumOwner} from "./forum-owner";

@Component({
  selector: 'create-forum',
  template: `    
    <h2>{{pageTitle}}</h2>
    <div class="container">
    <form (submit)="addForum(
        title.value,
        owner.value,
        categories.value
    )">
      <div class="form-group">
        <label for="title">Titel</label>
        <input #title type="text" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="owner">Owner</label>
        <input #owner type="text" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="categories">Kategorien</label>
        <input #categories type="text" class="form-control">
      </div>
      <button class="btn waves-effect waves-light" type="submit" name="action">Submit
        <i class="material-icons right">send</i>
      </button>
    </form>
    </div>
  `,
})
export class CreateForumComponent {

  pageTitle="Forum erstellen";
  submitted = false;

  id: string;
  title: string;
  owner: string;
  categories: string[];
  //forum: Forum;

  constructor(private forumService: ForumService) { }

  addForum(title: string, owner: string, categories?: string): void {

    this.title = title;
    this.owner = owner;
    if(categories){
      this.categories = categories.split(",");
    }
    else{
      this.categories = ["noch keine Kategorie"]
    }

    this.forumService.createNewForum(this.title, this.owner, this.categories);
    this.submitted = true;
  };

}
