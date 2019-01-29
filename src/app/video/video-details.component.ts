import { Component, OnInit, OnDestroy } from '@angular/core';
import { Video } from '../model/video';
import { VideoService } from '../model/video.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.css']
})
export class VideoDetailsComponent implements OnInit {
  private sub: any;
  private video : Video;
  private id: number;
  constructor(private videoService: VideoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params.id) {
        this.setVideo(params.id);
      }
    });


  }

  private setVideo(id:number){
    let c = this.videoService.getVideo(id).subscribe(
      result => {
        console.log(result);
        this.video = result;
      },
      error => {
        console.log(error);
      }

    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
