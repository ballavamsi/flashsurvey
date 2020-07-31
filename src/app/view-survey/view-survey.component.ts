import { Component, OnInit } from '@angular/core';
import { OverlayService } from '../overlay/overlay.module';
import { SurveyService } from '../services/survey/survey.service';
import { SurveyModel } from '../create-survey/create-survey.component';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, PatternValidator } from '@angular/forms';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-view-survey',
  templateUrl: './view-survey.component.html',
  styleUrls: ['./view-survey.component.scss']
})
export class ViewSurveyComponent implements OnInit {

  surveyData: SurveyModel;
  routeGuid: string;
  loaded = false;
  errorMessage = "";
  fg: FormGroup;
  constructor(private _activateRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _overlayService: OverlayService,
    private _surveyService: SurveyService,
    private _storageService: StorageService) {

    this.fg = new FormGroup({
      emailId: new FormControl('', Validators.pattern(/[\w-]+@([\w-]+\.)+[\w-]+/))
    });

    this._activateRoute.params.subscribe((data) => {
      this.routeGuid = data['id'];
      this._overlayService.show();
      this._surveyService.getSurvey(this.routeGuid).subscribe((data: SurveyModel) => {
        this.surveyData = data;
        this._surveyService.setCurrentSurvey(this.surveyData);
        this.loaded = true;
        this._overlayService.hide();
        this._storageService.setSession('Survey_Questions_' + this.routeGuid, data.surveyQuestions.length);
      },
        error => {
          this._overlayService.hide();
          //this.openDismiss(error.error,'Dismiss');
          this.errorMessage = error.error;
        });
    });
  }

  ngOnInit() { }

  onSubmit() {
    if (!this.fg.valid) {
      this.openDismiss("Invalid form", "Dismiss");
      return;
    }
    this._overlayService.show();

    this._surveyService.beginSurvey(this.routeGuid, this.emailId).subscribe((data) => {
      this._storageService.setSession('Survey_Session_' + this.routeGuid, data['surveyUserGuid']);
      this.loaded = true;
      this._overlayService.hide();
      this._router.navigate([`survey/view/${this.routeGuid}/questions`]);
    },
      error => {
        this._overlayService.hide();
        //this.openDismiss(error.error,'Dismiss');
        this.errorMessage = error.error;
      });

  }

  get emailId() {
    return this.fg.get('emailId').value;
  }

  // open snackbar
  openDismiss(message: string, buttontext: string) {
    this._snackBar.open(message, buttontext, {
      duration: 3000,
    });
  }

}
