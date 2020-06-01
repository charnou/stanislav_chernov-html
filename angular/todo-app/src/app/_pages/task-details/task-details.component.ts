import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from '../../_services/task-list-data.service';
import { TaskListService } from '../../_services/task-list.service';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit, OnDestroy {
  public currentTask: Task;

  private destroySubject$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    // tslint:disable-next-line: no-shadowed-variable
    public TaskListService: TaskListService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    combineLatest(this._activatedRoute.params, this.TaskListService.TaskList$)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(([params, taskList]: [Params, Task[]]) => {
        // tslint:disable-next-line: radix
        let id: number;

        if (params.id > taskList.length) {
          id = taskList.length - 1;
          // tslint:disable-next-line: use-isnan
        } else if (params.id <= 0 || params.id === NaN || params.id === 'NaN') {
          id = 0;
        } else {
          // tslint:disable-next-line: radix
          id = parseInt(params.id) - 1;
        }

        this.currentTask = taskList[id];
        this.TaskListService.goToTaskDetails(id);
      });
  }

  ngOnDestroy() {
    this.destroySubject$.next(true);
    this.destroySubject$.complete();
  }
}
