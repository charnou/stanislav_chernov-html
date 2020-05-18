import { Task } from './../app.component';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent implements OnInit {
  // VAR FOR STATES
  public isDeleteHover: boolean;
  public isDoneHover: boolean;
  public isEditing: boolean;

  // INTERMEDIATE VARS FOR INPUTS
  public editingTitle: string;
  public editingDescription: string;

  constructor() {
    this.isDeleteHover = false;
    this.isDoneHover = false;
    this.isEditing = false;
  }

  @Input()
  public task: Task;

  @Input()
  public index: number;

  @Output()
  public onTaskDelete = new EventEmitter();

  @Output()
  public onTaskComplete = new EventEmitter();

  ngOnInit() {}

  // CALL PARENT TO DELETE TASK
  public deleteTask(): void {
    this.onTaskDelete.emit(this.task);
  }

  // CALL PARENT TO COMPLETE TASK
  public completeTask(): void {
    this.onTaskComplete.emit(this.task);
  }

  // CHANGE STATE TO 'EDITING'
  public editToggle(): void {
    this.isEditing = !this.isEditing;
  }

  // SYNC OF Task{} FIELD AND INTERMEDIATE INPUTS
  public syncInputs(): void {
    this.editingTitle = this.task.title;
    this.task.description === 'No description...'
      ? (this.editingDescription = '')
      : (this.editingDescription = this.task.description);
  }

  // PUSH CHANGES FROM INTERMEDIATE INPUTS INTO Task{}
  public saveChanges(): void {
    this.task.title = this.editingTitle;
    this.editingDescription === ''
      ? (this.task.description = 'No description...')
      : (this.task.description = this.editingDescription);
    this.isEditing = false;
  }
}
