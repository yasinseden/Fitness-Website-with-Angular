import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { TrainerInterfaceComponent } from './trainer-interface/trainer-interface.component';
import { AthleteInterfaceComponent } from './athlete-interface/athlete-interface.component';


const routes: Routes = [
  {
    path: '', component: UserComponent,
    children: [
      {path: 'trainer', component: TrainerInterfaceComponent},
      {path: 'athlete', component: AthleteInterfaceComponent}
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }
