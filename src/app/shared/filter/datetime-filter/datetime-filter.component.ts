import { Component, OnInit,OnDestroy ,EventEmitter, Output,Input} from '@angular/core';
import { Filter } from '../filter';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-datetime-filter',
  templateUrl: './datetime-filter.component.html',
  styleUrls: ['./datetime-filter.component.css']
})
export class DatetimeFilterComponent  extends Filter implements OnInit {
  public filterValues: Object[] = [];
  @Input() name: string;
  @Input() title: string;
  @Input() type: string;
  @Output() getData = new EventEmitter();
  public filterForm: FormGroup;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    super();
   }

   types = {
    'datetime': ['et', 'lt', 'gt', 'lte', 'gte'],
    'date': ['et', 'lt', 'gt', 'lte', 'gte'],
  };

  ngOnInit() {
    this.setFiltersByType(this.type,this.types);
    this.activatedRoute.queryParams.subscribe(params => {
      let filterAndValue = this.getFilterAndValueByName(params,this.name);
      if(filterAndValue !== null){
        this.setForm(filterAndValue.filter,filterAndValue.value);
      }else{
        this.setForm("","");
      }
    });
  }
  private setForm(filter:string,value:string){
    this.filterForm = new FormGroup({
      filter:new FormControl(filter, <any>Validators.required),
      value: new FormControl( new Date(value), <any>Validators.required),
  });
  }

  private filterSubmit(){
    if(this.filterForm.valid){
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

}
