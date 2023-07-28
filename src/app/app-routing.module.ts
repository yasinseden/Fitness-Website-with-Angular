import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadChildren: (): any => import('./home/home.module').then((m: any) => m.HomeModule) 
  },
  {
    path:'auth',
    loadChildren: (): any => import('./auth/auth.module').then((m: any) => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
