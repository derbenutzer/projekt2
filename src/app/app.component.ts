import {Component, OnInit} from '@angular/core';
import {AuthService} from "./shared/auth.service";
declare var $: any;

@Component({
  selector: 'my-app',
  template: `
    <h1 class="visually-hidden">{{title}}</h1>
    <header>
	
    <nav class="service-nav">
    <div class="container">
      <div class="nav-wrapper">
	      <a class="brand-logo" routerLink="/home">Benefitz</a>
	      <a materialize="sideNav" data-activates="mobile-nav" class="jsLink button-collapse"><i class="material-icons">menu</i></a>
	      
	      <ul class="right">
          <li>
            <a (click)=authService.login() *ngIf="!authService.loggedIn()">Log In</a>
            <a (click)=authService.logout() *ngIf="authService.loggedIn()">Log Out</a>
          </li>
        </ul>
	     
        <ul class="right hide-on-med-and-down">
          <li>
            <a class="navHome" routerLink="/home"><span>Startseite</span></a>
          </li>
          <li *ngIf="authService.loggedIn() && authService.userProfile">
             <a routerLink="/profile"><img  class="userImage" [src]="authService.userProfile.picture"></a>
          </li>
          <li *ngIf="authService.loggedIn()">
            <a routerLink="/profile" >Profil</a>
          </li>
        </ul>

        <ul (click)="hideSideNav()" id="mobile-nav" class="side-nav">
          <li>
            <a class="navHome" routerLink="/home"><span>Startseite</span></a>
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
  sideNavIsVisible = true;

  constructor(private authService: AuthService) {};

  hideSideNav(){
    $('.button-collapse').sideNav('hide');
  }


}
