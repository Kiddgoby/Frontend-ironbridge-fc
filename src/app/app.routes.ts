import { Routes } from '@angular/router';
import { Register } from './register/register';
import { Login } from './login/login';
import { Home } from './home/home';
import { History } from './history/history';
import { Tickets } from './tickets/tickets';

export const routes: Routes = [
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'home', component: Home },
  { path: 'history', component: History },
  { path: 'tickets', component: Tickets },
  { path: '', redirectTo: '/register', pathMatch: 'full' }
];
