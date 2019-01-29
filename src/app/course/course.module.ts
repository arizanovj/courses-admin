import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from './course-list.component';
import { CourseFormComponent } from './course-form.component';
import { CourseService } from '../model/course.service';
import { CourseRoutingModule } from './course-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CourseDetailsComponent } from './course-details.component';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    CourseRoutingModule,
  ],
  declarations: [CourseListComponent,CourseFormComponent,  CourseDetailsComponent],
  providers: [CourseService],
  entryComponents: [ConfirmDialogComponent]
})
export class CourseModule { }
