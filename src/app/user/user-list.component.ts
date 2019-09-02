import { Component, OnInit,AfterViewInit ,ViewChild, ViewChildren,QueryList} from '@angular/core';
import {User} from './../model/user'
import {DataSource} from '@angular/cdk/collections';
import {UserService } from '../model/user.service';
import {Observable} from 'rxjs';
import { KeysetPaginationComponent, Direction } from '../shared/keyset/keyset-pagination.component';
import { DatetimeFilterComponent } from '../shared/filter/datetime-filter/datetime-filter.component';
import { InputFilterComponent } from '../shared/filter/input-filter/input-filter.component';
import { KeysetPaginatedList } from '../shared/keyset/keyset.paginated.list';
import { FilteredList } from '../shared/filter/filtered.list';
import { Filter } from '../shared/filter/filter';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { GroupDatetimeFilterComponent } from '../shared/filter/group-datetime-filter/group-datetime-filter.component';
import { ActivatedRoute, Params } from '@angular/router';
@Component({

  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends KeysetPaginatedList implements OnInit {
  @ViewChild(KeysetPaginationComponent)
  @ViewChildren(GroupDatetimeFilterComponent) datetimeFilters: QueryList<DatetimeFilterComponent>
  @ViewChildren(InputFilterComponent) inputFilters: QueryList<InputFilterComponent>;
  private users :User[];
  private errorMessage: string;
  private dataSource:UserDataSource;
  private loading = true;
  public displayedColumns: Array<string>;     

  constructor( 
    private userService: UserService,
     public dialog: MatDialog,
     public activatedRoute: ActivatedRoute
   ) {   super(); }

  ngOnInit() {
    this.displayedColumns = ['id', 'first_name', 'last_name','email','is_admin','created_at','updated_at','action_column'];
    this.users = null;
    this.filterOut();
  }
  
  private getUsers( filter: Params) {
    this.loading = true;
    let data = this.userService.getUsers(filter);
    this.dataSource = new UserDataSource(data);
    data.subscribe(val => {this.setIDs(val); this.loading = false;});
  }

  private filterOut(){
    this.activatedRoute.queryParams.subscribe(params => {
      if(params['lastId']){
        this.getUsers(params);
       }else{
        this.getUsers({"numOfItems":this.NUM_OF_ITEMS,"lastID":this.LAST_ID,"direction":this.DIRECTION});
       }
    });
  }

  private deleteUser(name: string, id: number): void {
    
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { name: name, id: id, message: 'Are you sure you want to delete this user' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.loading = true;
        let products = this.userService.deleteUser(+result).subscribe(result => {
          this.getUsers({"numOfItems":this.NUM_OF_ITEMS,"lastID":this.LAST_ID,"direction":this.DIRECTION});
          this.loading = false;
        });
      }
    });
    
  }

}



export class UserDataSource extends DataSource<any> {
  constructor(private userData: Observable<User[]>) { 
    super();
  }
  connect(): Observable<User[]> {
    return this.userData;
  }
  disconnect() {}
}
