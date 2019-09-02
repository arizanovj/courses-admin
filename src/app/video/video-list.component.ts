import { Component, OnInit,AfterViewInit ,ViewChild, ViewChildren,QueryList} from '@angular/core';
import {Video} from './../model/video'
import {DataSource} from '@angular/cdk/collections';
import {VideoService } from '../model/video.service';
import {Observable} from 'rxjs';
import { KeysetPaginationComponent, Direction } from '../shared/keyset/keyset-pagination.component';
import { DatetimeFilterComponent } from '../shared/filter/datetime-filter/datetime-filter.component';
import { InputFilterComponent } from '../shared/filter/input-filter/input-filter.component';
import { KeysetPaginatedList } from '../shared/keyset/keyset.paginated.list';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { GroupDatetimeFilterComponent } from '../shared/filter/group-datetime-filter/group-datetime-filter.component';
import { Params, ActivatedRoute } from '@angular/router';
@Component({
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent extends KeysetPaginatedList implements OnInit {
  @ViewChild(KeysetPaginationComponent)
  @ViewChildren(GroupDatetimeFilterComponent) datetimeFilters: QueryList<DatetimeFilterComponent>
  @ViewChildren(InputFilterComponent) inputFilters: QueryList<InputFilterComponent>;
  private videos :Video[];
  private errorMessage: string;
  private dataSource:VideoDataSource;
  private loading = true;
  public displayedColumns: Array<string>;     

  constructor( 
    private videoService: VideoService,
    private activatedRoute: ActivatedRoute,
     public dialog: MatDialog
   ) {   super(); }

  ngOnInit() {
    this.displayedColumns = ['id', 'name', 'description', 'created_at','updated_at','action_column'];
    this.videos = null;
    this.filterOut();
  }

  private getVideos(filter:Params) {
    this.loading = true;
    let data = this.videoService.getVideos(filter);
    this.dataSource = new VideoDataSource(data);
    data.subscribe(val => {this.setIDs(val); this.loading = false;});
  }

  private filterOut(){
    this.activatedRoute.queryParams.subscribe(params => {
      if(params['lastId']){
        this.getVideos(params);
       }else{
        this.getVideos({"numOfItems":this.NUM_OF_ITEMS,"lastID":this.LAST_ID,"direction":this.DIRECTION});
       }
    });
  }

  private deleteVideo(name: string, id: number): void {
    
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { name: name, id: id, message: 'Are you sure you want to delete this video' },
    });

    dialogRef.afterClosed().subscribe(result => {
    
      if(result){
        this.loading = true;
        let products = this.videoService.deleteVideo(+result).subscribe(result => {
        
          this.getVideos({"numOfItems":this.NUM_OF_ITEMS,"lastID":this.LAST_ID,"direction":this.DIRECTION});
          this.loading = false;
        });
      }
    });
    
  }

}
export class VideoDataSource extends DataSource<any> {
  constructor(private videoData: Observable<Video[]>) {
    super();
  }
  connect(): Observable<Video[]> {
    return this.videoData;
  }
  disconnect() {}
}
