import {ListFilterComponent} from "./list-filter.component";
import {EventEmitter} from '@angular/core';

describe('ListFilterComponent', () => {

  let listFilter: ListFilterComponent;

  beforeEach(() => {
    listFilter = new ListFilterComponent();
  })


  it('should be initialzed with empty filter string', () => {
    expect(listFilter.filterString.length).toBe(0);
  });

  it('should emit filterString on updateFilter', () => {

    listFilter.filterString = ["test"];
    listFilter.onFilterChange.subscribe(event => {

      expect(event).toEqual(["test"]);
      }
    )
    listFilter.updateFilter();
  });

  }
);
