import { Component, OnInit } from '@angular/core';
import { OverlayService } from '../overlay/overlay.module';
import { SurveyService } from '../services/survey/survey.service';
import { SurveyModel } from '../create-survey/create-survey.component';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../services/storage/storage.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import {CreateSurveyComponent} from '../create-survey/create-survey.component';

@Component({
    selector: 'app-thank-you',
    templateUrl: './thank-you.component.html',
    styleUrls: ['./thank-you.component.scss']
  })

  export class ThankYouComponent implements OnInit{
  sharinglink:string;
  constructor(private _router: Router, private _surveyService: SurveyService, private _snackBar: MatSnackBar,
    private _overlayService: OverlayService,public dialog: MatDialog,private _activateRoute: ActivatedRoute) {
    }
  ngOnInit() {
    this._surveyService.getStoredUrl().subscribe((data)=>{
     this.sharinglink = data;
   //  this.openDialog('Survey Created successfully', 'Click on the link to copy',this.sharinglink,true);
    })
  }

  }