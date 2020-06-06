import { Component } from '@angular/core';
import { TaskListService } from './_services/task-list.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	constructor(public taskListService: TaskListService) {}
}
