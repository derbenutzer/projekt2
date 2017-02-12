import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {ForumOwner} from "./model/forum-owner";

@Component({
  selector: 'register-owner',
  template: `    
    <h2>{{pageTitle}}</h2>
    <div *ngIf="forumOwner">
    <form (submit)="sendForm()">
      <div class="form-group">
        <label for="firstname">Vorname</label>
        <input name="firstname" type="text" class="form-control" [(ngModel)]="forumOwner.firstname" placeholder="Vorname" required>
      </div>
      <div class="form-group">
        <label for="lastname">Nachname</label>
        <input name="lastname" type="text" class="form-control" [(ngModel)]="forumOwner.lastname" placeholder="Nachname" required>
      </div>
      <div class="form-group">
        <label for="institution">Institution</label>
        <input name="institution" type="text" class="form-control" [(ngModel)]="institution" placeholder="Institution" >
      </div>
      <button class="btn waves-effect waves-light" type="submit" name="action">Senden
        <i class="material-icons right">send</i>
      </button>
      <button type="button" class="waves-effect waves-light btn" (click)="goBack()">Zurück</button>
    </form>
    </div>
  `,
})
export class RegisterOwnerComponent implements OnInit{

  pageTitle="Moderator Registrieren"
  submitted = false;
  forumOwner;

  constructor(private location: Location) {

  };

  ngOnInit(): void {
      this.forumOwner  = new ForumOwner();
      console.log(this.forumOwner);
  }


  sendForm(): void {
    console.log("form sent");
    this.submitted = true;

  };


  goBack(): void {
    this.location.back();
  }

}
