import { Routes } from '@angular/router';

import { CreatePollComponent } from '../../pages/create-poll/create-poll.component';
import { ViewPollComponent } from '../../pages/view-poll/view-poll.component';
import { SearchPollComponent } from '../../pages/search-poll/search-poll.component';
import { CreateSurveyComponent } from '../../pages/create-survey/create-survey.component';
import { AnswerQuestionsComponent } from '../../pages/view-survey/answer-questions/answer-questions.component';
import { ViewSurveyComponent } from '../../pages/view-survey/view-survey.component';
import { SearchSurveyComponent } from '../../pages/search-survey/search-survey.component';
import { SuccessComponent } from '../../pages/success/success.component';
import { AuthGuardService } from 'src/app/services/auth/auth-guard.service';

export const AdminLayoutRoutes: Routes = [
    { path: 'poll/new', component: CreatePollComponent, canActivate: [AuthGuardService] },
    { path: 'poll/view/:id', component: ViewPollComponent, canActivate: [AuthGuardService] },
    { path: 'poll/result/:id', component: CreatePollComponent, canActivate: [AuthGuardService] },
    { path: 'poll/search', component: SearchPollComponent, canActivate: [AuthGuardService] },
    { path: 'survey/new', component: CreateSurveyComponent, canActivate: [AuthGuardService] },
    { path: 'survey/view/:id', component: ViewSurveyComponent, canActivate: [AuthGuardService] },
    { path: 'survey/view/:id/questions', component: AnswerQuestionsComponent, canActivate: [AuthGuardService] },
    { path: 'survey/search', component: SearchSurveyComponent, canActivate: [AuthGuardService] },
    { path: 'ps/success/:type/:id', component: SuccessComponent, canActivate: [AuthGuardService] },
];
