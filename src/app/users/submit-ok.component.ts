// app/profile_edit.component.ts
import {Component, ViewChild, ViewChildren, QueryList} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../shared/auth.service";
import 'rxjs';
import {FormInputComponent} from "./form-input.component";

@Component({
  selector: 'submit-ok',
  template: `
    <h3>Vielen Dank. Ihre Änderungen wurden übernommen.</h3>
  `,
})

export class SubmitOKComponent {
}
