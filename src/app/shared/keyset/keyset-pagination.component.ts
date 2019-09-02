import { Component, OnInit,OnDestroy ,EventEmitter, Output,Input} from '@angular/core';
import {  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './keyset-pagination.template.html',
})
export class KeysetPaginationComponent implements OnInit { 
  @Output() page = new EventEmitter();
  @Input() IDs:Object;
  protected direction: Direction;
  ngOnInit()  { 
  }

   constructor(
    private router: Router
  ){
  }
  
  private change(lastId:number,numOfItems: number, direction: string){
     console.log({'lastId':lastId,'numOfItems':numOfItems,'direction':direction});
     this.router.navigate([], {
       queryParams: {'lastId':lastId,'numOfItems':numOfItems,'direction':direction},
       queryParamsHandling: 'merge',
     });
  }



}
export enum Direction{
  Up = "up" ,  Down = "down"
}