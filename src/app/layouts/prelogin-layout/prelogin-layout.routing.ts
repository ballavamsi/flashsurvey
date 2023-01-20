import { ViewPollComponent } from './../../pages/poll/view-poll/view-poll.component';
import { AboutUsComponent } from './../../pages/about-us/about-us.component';
import { LandingComponent } from './../../pages/landing/landing.component';
import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { ThankyouComponent } from 'src/app/pages/thankyou/thankyou.component';
import { ResultsPollComponent } from 'src/app/pages/poll/results-poll/results-poll.component';
import { PrivacyComponent } from 'src/app/pages/privacy/privacy.component';
import { TermsComponent } from 'src/app/pages/terms/terms.component';
import { LogoutComponent } from 'src/app/pages/logout/logout.component';
import { ViewSurveyComponent } from 'src/app/pages/survey/view-survey/view-survey.component';
import { AnswerComponent } from 'src/app/pages/answer/answer.component';

export const PreLoginLayoutRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'home', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },

  // { path: 'register', component: RegisterComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'terms', component: TermsComponent },

  { path: 'poll/view/:id', component: ViewPollComponent },
  { path: 'poll/results/:id', component: ResultsPollComponent },
  { path: 'thankyou/:type/:id', component: ThankyouComponent },

  { path: 'survey/view/:id', component: ViewSurveyComponent },
  { path: 'survey/view/:id/questions', component: AnswerComponent },

];
