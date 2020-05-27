import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { TasksListModule } from './tasks-list/tasks-list.module';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HeaderComponent } from './header/header.component';
import { TasksPanelComponent } from './tasks-panel/tasks-panel.component';
import { TaskBuilderComponent } from './task-builder/task-builder.component';
import { HomePageComponent } from './_pages/home-page/home-page.component';
import { TasksPageComponent } from './_pages/tasks-page/tasks-page.component';

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
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, TasksListModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
