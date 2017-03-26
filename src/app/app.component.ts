import {Component, OnInit} from '@angular/core';
import {AuthService} from "./shared/auth.service";
import {UserService} from "./users/service/user.service";
declare let $: any;

@Component({
  selector: 'my-app',
  template: `
    <h1 class="visually-hidden">{{title}}</h1>
    <header>
	
    <nav class="service-nav">
    <div class="container">
      <div class="nav-wrapper">
	      <a class="brand-logo" routerLink="/home">Benefitz</a>
	      <a materialize="sideNav" data-activates="mobile-nav" class="jsLink button-collapse hide-on-med-and-up"><i class="material-icons">menu</i></a>
	      
	      <ul class="right">
          <li>
            <a (click)=authService.login() *ngIf="!authService.loggedIn()">Login</a>
            <a (click)=authService.logout() *ngIf="authService.loggedIn()">Logout</a>
          </li>
        </ul>
	     
        <ul class="right hide-on-small-and-down">
          <li>
            <a routerLink="/forum-list">
              <span>Liste</span>
            </a>
          </li>
          <li *ngIf="authService.loggedIn()">
            <a routerLink="/profile" >
              <span>Profil</span>
            </a>
          </li>
        </ul>
        
        <ul (click)="hideSideNav()" id="mobile-nav" class="side-nav hide-on-med-and-up">
          <li *ngIf="authService.loggedIn() && authService.userProfile" >
            <div class="userView">
              <a routerLink="/profile">
                <div class="background">
                </div>
                <img class="circle" [src]="authService.userProfile.picture">
                <span class="white-text name">{{authService.getUserName()}}</span>
                <span class="white-text email">{{authService.getUserEmail()}}</span>
              </a>
            </div>
          </li>
          <li>
            <a routerLink="/forum-list">
              <i class="material-icons left">list</i>
              <span>Liste</span>
            </a>
          </li>
          <li *ngIf="authService.loggedIn()"> 
            <a routerLink="/profile" >
              <i class="material-icons left">account_box</i>
              <span>Profil</span>
            </a>
          </li>
          <li>
            
            <a (click)=authService.login() *ngIf="!authService.loggedIn()">
              <i class="material-icons left">account_box</i>
              <span>Login</span>
            </a>
            <a (click)=authService.logout() *ngIf="authService.loggedIn()">              
              <i class="material-icons left">exit_to_app</i>
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
      </div>
    </nav>
    </header>
    <main>
    <div class="container">
    <router-outlet></router-outlet>
    </div>
    </main>
    <footer class="page-footer">
        <div class="container">
        <span class="white-text">© 2017 Copyright</span>
        </div>
    </footer>
  `,
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit{

  title = 'Benefitz';
  isInstitution = false;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {};

  ngOnInit(){
    this.checkIfIsInstitution();
  }

  ngOnChanges(){
    this.checkIfIsInstitution();
  }

  checkIfIsInstitution(){
    if(this.authService.loggedIn()&& !this.isInstitution){
      this.userService.checkIfUserIsInstitution(this.authService.getDatabaseId())
        .then(isInstitution => {
          this.isInstitution = isInstitution;
        });
    }
  }

  hideSideNav(){
    $('.button-collapse').sideNav('hide');
  }

}
