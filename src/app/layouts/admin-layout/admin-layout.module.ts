import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminLayoutRoutes } from './admin-layout.routing';

import { ViewPollComponent } from '../../pages/view-poll/view-poll.component';
import { ResultPollComponent } from '../../pages/result-poll/result-poll.component';
import { CreatePollComponent } from '../../pages/create-poll/create-poll.component';
import { SearchPollComponent } from '../../pages/search-poll/search-poll.component';
import { CreateSurveyComponent } from '../../pages/create-survey/create-survey.component';
import { MaterialFileUploadComponent } from '../../shared/material-file-upload/material-file-upload.component';
import { SurveyQuestionComponent } from '../../shared/survey-question/survey-question.component';
import { MinMaxControlComponent } from '../../shared/min-max-control/min-max-control.component';
import { ViewSurveyComponent } from '../../pages/view-survey/view-survey.component';
import { AnswerQuestionsComponent } from '../../pages/view-survey/answer-questions/answer-questions.component';
import { SearchSurveyComponent } from '../../pages/search-survey/search-survey.component';
import { SuccessComponent } from '../../pages/success/success.component';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { StarRatingComponent } from 'src/app/shared/star-rating/star-rating.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  declarations: [
    
    CreatePollComponent,
    AlertDialogComponent,
    ViewPollComponent,
    ResultPollComponent,
    SearchPollComponent,
    MaterialFileUploadComponent,
    CreateSurveyComponent,
    MinMaxControlComponent,
    ViewSurveyComponent,
    AnswerQuestionsComponent,
    SurveyQuestionComponent,
    SearchSurveyComponent,
    SuccessComponent,
    StarRatingComponent,
  ]
})

export class AdminLayoutModule {}
