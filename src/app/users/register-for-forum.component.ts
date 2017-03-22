import {Component, OnInit} from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {UserService} from "./service/user.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ForumService} from "../forum-list/service/forum.service";

@Component({
  selector: 'register-owner',
  template: `    
    <h2>{{pageTitle}}</h2>
    <div *ngIf="!hasCompletedProfile">
      <p>Bitte vervollständigen Sie ihr erst ihr Profil.</p>
      <button (click)="openProfile()" class="btn waves-effect waves-light" type="submit" name="action">Zum Profil
        <i class="material-icons right">send</i>
      </button>
      <button type="button" class="waves-effect waves-light btn" (click)="goBack()">Zurück</button>
    </div>
    <div *ngIf="hasCompletedProfile">
      <p>Damit Sie an einem runden Tische teilnehmen können müssen Sie sich für diesen registrieren. Wir leiten ihre Anfrage an die verantwortliche Institution weiter, welche Sie direkt benachrichtig sobald Sie registriert sind.</p>
      <p>Bestätigen Sie ihre Registrierungsanfrage indem Sie auf "Senden" klicken.</p>
      <button (click)="sendRequest()" class="btn waves-effect waves-light" type="submit" name="action">Senden
        <i class="material-icons right">send</i>
      </button>
      <button type="button" class="waves-effect waves-light btn" (click)="goBack()">Zurück</button>
    </div>
  `,
})
export class RegisterForForumComponent implements OnInit{

  pageTitle="Für Forum registrieren";
  hasCompletedProfile:boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private forumService: ForumService,
    private route: ActivatedRoute,
    private router: Router
  ) {};

  ngOnInit(): void {
      this.hasCompletedProfile = this.authService.hasCompletedProfile();
  }

  sendRequest(): void {
    let forumId:string;

    this.route.params
      .switchMap((params: Params) => {
        forumId = params['id'];
        return this.userService.registerUserForForum(this.authService.userProfile['user_metadata']['databaseId'], forumId);
      })
      .subscribe(response => {
        this.forumService.addUser(forumId)
          .then(res => this.goBack());
      });
  };


  goBack(): void {
    this.router.navigate(['/forum-list']);
  }

  openProfile(){
    this.router.navigate(["/profile"]);
  }

}
