
import { Component, OnInit,OnDestroy ,EventEmitter, Output,Input} from '@angular/core';
import { Filter } from '../filter';
import { FormBuilder,FormControl, Validators,FormGroup  } from '@angular/forms';
@Component({
  selector: 'app-input-filter',
  templateUrl: './input-filter.component.html',
  styleUrls: ['./input-filter.component.css']
})
export class InputFilterComponent extends Filter implements OnInit {
  public filterValues: Object[] = [];
  @Input() name: string;
  @Input() title: string;
  @Input() type: string;
  @Output() getData = new EventEmitter();
  public filterForm: FormGroup
  types = {
    'string': ['et', 'cnt','cnts','cnte'],
    'number': ['et', 'lt', 'gt', 'lte', 'gte', 'cnt','cnts','cnte'],
  };
  
  constructor(
   
  ) {
    super();
   
   }

  ngOnInit() {
    this.setFiltersByType(this.type,this.types);
    this.setForm();
    this.formChange();
  }
  private formChange() {
    this.filterForm.valueChanges.subscribe(form => {
      this.filterValues = [];
      let value = {
        "name":this.name,
        "value":form.value,
        "filter":form.filter,
        "type":this.type
      };
      this.filterValues.push(value);
    });
  }
  private setForm(){
    this.filterForm = new FormGroup({
      filter:new FormControl('', <any>Validators.required),
      value: new FormControl('', <any>Validators.required),
  });
  }

  private filterSubmit(){
    if(this.filterForm.valid){
      this.getData.emit({
        val:this.filterForm.value,
    
      });
    }
  }

}
