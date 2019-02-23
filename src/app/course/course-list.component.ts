import { Component, OnInit,AfterViewInit ,ViewChild, ViewChildren,QueryList} from '@angular/core';
import {Course} from './../model/course'
import {DataSource} from '@angular/cdk/collections';
import {CourseService } from '../model/course.service';
import {Observable} from 'rxjs';
import { KeysetPaginationComponent, Direction } from '../shared/keyset/keyset-pagination.component';
import { DatetimeFilterComponent } from '../shared/filter/datetime-filter/datetime-filter.component';
import { InputFilterComponent } from '../shared/filter/input-filter/input-filter.component';
import { KeysetPaginatedList } from '../shared/keyset/keyset.paginated.list';
import { Filter } from '../shared/filter/filter';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
@Component({
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent extends KeysetPaginatedList implements OnInit {
  @ViewChild(KeysetPaginationComponent)
  @ViewChildren(DatetimeFilterComponent) datetimeFilters: QueryList<DatetimeFilterComponent>
  @ViewChildren(InputFilterComponent) inputFilters: QueryList<InputFilterComponent>;
  private courses :Course[];
  private errorMessage: string;
  private dataSource:CourseDataSource;
  private loading = true;
  public displayedColumns: Array<string>;     

  constructor( 
    private courseService: CourseService,
     public dialog: MatDialog
   ) {   super(); }

  ngOnInit() {
    this.displayedColumns = ['id', 'name', 'description', 'created_at','updated_at','action_column'];
    this.courses = null;
    this.getCourses(1,10,Direction.Up,[]);
  }

  private getCourses(lastId:number,numOfItems: number, direction: Direction, filter: Array<string>) {
    this.loading = true;
    let data = this.courseService.getCourses(lastId,numOfItems,direction,
      this.inputFilters == null ? [] : Filter.getUrlFormattedFilters([this.inputFilters,this.datetimeFilters])
    );
    this.dataSource = new CourseDataSource(data);
    data.subscribe(val => {this.setIDs(val); this.loading = false;});
  }

  private filterOut(data){
    this.getCourses(1,10,Direction.Up,Filter.getUrlFormattedFilters([this.inputFilters,this.datetimeFilters]));
  }

  private deleteCourse(name: string, id: number): void {
    
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { name: name, id: id, message: 'Are you sure you want to delete this course' },
    });

    dialogRef.afterClosed().subscribe(result => {
    
      if(result){
        this.loading = true;
        let products = this.courseService.deleteCourse(+result).subscribe(result => {
          this.getCourses(1,10,Direction.Up,Filter.getUrlFormattedFilters([this.inputFilters]));
          this.loading = false;
        });
      }
    });
    
  }

}



export class CourseDataSource extends DataSource<any> {
  constructor(private courseData: Observable<Course[]>) {
    super();
  }
  connect(): Observable<Course[]> {
    return this.courseData;
  }
  disconnect() {}
}
