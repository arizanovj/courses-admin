
import { CommonModule } from '@angular/common';


import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {VideoListComponent} from './video-list.component';
import {VideoFormComponent} from './video-form.component';
import { VideoDetailsComponent } from './video-details.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Videos'
        },
        children: [
           
            {
                path: 'create',
                component:VideoFormComponent,
                data: {
                    title: 'Create',
                    context: 'create'
                }
            },
            {
                path: 'update/:id',
                component: VideoFormComponent,
                data: {
                    title: 'Update',
                    context: 'update'
                }
            },
            {
                path: '',
                component: VideoListComponent,
                data: {
                    title: 'List',
                }
            },
            {
                path: ':id',
                component: VideoDetailsComponent,
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
export class VideoRoutingModule {}
