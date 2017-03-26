// app/profile_edit.component.ts
import {Component, ViewChild, ViewChildren, QueryList} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../shared/auth.service";
import 'rxjs';
import {FormInputComponent} from "./form-input.component";

@Component({
  selector: 'submit-ok',
  template: `
    <p class="flow-text">Vielen Dank. Ihre Änderungen wurden übernommen.</p>
    <div class="buttonPanel">
    <button (click)="goHome()" type="button" class="waves-effect waves-light btn">Zur Startseite</button>
    </div>
  `,
})

export class SubmitOKComponent {


  constructor(private router: Router) {};

  goHome(){
    this.router.navigate(["/home"]);
  }

}
