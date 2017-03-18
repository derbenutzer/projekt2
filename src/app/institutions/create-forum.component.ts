import { Component } from '@angular/core';
import {ForumService} from "../forum-list/service/forum.service";
import {Forum} from "../forum-detail/model/forum";
import {AuthService} from "../shared/auth.service";
import {Institution} from "./model/Institution";
import {UserService} from "../users/service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'create-forum',
  template: `    
    <h2>{{pageTitle}}</h2>
    <button type="button" class="waves-effect waves-light btn" (click)="goBack()">Zurück</button>
    <br>
    <br>
    <div *ngIf="forum">
      <form (submit)="sendForm()">
        <div class="form-group">
          <label for="title">Titel</label>
          <input name="title" type="text" class="form-control" [(ngModel)]="forum.title" placeholder="Titel" required>
        </div>
        <div class="form-group">
          <label for="description">Beschreibung</label>
          <input name="description" type="text" class="form-control" [(ngModel)]="forum.description" placeholder="Beschreiben sie den runden Tisch" >
        </div>
        <div class="form-group">
          <label for="categories">Kategorien</label>
          <input name="categoriesInput" type="text" class="form-control" [(ngModel)]="categoriesInput" placeholder="Kategorie1, Kategorie2, etc." >
        </div>
      <!--  <div class="form-group">
          <label for="institutions">Institutionen</label>
          <input name="institutionsInput" type="text" class="form-control" [(ngModel)]="institutionsInput" placeholder="Institution1, Institution2, Institution3, etc." >
        </div>-->
        <button class="btn waves-effect waves-light" type="submit" name="action">Senden
          <i class="material-icons right">send</i>
        </button>
      </form>
      <br>
    </div>
  `,
})
export class CreateForumComponent {

  pageTitle: string;
  backUrl= "/dashboard";

  categoriesInput: string="";
  forum: Forum;
  institution: Institution;

  constructor(private forumService: ForumService,
              private authService: AuthService,
              private userService: UserService,
              private router: Router)
  {

    this.forumService.getForum()
      .then(forum => {
        this.forum = forum;
        this.fillCategories();
      });

    this.userService.getInstitution(this.authService.userProfile['user_metadata']['databaseId'])
      .then(institution => this.institution = institution);
  };

  ngOnDestroy(){
    this.forumService.idOfForumToModify = null;
  }

  handleCategoriesInput(): void {
    if(this.categoriesInput){
      this.forum.categories = this.categoriesInput.split(",");
    }
    else{
      this.forum.categories = ["noch keine Kategorie"]
    }
  }

  fillCategories(): void {

    if(!this.forum.categories){
      return;
    }

    for (let category of this.forum.categories){
      this.categoriesInput += category +",";
    }
    this.categoriesInput = this.categoriesInput.slice(0, -1);
  }

  sendForm(): void {
    this.handleCategoriesInput();
    //this.handleInstitutionsInput();

    let institution = this.institution.institutionName;
    this.forumService.handleForumFormSubmit(this.forum._id,{"title": this.forum.title, "description":this.forum.description, "owner":this.institution._id ,"institution": institution,"categories": this.forum.categories})
      .then(forum => {
        console.log(forum);
        this.userService.updateUser(this.institution._id,{"ownerOf":forum._id, "registeredFor":forum._id})
          .then(res => this.goBack());
      });
  };

  goBack(): void {
    this.router.navigate([this.backUrl]);
  }

}
