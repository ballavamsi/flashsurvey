import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatusListComponent } from './status-list/status-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { ViewPollComponent } from './view-poll/view-poll.component';
import { ResultPollComponent } from './result-poll/result-poll.component';
import { SearchPollComponent } from './search-poll/search-poll.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { ViewSurveyComponent } from './view-survey/view-survey.component';
import { AnswerQuestionsComponent } from './view-survey/answer-questions/answer-questions.component';
import { AboutUsComponent } from './about-us/about-us.component';
import {SearchSurveyComponent} from './search-survey/search-survey.component';
import {} from './search-survey/search-survey.component';



const routes: Routes = [
  { path: 'about-us', component: AboutUsComponent },
  { path: 'status', component: StatusListComponent },
  { path: 'poll/new', component: CreatePollComponent },
  { path: 'poll/view/:id', component: ViewPollComponent  },
  { path: 'poll/result/:id', component: ResultPollComponent  },
  { path: 'poll/search', component: SearchPollComponent  },
  { path: 'survey/new', component: CreateSurveyComponent },
  { path: 'survey/view/:id', component: ViewSurveyComponent },
  { path: 'survey/view/:id/questions', component: AnswerQuestionsComponent },
  { path: 'survey/search', component :SearchSurveyComponent},
  { path: '', component: DashboardComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
