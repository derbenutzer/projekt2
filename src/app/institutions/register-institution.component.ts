import {Component, OnInit} from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../users/service/user.service";

@Component({
  selector: 'register-owner',
  template: `    
    <h2>{{pageTitle}}</h2>
    <div *ngIf="isInstitution">
      <div>
        <p>Sie sind bereits als Institution registriert.</p>
         <p>Gehen sie zum <a routerLink="/dashboard">Dashboard</a> um runde Tische zu erstellen und zu verwalten.</p>
      </div>   
    </div>
    
    
    <div *ngIf="authService.loggedIn() && !isInstitution">
    
      <div>
        <p>Institutionen müssen sich verifizieren. Entweder wir rufen Sie an oder wir kontaktieren sie per Email.</p>
         <p>Geben sie unbedingt die Telefonnummer oder Emailadresse der Institution an, die sie repräsentieren möchten.</p>
      </div>
      
      <form (ngSubmit)="sendRequest()">
        <div class="form-group">
          <label class="active" for="name">Name der Institution</label>
          <input [(ngModel)]="name" id="name" name="name" placeholder="Name der Institution">
        </div>
        <div class="form-group">
          <label class="active" for="email">Email</label>
          <input [(ngModel)]="email" id="email" name="email" placeholder="Email">
        </div>
        <div class="form-group">
          <label class="active" for="phone">Telefonnummer</label>
          <input [(ngModel)]="phone" id="phone" name="phone" placeholder="Telefonnummer">
        </div>  
        <div>
          <button class="btn waves-effect waves-light" type="submit" name="action">Senden
            <i class="material-icons right">send</i>
          </button>
          <button (click)="goBack()" type="button" class="waves-effect waves-light btn" (click)="goBack()">Zurück</button>
        </div>
      </form>
      
    </div>
    
    <div *ngIf="!authService.loggedIn()">
      <login-to-continue [backUrl]="backUrl"></login-to-continue>
    </div>
  `,
})
export class RegisterInstitutionComponent implements OnInit{

  pageTitle="Institution Registrieren";
  backUrl="/institutions-start";

  email="";
  phone="";
  name="";
  isInstitution=false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {};

  ngOnInit(){
    if(this.authService.userProfile['user_metadata']) {
      let userId = this.authService.userProfile['user_metadata']['databaseId'];
      this.userService.checkIfUserIsInstitution(userId)
        .then(res => this.isInstitution = res);
    }



  }

  sendRequest(): void {
    let userId = this.authService.userProfile['user_metadata']['databaseId'];
    let keyValuePairs = {"institutionName":this.name, "isInstitution":true , "isVerified": true};
    this.userService.registerUserAsInstitution(userId,keyValuePairs);
  }


  goBack(): void {
    this.router.navigate([this.backUrl]);
  }

}
