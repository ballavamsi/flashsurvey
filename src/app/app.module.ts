import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';

import { StarRatingComponent } from './shared/star-rating/star-rating.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { GoogleChartsModule } from 'angular-google-charts';

import { StatusService } from './services/status/status.service';
import { NavigationMenuService } from './services/navigation-menu/navigation-menu.service';
import { ApiService } from './services/api/api.service';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { FreePollMaterialModules } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { ViewPollComponent } from './view-poll/view-poll.component';
import { ResultPollComponent } from './result-poll/result-poll.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { OverlayService } from './overlay/overlay.module';
import { ProgressSpinnerModule } from './progress-spinner/progress-spinner.module';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material';
import { SearchPollComponent } from './search-poll/search-poll.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { MaterialFileUploadComponent } from './shared/material-file-upload/material-file-upload.component';
import { SurveyQuestionComponent } from './shared/survey-question/survey-question.component';
import { MinMaxControlComponent } from './shared/min-max-control/min-max-control.component';
import { ViewSurveyComponent } from './view-survey/view-survey.component';
import { AnswerQuestionsComponent } from './view-survey/answer-questions/answer-questions.component';
import { NouisliderModule } from 'ng2-nouislider';
import { AboutUsComponent } from './about-us/about-us.component';
import {SearchSurveyComponent} from './search-survey/search-survey.component';
import { SuccessComponent } from './success/success.component';


const provide = [
  StatusService,
  NavigationMenuService,
  ApiService,
  OverlayService,
  { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }];

@NgModule({
  declarations: [
    ProgressSpinnerComponent,
    AppComponent,
    SignupComponent,
    LandingComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
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
      AboutUsComponent,
      SuccessComponent,
      StarRatingComponent
  ],
  entryComponents:[
    ProgressSpinnerComponent,
      AppComponent,
      AlertDialogComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    CommonModule,
      NouisliderModule,
      MatProgressSpinnerModule,
      ProgressSpinnerModule,
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      AppRoutingModule,
      HttpClientModule,
      BrowserAnimationsModule,
      GoogleChartsModule,
      FreePollMaterialModules
  ],
  providers: [provide],
  bootstrap: [AppComponent]
})
export class AppModule { }
