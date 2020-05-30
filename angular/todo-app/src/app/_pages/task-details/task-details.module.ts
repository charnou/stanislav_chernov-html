import { NgModule } from '@angular/core';
import { TaskDetailsComponent } from './task-details.component';
import { AppRoutingModule } from './task-details-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TaskDetailsComponent],
  imports: [AppRoutingModule, CommonModule],
})
export class TaskDetailsModule {}
