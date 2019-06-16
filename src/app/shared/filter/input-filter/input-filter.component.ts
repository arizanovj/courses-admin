
import { Component, OnInit, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { Filter } from '../filter';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-input-filter',
  templateUrl: './input-filter.component.html',
  styleUrls: ['./input-filter.component.css']
})
export class InputFilterComponent extends Filter implements OnInit {

  @Input() name: string;
  @Input() title: string;
  @Input() type: string;
  public filterForm: FormGroup
  types = {
    'string': ['et', 'cnt', 'cnts', 'cnte'],
    'number': ['et', 'lt', 'gt', 'lte', 'gte', 'cnt', 'cnts', 'cnte'],
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    super();

  }

  ngOnInit() {
    this.setFiltersByType(this.type, this.types);
    this.activatedRoute.queryParams.subscribe(params => {
      let filterAndValue = this.getFilterAndValueByName(params,this.name);
      if(filterAndValue !== null){
        this.setForm(filterAndValue.filter,filterAndValue.value);
      }else{
        this.setForm("","");
      }
    });
    
  }
  private setForm(filter : string, value: string) {
    this.filterForm = new FormGroup({
      filter: new FormControl(filter, <any>Validators.required),
      value: new FormControl(value, <any>Validators.required),
    });
  }

  private filterSubmit() {
    if (this.filterForm.valid) {
      let filterKey = this.getFilterKey(this.name);
      let filterValue = this.getFilterValue(this.filterForm.get("filter").value, this.filterForm.get("value").value, this.type);
      let params = {};
      params[filterKey] = filterValue;
      this.router.navigate([], {
        queryParams: params,
        queryParamsHandling: 'merge',
      });
    }
  }

}
