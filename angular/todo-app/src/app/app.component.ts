import { Component, OnInit } from '@angular/core';
import { TaskListService } from './_services/task-list.service';
import { TaskListDataService } from './_services/task-list-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    public taskListService: TaskListService,
  ) {}

  ngOnInit() {}
}
