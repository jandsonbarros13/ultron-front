import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'chat',
    loadComponent: () => import('./pages/chat/chat.page').then( m => m.ChatPage)
  },
   {
    path: 'workspace',
    loadComponent: () => import('./pages/workspace/workspace.page').then( m => m.WorkspacePage)
  },
  {
    path: 'editor',
    loadComponent: () => import('./pages/editor/editor.page').then( m => m.EditorPage)
  },
  {
    path: 'doker',
    loadComponent: () => import('./pages/doker/doker.page').then( m => m.DokerPage)
  },
  {
    path: 'monitor',
    loadComponent: () => import('./pages/monitor/monitor.page').then( m => m.MonitorPage)
  },
  {
    path: '**',
    redirectTo: 'login'
  }

];