import { ViewPollComponent } from './../../pages/poll/view-poll/view-poll.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreLoginLayoutRoutes } from './prelogin-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { ThankyouComponent } from 'src/app/pages/thankyou/thankyou.component';
import { ResultsPollComponent } from 'src/app/pages/poll/results-poll/results-poll.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PreLoginLayoutRoutes),
    FormsModule,
    ReactiveFormsModule
    // NgbModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ViewPollComponent,
    ResultsPollComponent,
    ThankyouComponent
  ]
})
export class PreLoginLayoutModule { }
