import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Course } from '../model/course';
import { CourseService } from '../model/course.service';
import { ActivatedRoute } from '@angular/router';
import { MaterialFileUploadComponent } from '../shared/material-file-upload/material-file-upload.component'
import { ConfigService } from '../model/config.service';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  courseForm: FormGroup;
  private id: number;
  private sub: any;
  private course: Course;
  private startUpload = false;
  private coverUrl: string;
  private context = 'create';
  private showCoverElement = true;
  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private configService: ConfigService,
    private router: Router
  ) {

  }


  ngOnInit() {
    this.initCourse();
    this.sub = this.route.params.subscribe(params => {
      this.context =  this.route.snapshot.data['context'];
     
      if (this.context == 'update') {
        this.showCoverElement = false;
        this.setCourse(+params.id);
        this.id = +params.id;
        this.setCoverUrl(this.id);
      }
    });

    this.createForm();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private setCoverUrl(id: number) {
    this.coverUrl = this.configService.apiHost + '/courses/' + String(id) + '/cover';
  }

 

  private createForm() {
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      description: '',
      cover: this.context == 'create' ? ['', Validators.required] : '',
    });
  }

  private updateCover(event) {
    this.showCoverElement = event.checked;
    let control = this.courseForm.controls['cover'];
    if (event.checked) {
      control.setValidators([Validators.required]);
    } else {
      control.clearValidators();
    }
    control.updateValueAndValidity();
  }

  private initCourse() {
    this.course = new Course();
    this.course.name = "";
    this.course.description = "";
  }
  private setCourse(id: number) {
    let c = this.courseService.getCourse(id).subscribe(
      result => {
        console.log(result);
        this.course = result;
      },
      error => {
        console.log(error);
      }

    );
  }

  private updateCourse(id: number) {
    this.startUpload = false;
    if (this.courseForm.valid) {
      this.courseService.updateCourse(this.course).subscribe(
        result => {
          this.startUpload = true;
          this.setCoverUrl(+result.data);
          this.course.id = +result.data;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  private createCourse() {
    this.startUpload = false;
    if (this.courseForm.valid) {
      this.courseService.createCourse(this.course).subscribe(
        result => {
         
          this.startUpload = true;
          this.setCoverUrl(+result.data);
          this.course.id = +result.data;
        },
        error => {
          console.log(error);
        }
      );;
    }
  }
  private onFileComplete(data: any) {
    this.router.navigate(['/courses/', this.course.id]);
  }

}