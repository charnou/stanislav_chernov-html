import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { TasksListModule } from './tasks-list/tasks-list.module';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HeaderComponent } from './header/header.component';
import { TasksPanelComponent } from './tasks-panel/tasks-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    AppComponent,
    TasksPanelComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, TasksListModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}