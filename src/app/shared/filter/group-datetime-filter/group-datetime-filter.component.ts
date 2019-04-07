import { Component, OnInit, QueryList, ViewChildren, Input, Output, EventEmitter } from '@angular/core';
import { Filter } from '../filter';
import { DatetimeFilterComponent } from '../datetime-filter/datetime-filter.component';

import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-group-datetime-filter',
  templateUrl: './group-datetime-filter.component.html',
  styleUrls: ['./group-datetime-filter.component.scss']
})
export class GroupDatetimeFilterComponent extends Filter implements OnInit {
  public filterValues: Object[] = [];
  @Input() name: string;
  @Input() title: string;
  @Input() type: string;
  @Output() getData = new EventEmitter();
  public filterForm: FormGroup;
  private elementName: string;

  @ViewChildren(DatetimeFilterComponent) datetimeFilters: QueryList<DatetimeFilterComponent>
  constructor() { 
    super();
  }

  ngOnInit() {
    this.elementName = this.name;
  }
  
  public setFilterValues(data,name){
 console.log(name);
    let value = {
      "name":name,
      "value":data.val.value,
      "filter":data.val.filter,
      "type":this.type
    };
    this.filterValues.push(value);
    this.getData.emit(data);
  }

}
