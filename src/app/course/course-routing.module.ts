
import { CommonModule } from '@angular/common';


import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CourseListComponent} from './course-list.component';
import {CourseFormComponent} from './course-form.component';
import { CourseDetailsComponent } from './course-details.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Courses'
        },
        children: [
           
            {
                path: 'create',
                component:CourseFormComponent,
                data: {
                    title: 'Create',
                    context: 'create'
                }
            },
            {
                path: 'update/:id',
                component: CourseFormComponent,
                data: {
                    title: 'Update',
                    context: 'update'
                }
            },
            {
                path: '',
                component: CourseListComponent,
                data: {
                    title: 'List',
                }
            },
            {
                path: ':id',
                component: CourseDetailsComponent,
                data: {
                    title: 'Details',
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CourseRoutingModule {}
