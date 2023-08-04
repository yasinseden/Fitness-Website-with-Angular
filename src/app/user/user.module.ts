import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user/user.component';
import { TrainerInterfaceComponent } from './trainer-interface/trainer-interface.component';
import { AthleteInterfaceComponent } from './athlete-interface/athlete-interface.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    UserComponent,
    TrainerInterfaceComponent,
    AthleteInterfaceComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    UserRoutingModule,
  ]
})
export class UserModule { }
