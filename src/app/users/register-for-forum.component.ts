import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {AuthService} from "../shared/auth.service";
import {UserService} from "./service/user.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'register-owner',
  template: `    
    <h2>{{pageTitle}}</h2>
    <div >
      <p>Damit sie an einem runden Tische teilnehmen können müssen sie sich für diesen registrieren. Wir leiten ihre Anfrage an die verantwortliche Institution weiter, welche sie direkt benachrichtig sobald sie registriert sind.</p>
      <p>Bestätigen sie ihre Registrierungsanfrage indem sie auf "Senden" klicken.</p>
      <button (click)="sendRequest()" class="btn waves-effect waves-light" type="submit" name="action">Senden
        <i class="material-icons right">send</i>
      </button>
      <button type="button" class="waves-effect waves-light btn" (click)="goBack()">Zurück</button>
    </div>
  `,
})
export class RegisterForForumComponent implements OnInit{

  pageTitle="Für Forum registrieren"

  constructor(
    private location: Location,
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) {};

  ngOnInit(): void {
      console.log("oninit");
  }


  sendRequest(): void {
    this.route.params
      .switchMap((params: Params) => {
        return this.userService.registerUserForForum(this.authService.userProfile['user_metadata']['databaseId'], params['id'])
      })
      .subscribe(response => {
        console.log(response);
      });

  };


  goBack(): void {
    this.location.back();
  }

}
