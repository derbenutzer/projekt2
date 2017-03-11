import { Component} from '@angular/core';

@Component({
  selector: 'home',
  template: `
  <h2 class="visually-hidden">{{title}}</h2>
	<div class="row section">
		<div class="container">
			<p class="flow-text">Kurzbeschreibung applikation, how to get started</p>
		</div>
	</div>
	<div class="container">
		<div class="row section">
			<div class="col s6 valign-wrapper hoverable">
				<div class="section center-align">
					<i class="large material-icons">business</i>
					<h3>Institutionen</h3>
					<p>Registrieren Sie sich als Institution und eröffnen Sie einen runden Tisch</p>
					<a routerLink="/register-institution" class="waves-effect waves-light btn-large">Registrierung</a>
				</div>
			</div>
			<div class="col s6 valign-wrapper hoverable">
				<div class="section center-align">
					<i class="large material-icons">dashboard</i>
					<h3>Institutionen</h3>
					<p>Registrieren Sie sich als Institution und eröffnen Sie einen runden Tisch</p>
					<a routerLink="/dashboard" class="waves-effect waves-light btn-large">Verwaltung</a>
				</div>
			</div>
		</div>
	</div>
  `,
})


export class InstitutionsStartComponent {
  title="Institutionen";
}
