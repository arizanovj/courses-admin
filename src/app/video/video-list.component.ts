import { Component, OnInit,AfterViewInit ,ViewChild, ViewChildren,QueryList} from '@angular/core';
import {Video} from './../model/video'
import {DataSource} from '@angular/cdk/collections';
import {VideoService } from '../model/video.service';
import {Observable} from 'rxjs';
import { KeysetPaginationComponent, Direction } from '../shared/keyset/keyset-pagination.component';
import { DatetimeFilterComponent } from '../shared/filter/datetime-filter/datetime-filter.component';
import { InputFilterComponent } from '../shared/filter/input-filter/input-filter.component';
import { KeysetPaginatedList } from '../shared/keyset/keyset.paginated.list';
import { FilteredList } from '../shared/filter/filtered.list';
import { Filter } from '../shared/filter/filter';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
@Component({

  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent extends KeysetPaginatedList implements OnInit {
  @ViewChild(KeysetPaginationComponent)
  @ViewChild(DatetimeFilterComponent)
  @ViewChildren(InputFilterComponent) inputFilters: QueryList<InputFilterComponent>;
  private videos :Video[];
  private errorMessage: string;
  private dataSource:VideoDataSource;
  private loading = true;
  public displayedColumns: Array<string>;     

  constructor( 
    private videoService: VideoService,
     public dialog: MatDialog
   ) {   super(); }

  ngOnInit() {
    this.displayedColumns = ['id', 'name', 'description', 'created_at','updated_at','action_column'];
    this.videos = null;
    this.getVideos(1,10,Direction.Up,[]);
  }

  private getVideos(lastId:number,numOfItems: number, direction: Direction, filter: Array<string>) {
    this.loading = true;
    let data = this.videoService.getVideos(lastId,numOfItems,direction,
      this.inputFilters == null ? [] : Filter.getUrlFormattedFilters([this.inputFilters])
    );
    this.dataSource = new VideoDataSource(data);
    data.subscribe(val => {this.setIDs(val); this.loading = false;});
  }

  private filterOut(data){
    this.getVideos(1,10,Direction.Up,Filter.getUrlFormattedFilters([this.inputFilters]));
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
          this.getVideos(1,10,Direction.Up,Filter.getUrlFormattedFilters([this.inputFilters]));
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
