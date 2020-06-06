import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './task-details-routing.module';

import { TaskDetailsComponent } from './task-details.component';

@NgModule({
	declarations: [TaskDetailsComponent],
	imports: [AppRoutingModule, CommonModule],
})
export class TaskDetailsModule {}
