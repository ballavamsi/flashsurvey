import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { OverlayService } from 'src/app/components/overlay/overlay.service';
import { SurveyCommentModel, SurveyFeedbacksResponseModel, SurveyModel, UserSurveyFeedbacks } from 'src/app/models/survey';
import { SurveyService } from 'src/app/services/survey/survey.service';

@Component({
  selector: 'app-view-feedback-survey',
  templateUrl: './view-feedback-survey.component.html',
  styleUrls: ['./view-feedback-survey.component.scss']
})

export class ViewFeedbackSurveyComponent implements OnInit {
  surveyUserGuid = '';
  surveyData: SurveyFeedbacksResponseModel;
  markComplete = false;
  loaded=false;
  currentUserFeedbackForm: UserSurveyFeedbacks; 

  constructor(private _overlayService: OverlayService, private _surveyService: SurveyService,
    private _snackBar: MatSnackBar, private _activateRoute: ActivatedRoute) {

      this._activateRoute.params.subscribe((data) => {
        this.surveyUserGuid = data['id'];
        this.getIndividualUserFeedback(this.surveyUserGuid);
      });
  }
  ngOnInit() {

  }

  putCommentSurvey(){
    var data = new SurveyCommentModel();
    data.comment =  this.currentUserFeedbackForm.reviewComment;
    data.reviewComplete = this.markComplete ? 1 : 0;
    data.feedbackId = this.currentUserFeedbackForm.surveyFeedbackId;
    this._overlayService.show();
    this._surveyService.commentSurvey(this.surveyData.surveyId, data).subscribe((data: UserSurveyFeedbacks) => {
      this._overlayService.hide();
      this.currentUserFeedbackForm = data;
      this.openDismiss("Feedback Saved", "Dismiss");
    },
    error => {
      this._overlayService.hide();
      this.openDismiss(error.error, "Dismiss");
    });
  }

  getIndividualUserFeedback(userId: string){
    this._overlayService.show();
    this._surveyService.getSurveyUserFeedback(userId).subscribe((data: SurveyFeedbacksResponseModel) => {
      this._overlayService.hide();
      this.surveyData = data;
      if(this.surveyData.surveyFeedbacks.length>0){
        this.currentUserFeedbackForm = this.surveyData.surveyFeedbacks[0];
      }
      this.loaded=true;

    },
      error => {
        this._overlayService.hide();
        this.loaded=true;
        this.openDismiss(error.error, "Dismiss");
      });
  }

  // open snackbar
  openDismiss(message: string, buttontext: string) {
    this._snackBar.open(message, buttontext, {
      duration: 3000,
    });
  }
}
