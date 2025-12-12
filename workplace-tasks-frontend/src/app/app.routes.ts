import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { TaskList } from './tasks/task-list/task-list';
import { TaskForm } from './tasks/task-form/task-form';

export const routes: Routes = [
  { path: 'login', component: Login },

  // Tasks
  { path: 'tasks', component: TaskList, runGuardsAndResolvers: 'always' },
  { path: 'tasks/new', component: TaskForm },
  { path: 'tasks/edit', component: TaskForm },

  // Fallback
  { path: '**', redirectTo: 'login' }
];
