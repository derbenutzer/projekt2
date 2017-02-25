import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';



@Component({
  selector: 'forum-list-filter',
  template: `

  <select materialize="material_select" (change)="updateFilter()" multiple [(ngModel)]="filterString">
    <option value="" disabled selected>Alle {{name}}</option>
    <option *ngFor="let choice of choices" value="{{choice}}">{{choice}}</option>
  </select>
  <label for="myselect">Filtern nach {{name}}</label>

  `
})


export class ListFilterComponent {

  @Input() name: string;
  @Input() choices: string[];

  filterString:string[]=[];

  @Output()
  onFilterChange = new EventEmitter();

  updateFilter() {
    this.onFilterChange.emit(this.filterString);
  }

}
