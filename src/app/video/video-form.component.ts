import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Video } from '../model/video';
import { Course } from '../model/course';
import { VideoService } from '../model/video.service';
import { ActivatedRoute } from '@angular/router';
import { MaterialFileUploadComponent } from '../shared/material-file-upload/material-file-upload.component'
import { ConfigService } from '../model/config.service';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { CourseService } from '../model/course.service';
import { debounceTime} from 'rxjs/operators';
@Component({
  selector: 'app-Video-form',
  templateUrl: './video-form.component.html',
  styleUrls: ['./video-form.component.css']
})
export class VideoFormComponent implements OnInit {

  private videoForm: FormGroup;
  private id: number;
  private sub: any;
  private video: Video;
  private startUpload = false;
  private startUploadVideo = false;
  private coverUrl: string;
  private srcUrl: string;

  private context = 'create';
  private showCoverElement = true;
  private showVideoElement = true;
  private videoCourses: any;
  constructor(
    private fb: FormBuilder,
    private videoService: VideoService,
    private route: ActivatedRoute,
    private configService: ConfigService,
    private router: Router,
    private courseService: CourseService
  ) {

  }


  ngOnInit() {
    this.initVideo();
    this.sub = this.route.params.subscribe(params => {
      this.context =  this.route.snapshot.data['context'];
     
      if (this.context == 'update') {
        this.showCoverElement = false;
        this.showVideoElement = false;
        this.setVideo(+params.id);
        this.id = +params.id;
        this.setCoverUrl(this.id);
        this.setSrcUrl(this.id);
      }
    });
    this.createForm();

    this.videoForm.controls['course_id'].valueChanges.pipe(debounceTime(300))
    .subscribe(name => {
     
      this.courseService.getAutocompleteCourses(name)
        .subscribe(res => {
         // console.log(res);
          return  this.videoCourses  = res;
      })
    })


 
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private setCoverUrl(id: number) {
    this.coverUrl = this.configService.apiHost + '/videos/' + String(id) + '/cover';
  }

  private setSrcUrl(id: number) {
    this.srcUrl = this.configService.apiHost + '/videos/' + String(id) + '/src';
  }

 
  private setCourse(id:number){
    let c = this.courseService.getCourse(id).subscribe(
      result => {
        this.videoForm.controls['course_id'].setValue(result);
      },
      error => {
        console.log(error);
      }

    );
  }

  private createForm() {
    this.videoForm = this.fb.group({
      name: ['', Validators.required],
      description: '',
      cover: this.context == 'create' ? ['', Validators.required] : '',
      src: this.context == 'create' ? ['', Validators.required] : '',
      course_id: ['',  [Validators.required,this.autocompleteSelectionValidator]],
      offline: this.context == 'create' ? [false, Validators.required] : '',
    });
  }

 

  private fileControlChange(event,element:string,property: string) {
    this[property] = event.checked;
    let control = this.videoForm.controls[element];
    if (event.checked) {
      control.setValidators([Validators.required]);
    } else {
      control.clearValidators();
    }
    control.updateValueAndValidity();
  }

  

  private initVideo() {
    this.video = new Video();
    this.video.name = "";
    this.video.description = "";
    this.video.offline = false;

  }
  private setVideo(id: number) {
    let c = this.videoService.getVideo(id).subscribe(
      result => {
        console.log(result);
        this.video = result;
        this.setCourse(this.video.course_id);
      },
      error => {
        console.log(error);
      }

    );
  }

  private updateVideo(id: number) {
    this.startUpload = false;
    if (this.videoForm.valid) {
      this.videoService.updateVideo(this.video).subscribe(
        result => {
          this.startUpload = true;
          this.startUploadVideo = true;
          this.setCoverUrl(+result.data);
          this.setSrcUrl(+result.data);
          this.video.id = +result.data;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  private createVideo() {
    this.startUpload = false;
    this.startUploadVideo = false;
    
    if (this.videoForm.valid) {
    
      this.videoService.createVideo(this.video).subscribe(
        result => {
         
          this.startUpload = true;
          this.startUploadVideo = true;
          this.setCoverUrl(+result.data);
          this.setSrcUrl(+result.data);
          this.video.id = +result.data;
        },
        error => {
          console.log(error);
        }
      );;
    }
  }
  private onFileComplete(data: any) {
    this.router.navigate(['/videos/', this.video.id]);
  }
  private displayFn(course?: Course): string | undefined {
    if(course){
      this.video.course_id = course.id;
      return course.name;
    }
    return undefined;
  }

  private autocompleteSelectionValidator(control: FormControl) : ValidationErrors | null {
    const selection: any = control.value;
    if (typeof selection === 'string') {
      return { requireMatch: true };
    }
    return null;
  }

}