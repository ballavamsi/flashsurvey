import { Component, OnInit } from '@angular/core';
import { OverlayService } from '../overlay/overlay.module';
import { SurveyService } from '../services/survey/survey.service';
import { SurveyModel } from '../create-survey/create-survey.component';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-view-survey',
  templateUrl: './view-survey.component.html',
  styleUrls: ['./view-survey.component.css']
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
              private _surveyService: SurveyService) {

                this.fg = new FormGroup({
                  emailId: new FormControl('')
                });

                this._activateRoute.params.subscribe((data) => {
                  this.routeGuid = data['id'];
                  this._overlayService.show();
                  this._surveyService.getSurvey(this.routeGuid).subscribe((data: SurveyModel) => {
                    this.surveyData = data;
                    this.loaded = true;
                    this._overlayService.hide();
                  },
                  error => {
                    this._overlayService.hide();
                    //this.openDismiss(error.error,'Dismiss');
                    this.errorMessage = error.error;
                  });
                });
               }

  ngOnInit() { }

  onSubmit(){

  }

  // open snackbar
  openDismiss(message: string, buttontext: string) {
    this._snackBar.open(message, buttontext, {
      duration: 3000,
    });
  }

}
