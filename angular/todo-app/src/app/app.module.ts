import { NotFoundPageComponent } from './_pages/not-found-page/not-found-page.component';
import { ContactsPageComponent } from './_pages/contacts-page/contacts-page.component';
import { TasksPageComponent } from './_pages/tasks-page/tasks-page.component';
import { TaskDetailsModule } from './_pages/task-details/task-details.module';
import { TaskBuilderComponent } from './task-builder/task-builder.component';
import { HomePageComponent } from './_pages/home-page/home-page.component';
import { TasksPanelComponent } from './tasks-panel/tasks-panel.component';
import { TasksListModule } from './tasks-list/tasks-list.module';
import { HeaderComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NavComponent } from './nav/nav.component';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

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
  imports: [BrowserModule, AppRoutingModule, FormsModule, TasksListModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
