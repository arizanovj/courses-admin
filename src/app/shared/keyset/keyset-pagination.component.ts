import { Component, OnInit,OnDestroy ,EventEmitter, Output,Input} from '@angular/core';
import {  } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './keyset-pagination.template.html',
})
export class KeysetPaginationComponent implements OnInit, OnDestroy { 
  @Output() page = new EventEmitter();
  @Input() IDs:Object;
  protected direction: Direction;
  message = '';
  ngOnInit()    { this.message = "bla";}
  ngOnDestroy() { this.message = "aa" }
  private change(lastId:number,numOfItems: number, direction: string){
     this.page.emit({'lastId':lastId,'numOfItems':numOfItems,'direction':direction});
  }

}
export enum Direction{
  Up = "up" ,  Down = "down"
}