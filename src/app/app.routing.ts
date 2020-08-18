import { AuthGuardService } from './services/auth/auth-guard.service';
import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { StatusListComponent } from './pages/status-list/status-list.component';
import { CreatePollComponent } from './pages/create-poll/create-poll.component';
import { ViewPollComponent } from './pages/view-poll/view-poll.component';
import { SearchPollComponent } from './pages/search-poll/search-poll.component';
import { CreateSurveyComponent } from './pages/create-survey/create-survey.component';
import { AnswerQuestionsComponent } from './pages/view-survey/answer-questions/answer-questions.component';
import { ViewSurveyComponent } from './pages/view-survey/view-survey.component';
import { SearchSurveyComponent } from './pages/search-survey/search-survey.component';
import { SuccessComponent } from './pages/success/success.component';

const routes: Routes = [
  { path: 'home', component: LandingComponent },
  { path: 'register', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'status', component: StatusListComponent, canActivate: [AuthGuardService] },
  { path: 'poll/new', component: CreatePollComponent, canActivate: [AuthGuardService]},
  { path: 'poll/view/:id', component: ViewPollComponent, canActivate: [AuthGuardService] },
  { path: 'poll/result/:id', component: CreatePollComponent, canActivate: [AuthGuardService] },
  { path: 'poll/search', component: SearchPollComponent, canActivate: [AuthGuardService] },
  { path: 'survey/new', component: CreateSurveyComponent, canActivate: [AuthGuardService] },
  { path: 'survey/view/:id', component: ViewSurveyComponent, canActivate: [AuthGuardService] },
  { path: 'survey/view/:id/questions', component: AnswerQuestionsComponent, canActivate: [AuthGuardService] },
  { path: 'survey/search', component: SearchSurveyComponent, canActivate: [AuthGuardService] },
  { path: 'ps/success/:type/:id', component: SuccessComponent, canActivate: [AuthGuardService] },
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
