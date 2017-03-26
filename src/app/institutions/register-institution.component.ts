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
        <p class="flow-text">Sie sind bereits als Institution registriert.</p>
         <p class="flow-text">Gehen sie zur <a routerLink="/dashboard">Verwaltung</a> um runde Tische zu erstellen und zu verwalten.</p>
      </div>   
    </div>
    
    
    <div *ngIf="authService.loggedIn() && !isInstitution && !submitted">
    
      <div>
        <p class="flow-text">Institutionen müssen sich verifizieren. Entweder wir rufen Sie an oder wir kontaktieren Sie per Email.</p>
         <p class="flow-text">Geben Sie die Telefonnummer und die Emailadresse der Institution an, die Sie repräsentieren möchten.</p>
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
          <button class="btn waves-effect waves-light" type="submit" name="action">Registrieren
            <i class="material-icons right">send</i>
          </button>
          <button type="button" class="waves-effect waves-light btn" (click)="goBack()">Zurück</button>
        </div>
      </form>
      
    </div>
    <div *ngIf="submitted">
      <p class="flow-text">Vielen Dank, Sie sind jetzt als Institution registriert</p>
      <div class="buttonPanel">
        <button class="waves-effect waves-light btn" (click)="goToDashboard()" type="button">Zur Verwaltungsansicht</button>
      </div>
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
  submitted=false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {};

  ngOnInit(){

    if (this.authService.loggedIn() && this.authService.userProfile['user_metadata']) {
      this.checkIfIsInstitution(this.authService.userProfile['user_metadata']['databaseId']);
    }
    else {
      this.authService.lock.on('authenticated', (authResult: any) => {
        this.authService.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
          if (error) {
            console.log(error);
          }
          if (profile['user_metadata']) {
            this.checkIfIsInstitution(profile['user_metadata']['databaseId']);
          }
          else {
            this.isInstitution=false;
          }
        });
      });
    }

  }


  sendRequest(): void {
    let userId = this.authService.userProfile['user_metadata']['databaseId'];
    let keyValuePairs = {"institutionName":this.name, "isInstitution":true , "isVerified": true};
    this.userService.registerUserAsInstitution(userId,keyValuePairs);
    this.submitted=true;
  }


  goBack(): void {
    this.router.navigate([this.backUrl]);
  }

  checkIfIsInstitution(userId) :Promise<boolean>{
      return this.userService.checkIfUserIsInstitution(userId)
        .then(res => this.isInstitution = res);

  }

  goToDashboard(){
    this.router.navigate(["/dashboard"]);
  }

}
