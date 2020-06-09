import { NotFoundPageComponent } from './_pages/not-found-page/not-found-page.component';
import { ContactsPageComponent } from './_pages/contacts-page/contacts-page.component';
import { TasksPageComponent } from './_pages/tasks-page/tasks-page.component';
import { TaskBuilderComponent } from './task-builder/task-builder.component';
import { HomePageComponent } from './_pages/home-page/home-page.component';
import { TasksPanelComponent } from './tasks-panel/tasks-panel.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { AppComponent } from './app.component';

import { TasksListModule } from './tasks-list/tasks-list.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { reducers } from './store/index';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		NavComponent,
		AppComponent,
		TasksPanelComponent,
		TaskBuilderComponent,
		HomePageComponent,
		TasksPageComponent,
		NotFoundPageComponent,
		ContactsPageComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		TasksListModule,
		StoreModule.forRoot(reducers),
		EffectsModule.forRoot([]),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
		StoreRouterConnectingModule.forRoot(),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
