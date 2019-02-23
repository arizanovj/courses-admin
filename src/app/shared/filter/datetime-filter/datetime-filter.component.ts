import { Component, OnInit,OnDestroy ,EventEmitter, Output,Input} from '@angular/core';
import { Filter } from '../filter';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-datetime-filter',
  templateUrl: './datetime-filter.component.html',
  styleUrls: ['./datetime-filter.component.css']
})
export class DatetimeFilterComponent  extends Filter implements OnInit {
  @Input() name: string;
  @Input() title: string;
  @Input() type: string;
  @Output() getData = new EventEmitter();
  public filterForm: FormGroup;
  constructor() {
    super();
   }

   types = {
    'datetime': ['et', 'lt', 'gt', 'lte', 'gte'],
    'date': ['et', 'lt', 'gt', 'lte', 'gte'],
  };

  ngOnInit() {
    this.setFiltersByType(this.type,this.types);
    this.setForm();
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
