import { Component, OnInit } from '@angular/core';
import { SurveyModel, UserSurveysResponseModel, UserSurveysViewModel } from 'src/app/models/survey';
import { SurveyService } from 'src/app/services/survey/survey.service';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { OverlayService } from 'src/app/components/overlay/overlay.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  currentSurvey = new SurveyModel();
  userSurveys: UserSurveysViewModel[];
  pageNumber = 0;
  pageSize = 10;
  totalSurveys = 0;
  currentPage = 0;
  totalPages = 1;

  constructor(private _surveyService: SurveyService,
    private _snackBar: MatSnackBar,
    private _overlayService: OverlayService) {
    this.getSurveys();
  }

  getCurrentPageSurveys(pagenumber) {
    this.pageNumber = pagenumber;
    this.currentPage = pagenumber;
    this.getSurveys();
  }

  ngOnInit() { }

  askDeleteConfirmation(surveyId, surveyGuid, surveyName) {
    this.currentSurvey.welcometitle = surveyName;
    this.currentSurvey.surveyGuid = surveyGuid;
    this.currentSurvey.surveyId = surveyId;
  }

  counter(i: number) {
    return new Array(i);
  }

  getSurveys() {
    this._overlayService.show();
    this._surveyService.getUserSurveys(this.pageNumber, this.pageSize).subscribe((data: UserSurveysResponseModel) => {
      this.userSurveys = data.userSurveys;
      this.totalSurveys = data.totalSurveys;
      this.totalPages = Math.ceil(this.totalSurveys / this.pageSize);
      this._overlayService.hide();
    },
      error => {
        this._overlayService.hide();
        this.openDismiss(error.error, "Dismiss");
      });
  }



  deleteSurvey(surveyId) {
    this._overlayService.show();
    this._surveyService.deleteSurvey(surveyId).subscribe((data) => {
      this.openDismiss("Deleted successfully", "Dismiss");
      this.getCurrentPageSurveys(this.currentPage);
    },
      error => {
        this._overlayService.hide();
        switch (error.error) {
          case 'InvalidOperation':
            this.openDismiss("You are no longer authorized to delete this poll", "Dismiss");
            break;
          default:
            this.openDismiss("Something went wrong we can investiage further", "Dismiss");
            break;
        }
      });
  }

  // open snackbar
  openDismiss(message: string, buttontext: string) {
    this._snackBar.open(message, buttontext, {
      duration: 3000,
    });
  }


}
