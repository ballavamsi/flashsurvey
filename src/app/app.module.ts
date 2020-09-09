import { AppOverlayModule } from './components/overlay/overlay.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PreLoginLayoutComponent } from './layouts/prelogin-layout/prelogin-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { FlashSurveyMaterialModules } from './material.module';
import { ProgressSpinnerComponent, ProgressSpinnerModule } from './components/progress-spinner/progress-spinner.module';
import { ApiService } from './services/api/api.service';
import { OverlayService } from './components/overlay/overlay.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { TokenInterceptorService } from './services/tokenInterceptor.service';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { AnswerComponent } from './pages/answer/answer.component';
import { ResultSurveyComponent } from './pages/survey/result-survey/result-survey.component';
import { NouisliderModule } from 'ng2-nouislider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    ProgressSpinnerModule,
    FlashSurveyMaterialModules,
    NouisliderModule
  ],
  declarations: [
    ProgressSpinnerComponent,
    StarRatingComponent,
    AppComponent,
    AnswerComponent,
    ResultSurveyComponent,
    PreLoginLayoutComponent,
    AdminLayoutComponent
  ],
  entryComponents: [
    ProgressSpinnerComponent,
    AppComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }, AuthGuardService, ApiService, OverlayService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
