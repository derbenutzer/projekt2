// app/profile_edit.component.ts
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'form-input',
  template: `
    <div class="form-group">
      <label class="active" for="{{name}}">{{text}}</label>
      <input (change)="sendContent()" id="{{name}}" type="text" class="form-control" [(ngModel)]="content" name="{{name}}" placeholder="{{placeholder}}" required>
    </div>
`,
})

export class FormInputComponent {

  @Input() name: string;
  @Input() text: string;
  @Input() placeholder: string;

  profile;
  content: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.profile = this.authService.userProfile;
    this.setData();
  }

  setData(){
    if(this.profile['user_metadata']){
      if(this.profile['user_metadata'][this.name]) {
        this.content = this.profile['user_metadata'][this.name];
      }
      else{
        this.content = this.profile[this.name];
      }
    }
    else{
      this.content = this.profile[this.name];
    }
  }

  @Output()
  onInputChange = new EventEmitter();


  sendContent(){
    let  data = {};
    data[this.name]=this.content;

    this.onInputChange.emit(data);
  }
}
