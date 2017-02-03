import { Component, OnInit } from '@angular/core';
import {Forum} from "./forum";
import {ForumService} from "./forum.service";
import {ForumList} from "./forum-list";
import {AuthHttp} from "angular2-jwt";

@Component({
  selector: 'home',
  template: `
    <h2 class="visually-hidden">{{title}}</h2>
    	<!-- Titel und Bearbeiten-Felder -->
	<div class="row section">
		<div class="container">
			<p class="flow-text">Kurzbeschreibung applikation, how to get started</p>
		</div>
	</div>
	<!-- Inhalt beginnt hier -->
	<div class="container">
		<div class="row section">
			<div class="col s6 valign-wrapper hoverable">
				<div class="section center-align">
					<i class="large material-icons">person_pin</i>
					<h3>Privatnutzer</h3>
					<p>Starten Sie mit der Suche nach einem Runden Tisch</p>
					<a routerLink="/forum-list" class="waves-effect waves-light btn-large">Suche</a>
				</div>
			</div>
			<div class="col s6 valign-wrapper hoverable">
				<div class="section center-align">
					<i class="large material-icons">business</i>
					<h3>Institutionen</h3>
					<p>Registrieren Sie sich als Institution und eröffnen Sie einen runden Tisch</p>
					<a routerLink="/register-owner" class="waves-effect waves-light btn-large">Registrierung</a>
				</div>
			</div>
		</div>
	</div>
  `,
})


export class HomeComponent {
  title="Startseite";
}
