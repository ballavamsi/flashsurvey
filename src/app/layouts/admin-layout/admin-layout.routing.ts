import { SuccessComponent } from './../../pages/success/success.component';
import { CreatePollComponent } from './../../pages/poll/create-poll/create-poll.component';
import { SurveyComponent } from './../../pages/survey/survey.component';
import { PollComponent } from './../../pages/poll/poll.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AuthGuardService } from 'src/app/services/auth/auth-guard.service';
import { CreateSurveyComponent } from 'src/app/pages/survey/create-survey/create-survey.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuardService] },
    { path: 'user-profile',   component: UserProfileComponent, canActivate: [AuthGuardService]  },
    { path: 'poll',   component: PollComponent, canActivate: [AuthGuardService]  },
    { path: 'poll/new',   component: CreatePollComponent, canActivate: [AuthGuardService]  },
    { path: 'survey',   component: SurveyComponent , canActivate: [AuthGuardService] },
    { path: 'survey/new',   component: CreateSurveyComponent},
    { path: 'success/:type/:id',   component: SuccessComponent, canActivate: [AuthGuardService] }
];
