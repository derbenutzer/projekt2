import { Component } from '@angular/core';

@Component({
  selector: 'home',
  template: `
    <h2 class="visually-hidden">{{title}}</h2>
    	<!-- Titel und Bearbeiten-Felder -->
	<div class="row section">
		<div class="container">
			<p class="flow-text">{{ 'HOME.BRIEF' | translate }}</p>
		</div>
	</div>
	<!-- Inhalt beginnt hier -->
	<div class="container">
		<div class="row section">
			<div class="col s6 valign-wrapper">
				<div class="icon-block  section center-align">
					<i class="large material-icons">person_pin</i>
					<h3>{{ 'HOME.PRIVATE' | translate }}</h3>
					<p>{{ 'HOME.PRIVATE_BRIEF' | translate }}</p>
					<a routerLink="/forum-list" class="waves-effect waves-light btn-large">{{ 'HOME.SEARCH' | translate }}</a>
				</div>
			</div>
			<div class="col s6 valign-wrapper">
				<div class="icon-block section center-align">
					<i class="large material-icons">business</i>
					<h3>{{ 'HOME.INSTITUTION' | translate }}</h3>
					<p>{{ 'HOME.INSTITUTION_BRIEF' | translate }}</p>
					<a routerLink="/institutions-start" class="waves-effect waves-light btn-large">{{ 'HOME.START' | translate }}</a>
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


export class HomeComponent {
  title="Startseite";
}
