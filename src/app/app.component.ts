import { Component } from '@angular/core';
import {AuthService} from "./auth.service";

@Component({
  selector: 'my-app',
  template: `
    <h1 class="visually-hidden">{{title}}</h1>
    <header>
    <nav class="service-nav">
      <div class="container">
        <ul class="nav nav2">
          <li>
            <a class="navHome" routerLink="/home"><span>P2-Home</span></a>
          </li>
          <li>
            <a routerLink="/create-forum">Forum erstellen</a>
          </li>
        </ul>
        <ul class="nav login right">
          <li>
            <a (click)=authService.login() *ngIf="!authService.loggedIn()">Log In</a>
          </li>
          <li>
            <a (click)=authService.logout() *ngIf="authService.loggedIn()">Log Out</a>
          </li>
        </ul>
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

export class AppComponent  {

  title = 'FEE - Project 2';

  constructor(private authService: AuthService) {};

}
