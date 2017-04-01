import {Component, OnInit} from '@angular/core';
import {AuthService} from "./shared/auth.service";
import {UserService} from "./users/service/user.service";
import {TranslateService} from '@ngx-translate/core';
declare let $: any;

@Component({
  selector: 'my-app',
  template: `
    <h1 class="visually-hidden">{{title}}</h1>
    <header>
	
    <ul id="dropdownLang" class="dropdown-content">
      <li><a (click)="translate.use('de')">de</a></li>
      <li><a (click)="translate.use('en')">en</a></li>
    </ul>
    <nav class="service-nav">
    <div class="container">
      <div class="nav-wrapper">
	      <a class="brand-logo" routerLink="/home">{{ 'HOME.TITLE' | translate }}</a>
	      <a materialize="sideNav" data-activates="mobile-nav" class="jsLink button-collapse hide-on-med-and-up"><i class="material-icons">menu</i></a>
	      
	      <ul class="right">
          <li class="login">
            <a (click)=authService.login() *ngIf="!authService.loggedIn()">{{ 'HOME.LOGIN' | translate }}</a>
            <a (click)=authService.logout() *ngIf="authService.loggedIn()">{{ 'HOME.LOGOUT' | translate }}</a>
          </li>
        </ul>
	     
        <ul class="right hide-on-small-and-down">
          <li>
            <a routerLink="/forum-list">
              <span>{{ 'HOME.LIST' | translate }}</span>
            </a>
          </li>
          <li *ngIf="authService.isInstitution()">
            <a routerLink="/dashboard">
              <span>{{ 'HOME.DASHBOARD' | translate }}</span>
            </a>
          </li>
          <li *ngIf="authService.loggedIn()">
            <a routerLink="/profile" >
              <span>{{ 'HOME.PROFILE' | translate }}</span>
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
              <span>{{ 'HOME.LIST' | translate }}</span>
            </a>
          </li>
          <li *ngIf="authService.isInstitution()">
            <a routerLink="/dashboard">
            <i class="material-icons left">dashboard</i>
              <span>{{ 'HOME.DASHBOARD' | translate }}</span>
            </a>
          </li>
          <li *ngIf="authService.loggedIn()"> 
            <a routerLink="/profile" >
              <i class="material-icons left">account_box</i>
              <span>{{ 'HOME.PROFILE' | translate }}</span>
            </a>
          </li>
          <li>
            <a (click)=authService.login() *ngIf="!authService.loggedIn()">
              <i class="material-icons left">account_box</i>
              <span>{{ 'HOME.LOGIN' | translate }}</span>
            </a>
            <a (click)=authService.logout() *ngIf="authService.loggedIn()">              
              <i class="material-icons left">exit_to_app</i>
              <span>{{ 'HOME.LOGOUT' | translate }}</span>
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
        <ul class="left">
          <a class="copyright"><i class="material-icons">copyright</i>2017</a>
        </ul>
        <ul class="right">
          <li>
            <a class="dropdown-button jsLink" data-activates="dropdownLang"><i class="material-icons">language</i><i class="material-icons right">arrow_drop_down</i></a>
          </li>
        </ul>
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
    private userService: UserService,
    private translate: TranslateService
  ) {
    translate.addLangs(["en", "de"]);
    translate.setDefaultLang('de');

    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|de/) ? browserLang : 'de');
  };

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
