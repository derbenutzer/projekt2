import {Component, OnInit} from '@angular/core';
import {AuthService} from "./shared/auth.service";

@Component({
  selector: 'my-app',
  template: `
    <h1 class="visually-hidden">{{title}}</h1>
    <header>
	
    <nav class="service-nav">
    <div class="container">
      <div class="nav-wrapper">
	      <a class="brand-logo" routerLink="/home">Benefitz</a>
        <ul class="nav right">
          <li>
            <a class="navHome" routerLink="/home"><span>Startseite</span></a>
          </li>
          <li>
            <a routerLink="/create-forum">Forum erstellen</a>
          </li>
          <li>
            <a (click)=authService.login() *ngIf="!authService.loggedIn()">Log In</a>
            <a (click)=authService.logout() *ngIf="authService.loggedIn()">Log Out</a>
          </li>
          <li *ngIf="authService.loggedIn() && authService.userProfile">
             <a routerLink="/profile"><img  class="userImage" [src]="authService.userProfile.picture"></a>
          </li>
          <li *ngIf="authService.loggedIn()">
            <a routerLink="/profile" >Profil</a>
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

export class AppComponent{

  title = 'FEE - Project 2';
  constructor(private authService: AuthService) {};

}
