import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { TaskComponent } from './task/task.component';
import { TasksListComponent } from './tasks-list.component';

import { TaskFilterPipe } from '../_pipes/task-filter-pipe';

import { TaskListService } from '../_services/task-list.service';
import { TaskListDataService } from '../_services/task-list-data.service';

@NgModule({
	declarations: [TasksListComponent, TaskComponent, TaskFilterPipe],
	imports: [
		BrowserModule,
		CommonModule,
		FormsModule,
		DragDropModule,
		HttpClientModule,
	],
	providers: [TaskListService, TaskListDataService],
	exports: [TasksListComponent],
})
export class TasksListModule {}
