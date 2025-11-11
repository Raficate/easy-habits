import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'to-do-list',
        loadComponent: () =>
          import('../pages/to-do-list/to-do-list.page').then((m) => m.ToDoListPage),
      },
      {
        path: 'habit-list',
        loadComponent: () =>
          import('../pages/habit-list/habit-list.page').then((m) => m.HabitListPage),
      },
      {
        path: '',
        redirectTo: '/tabs/to-do-list',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/to-do-list',
    pathMatch: 'full',
  },
];
