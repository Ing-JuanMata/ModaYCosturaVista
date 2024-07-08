import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ClientsComponent } from './main/clients/clients.component';
import { DataComponent } from './data/data.component';
import { MaterialsComponent } from './data/materials/materials.component';
import { PropertiesComponent } from './data/properties/properties.component';
import { StatesComponent } from './data/states/states.component';
import { TypesComponent } from './data/types/types.component';
import { UnitsComponent } from './data/units/units.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'clients', pathMatch: 'full' },
      { path: 'clients', component: ClientsComponent },
    ],
  },
  {
    path: 'data',
    component: DataComponent,
    children: [
      { path: '', redirectTo: 'materials', pathMatch: 'full' },
      { path: 'materials', component: MaterialsComponent },
      { path: 'properties', component: PropertiesComponent },
      { path: 'states', component: StatesComponent },
      { path: 'types', component: TypesComponent },
      { path: 'units', component: UnitsComponent },
    ],
  },
];
