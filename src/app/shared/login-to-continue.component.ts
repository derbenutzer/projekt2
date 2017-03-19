import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Component({
  selector: 'login-to-continue',
  template: `        
    <div>
      <p class="flow-text">Loggen Sie sich ein oder registrieren Sie sich um fortzufahren.</p>
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
