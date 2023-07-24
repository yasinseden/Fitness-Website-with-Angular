import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { HomeBodyComponent } from './home-body/home-body.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {path: '', component: HomeHeaderComponent},
      {path: '', component: HomeBodyComponent}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }
