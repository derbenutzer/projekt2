import { Component } from '@angular/core';
import {AuthService} from "./auth.service";

@Component({
  selector: 'my-app',
  template: `
    <div class="container">
        <h1>{{title}}</h1>
        <nav>
          <ul class="nav nav2">
            <li>
              <a routerLink="/home">Startseite</a>
            </li>
            <li>
              <a routerLink="/create-forum">Forum erstellen</a>
            </li>
          </ul>
          <ul class="nav login">
            <li>
              <a (click)=authService.login() *ngIf="!authService.loggedIn()">Log In</a>
            </li>
            <li>
              <a (click)=authService.logout() *ngIf="authService.loggedIn()">Log Out</a>
            </li>
          </ul>
        </nav>
        <router-outlet></router-outlet>
    </div>
  `,
  styles:[`
    nav {
      margin-top: 3rem;
      margin-bottom: 4rem;
    }
    nav a {
      font-size: 2rem;
      text-decoration: none;
      padding: 1rem;
      background-color: lightgrey;
      color: black;
    }
    nav a:hover {
      background-color: lightslategrey;
      color: white;
      cursor:pointer;
    }
  `]
})

export class AppComponent  {

  title = 'FEE - Project 2';

  constructor(private authService: AuthService) {};

}
