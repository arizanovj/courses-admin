import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoListComponent } from './video-list.component';
import { VideoFormComponent } from './video-form.component';
import { VideoService } from '../model/video.service';
import { VideoRoutingModule } from './video-routing.module';
import { SharedModule } from '../shared/shared.module';
import { VideoDetailsComponent } from './video-details.component';
import { CourseService } from '../model/course.service';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    VideoRoutingModule,
  ],
  declarations: [VideoListComponent, VideoFormComponent, VideoDetailsComponent],
  providers: [VideoService, CourseService],
  entryComponents: [ConfirmDialogComponent]
})
export class VideoModule { }
