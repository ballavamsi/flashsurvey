import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { StatusListComponent } from './status-list/status-list.component';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { ViewPollComponent } from './view-poll/view-poll.component';
import { SearchPollComponent } from './search-poll/search-poll.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { AnswerQuestionsComponent } from './view-survey/answer-questions/answer-questions.component';
import { ViewSurveyComponent } from './view-survey/view-survey.component';
import { SearchSurveyComponent } from './search-survey/search-survey.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  { path: 'home', component: LandingComponent },
  { path: 'register', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'status', component: StatusListComponent },
  { path: 'poll/new', component: CreatePollComponent },
  { path: 'poll/view/:id', component: ViewPollComponent },
  { path: 'poll/result/:id', component: CreatePollComponent },
  { path: 'poll/search', component: SearchPollComponent },
  { path: 'survey/new', component: CreateSurveyComponent },
  { path: 'survey/view/:id', component: ViewSurveyComponent },
  { path: 'survey/view/:id/questions', component: AnswerQuestionsComponent },
  { path: 'survey/search', component: SearchSurveyComponent },
  { path: 'ps/success/:type/:id', component: SuccessComponent },
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
