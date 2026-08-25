import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { Vehicules } from './components/vehicules/vehicules';
import { Admin } from './components/admin/admin';
import { Rental } from './components/rental/rental';
import { Achat } from './components/achat/achat';
import { Vente } from './components/vente/vente';
import { Imported } from './components/imported/imported';
import { Exported } from './components/exported/exported';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: '', component: Home },
  { path: 'vehicules', component: Vehicules },
  { path: 'admin', component: Admin },
  { path: 'rental', component: Rental },
  { path: 'achat', component: Achat },
  { path: 'vente', component: Vente },
  { path: 'imported', component: Imported },
  { path: 'exported', component: Exported },

];