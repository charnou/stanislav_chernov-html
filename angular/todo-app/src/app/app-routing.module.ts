import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './_pages/home-page/home-page.component';
import { TasksPageComponent } from './_pages/tasks-page/tasks-page.component';
import { NotFoundPageComponent } from './_pages/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'tasks', component: TasksPageComponent },
  { path: 'tasks/:id', component: TasksPageComponent },

  { path: '404', component: NotFoundPageComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
