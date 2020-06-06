import { NotFoundPageComponent } from './_pages/not-found-page/not-found-page.component';
import { ContactsPageComponent } from './_pages/contacts-page/contacts-page.component';
import { CanProceedToContactsGuard } from './_guards/can-proceed-to-contacts.guard';
import { CanProceedFromHomeGuard } from './_guards/can-proceed-from-home.guard';
import { TasksPageComponent } from './_pages/tasks-page/tasks-page.component';
import { HomePageComponent } from './_pages/home-page/home-page.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
	{
		path: 'home',
		component: HomePageComponent,
		canDeactivate: [CanProceedFromHomeGuard],
	},
	{ path: '', redirectTo: '/home', pathMatch: 'full' },

	{
		path: 'tasks',
		component: TasksPageComponent,
	},
	{
		path: 'tasks/:id',
		loadChildren: () =>
			import('./_pages/task-details/task-details.module').then(
				(m: any) => m.TaskDetailsModule
			),
	},

	{
		path: 'contacts',
		component: ContactsPageComponent,
		canActivate: [CanProceedToContactsGuard],
	},

	{ path: '404', component: NotFoundPageComponent },
	{ path: '**', redirectTo: '/404', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
