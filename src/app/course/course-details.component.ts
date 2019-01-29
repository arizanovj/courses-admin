import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from '../model/course';
import { CourseService } from '../model/course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  private sub: any;
  private course : Course;
  private id: number;
  constructor(private courseService: CourseService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params.id) {
        this.setCourse(params.id);
      }
    });


  }

  private setCourse(id:number){
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
