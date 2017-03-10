import {Component, OnInit, Input} from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'login-to-continue',
  template: `        
    <div>
      <p>Loggen Sie sich ein oder registrieren Sie sich um fortzufahren.</p>
    </div>
    <div>
      <button type="button" (click)="login()" class="btn">Login</button>
      <button type="button" (click)="goBack()" class="btn">Zurück</button>
    </div>
  `,
})
export class LoginToContinueComponent {

  @Input() title: string;
  @Input() backUrl: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {};


  login(): void {
    this.authService.login();
  };

  goBack(): void {
    this.router.navigate([this.backUrl]);
  }

}
