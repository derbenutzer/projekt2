import { Component} from '@angular/core';

@Component({
  selector: 'home',
  template: `
  <h2 class="visually-hidden">{{title}}</h2>
	<div class="row section">
		<div class="container">
			<p class="flow-text">Registrieren Sie sich als Institution oder verwalten Sie Ihre Runden Tische</p>
		</div>
	</div>
	<div class="container">
		<div class="row section">
			<div class="col s6 valign-wrapper">
				<div class="icon-block section center-align">
					<i class="large material-icons">contact_phone</i>
					<h3>Registrierung</h3>
					<p>Registrieren Sie sich als Institution</p>
					<a routerLink="/register-institution" class="waves-effect waves-light btn-large">Registrierung</a>
				</div>
			</div>
			<div class="col s6 valign-wrapper">
				<div class="icon-block section center-align">
					<i class="large material-icons">dashboard</i>
					<h3>Verwaltung</h3>
					<p>Verwalten Sie Ihre Runden Tische</p>
					<a routerLink="/dashboard" class="waves-effect waves-light btn-large">Verwaltung</a>
				</div>
			</div>
		</div>
	</div>

  `,
  styles:[`

    @media only screen and (max-width: 650px){
          .row .col.s6 {
              width: 100%;
              margin-left: auto;
              left: auto;
              right: auto;
          }
    }
    
    .icon-block {
      margin-left: auto;
      margin-right: auto;
    }
    
`]
})


export class InstitutionsStartComponent {
  title="Institutionen";
}
