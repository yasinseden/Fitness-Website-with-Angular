import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user/user.component';
import { TrainerInterfaceComponent } from './trainer-interface/trainer-interface.component';
import { AthleteInterfaceComponent } from './athlete-interface/athlete-interface.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UsernavbarComponent } from './usernavbar/usernavbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    UserComponent,
    TrainerInterfaceComponent,
    AthleteInterfaceComponent,
    SidebarComponent,
    UsernavbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class UserModule { }
