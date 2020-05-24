import { Component, OnInit } from '@angular/core';
import { TaskListService } from '../_services/task-list.service';
import { TaskListDataService } from '../_services/task-list-data.service';

@Component({
  selector: 'app-tasks-panel',
  templateUrl: './tasks-panel.component.html',
  styleUrls: ['./tasks-panel.component.scss'],
})
export class TasksPanelComponent implements OnInit {
  constructor(
    public taskListService: TaskListService,
    public taskListDataService: TaskListDataService
  ) {}

  ngOnInit(): void {}
}
