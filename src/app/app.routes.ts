import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'habit-list',
    loadComponent: () => import('./pages/habit-list/habit-list.page').then( m => m.HabitListPage)
  },
  {
    path: 'to-do-list',
    loadComponent: () => import('./pages/to-do-list/to-do-list.page').then( m => m.ToDoListPage)
  },
  {
    path: 'goal-list',
    loadComponent: () => import('./pages/goal-list/goal-list.page').then( m => m.GoalListPage)
  },
];
