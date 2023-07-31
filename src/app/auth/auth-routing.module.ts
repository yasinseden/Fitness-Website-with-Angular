import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { SelectionComponent } from './selection/selection.component';


const routes: Routes = [
  {
    path: '', component: AuthComponent,
    children: [
      {path: '', component: SelectionComponent},
      {path: 'login', component: LoginComponent}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
