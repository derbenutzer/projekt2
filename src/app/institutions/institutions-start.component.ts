import { Component} from '@angular/core';

@Component({
  selector: 'home',
  template: `
  <h2 class="visually-hidden">{{title}}</h2>
	<div class="row section">
		<div class="container">
			<p class="flow-text">Registrieren Sie sich als Institution oder Verwalten Sie ihre runden Tische</p>
		</div>
	</div>
	<div class="container">
		<div class="row section">
			<div class="col s6 valign-wrapper hoverable">
				<div class="section center-align">
					<i class="large material-icons">business</i>
					<h3>Registrierung</h3>
					<p>Registrieren Sie sich als Institution</p>
					<a routerLink="/register-institution" class="waves-effect waves-light btn-large">Registrierung</a>
				</div>
			</div>
			<div class="col s6 valign-wrapper hoverable">
				<div class="section center-align">
					<i class="large material-icons">dashboard</i>
					<h3>Verwaltung</h3>
					<p>Verwalten Sie ihre runden Tische</p>
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
