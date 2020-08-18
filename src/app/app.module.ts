import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeModule } from './pages/home/home.module';
import { LoginComponent } from './pages/login/login.component';

import { StarRatingComponent } from './shared/star-rating/star-rating.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { GoogleChartsModule } from 'angular-google-charts';

import { StatusService } from './services/status/status.service';
import { NavigationMenuService } from './services/navigation-menu/navigation-menu.service';
import { ApiService } from './services/api/api.service';
import { CreatePollComponent } from './pages/create-poll/create-poll.component';
import { FreePollMaterialModules } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertDialogComponent } from './shared/alert-dialog/alert-dialog.component';
import { ViewPollComponent } from './pages/view-poll/view-poll.component';
import { ResultPollComponent } from './pages/result-poll/result-poll.component';
import { ProgressSpinnerComponent } from './shared/progress-spinner/progress-spinner.component';
import { OverlayService } from './shared/overlay/overlay.module';
import { ProgressSpinnerModule } from './shared/progress-spinner/progress-spinner.module';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material';
import { SearchPollComponent } from './pages/search-poll/search-poll.component';
import { CreateSurveyComponent } from './pages/create-survey/create-survey.component';
import { MaterialFileUploadComponent } from './shared/material-file-upload/material-file-upload.component';
import { SurveyQuestionComponent } from './shared/survey-question/survey-question.component';
import { MinMaxControlComponent } from './shared/min-max-control/min-max-control.component';
import { ViewSurveyComponent } from './pages/view-survey/view-survey.component';
import { AnswerQuestionsComponent } from './pages/view-survey/answer-questions/answer-questions.component';
import { NouisliderModule } from 'ng2-nouislider';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { SearchSurveyComponent } from './pages/search-survey/search-survey.component';
import { SuccessComponent } from './pages/success/success.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';


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
    StarRatingComponent,
    AdminLayoutComponent
  ],
  entryComponents: [
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
