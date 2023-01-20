import { ViewPollComponent } from "./../../pages/poll/view-poll/view-poll.component";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PreLoginLayoutRoutes } from "./prelogin-layout.routing";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { LoginComponent } from "../../pages/login/login.component";
import { RegisterComponent } from "../../pages/register/register.component";
import { ThankyouComponent } from "src/app/pages/thankyou/thankyou.component";
import { ResultsPollComponent } from "src/app/pages/poll/results-poll/results-poll.component";
import {
  SocialLoginModule,
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  AmazonLoginProvider,
} from "@abacritt/angularx-social-login";
import { PrivacyComponent } from "src/app/pages/privacy/privacy.component";
import { TermsComponent } from "src/app/pages/terms/terms.component";
import { ViewSurveyComponent } from "src/app/pages/survey/view-survey/view-survey.component";
import { AnswerComponent } from "src/app/pages/answer/answer.component";
import { NouisliderModule } from "ng2-nouislider";
import { StarRatingComponent } from "src/app/components/star-rating/star-rating.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PreLoginLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ViewPollComponent,
    ResultsPollComponent,
    ViewSurveyComponent,
    ThankyouComponent,
    PrivacyComponent,
    TermsComponent,
  ],
  providers: [
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              "989782456246-ohg0jc6vnit4pe2rkp71qq0rnm7ab76g.apps.googleusercontent.com"
            ),
          },
        ],
        onError: (err) => {
          console.log(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
})
export class PreLoginLayoutModule {}
