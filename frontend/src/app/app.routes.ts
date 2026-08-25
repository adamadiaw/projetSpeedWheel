import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { Vehicules } from './components/vehicules/vehicules';
import { Sales } from './components/sales/sales';
import { Admin } from './components/admin/admin';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: '', component: Home },
  { path: 'vehicules', component: Vehicules },
  { path: 'sales', component: Sales },
  { path: 'admin', component: Admin },

];