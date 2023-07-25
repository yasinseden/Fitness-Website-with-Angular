import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeBodyComponent } from './home-body/home-body.component';
import { MaterialModule } from '../shared/material/material.module';


@NgModule({
  declarations: [
    HomeHeaderComponent,
    HomeComponent,
    HomeBodyComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
  ]
})
export class HomeModule { }
