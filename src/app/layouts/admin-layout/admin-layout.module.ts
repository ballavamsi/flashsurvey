import { SuccessComponent } from './../../pages/success/success.component';
import { CreatePollComponent } from './../../pages/poll/create-poll/create-poll.component';
import { SurveyComponent } from './../../pages/survey/survey.component';
import { PollComponent } from './../../pages/poll/poll.component';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { FileUploadComponent } from 'src/app/pages/file-upload/file-upload.component';
import { CreateSurveyComponent } from 'src/app/pages/survey/create-survey/create-survey.component';
import { QuestionComponent } from 'src/app/pages/question/question.component';
import { ResultSurveyComponent } from 'src/app/pages/survey/result-survey/result-survey.component';
import { StarRatingComponent } from 'src/app/components/star-rating/star-rating.component';
import { ViewFeedbackSurveyComponent } from 'src/app/pages/survey/view-feedback-survey/view-feedback-survey.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    SharedModule,
    ClipboardModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    PollComponent,
    CreatePollComponent,
    SurveyComponent,
    SuccessComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    FileUploadComponent,
    QuestionComponent,
    CreateSurveyComponent,
    ViewFeedbackSurveyComponent
  ]
})

export class AdminLayoutModule {}
