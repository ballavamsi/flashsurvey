import { Component, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/services/survey/survey.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';
import { SurveyQuestionsModel } from 'src/app/create-survey/create-survey.component';
import { OverlayService } from 'src/app/overlay/overlay.module';
import { error } from 'util';

@Component({
  selector: 'app-answer-questions',
  templateUrl: './answer-questions.component.html',
  styleUrls: ['./answer-questions.component.css']
})
export class AnswerQuestionsComponent implements OnInit {

  routeGuid: string;
  loaded = false;
  currentQuestionData: SurveyQuestionsModel;
  constructor(private _surveyService: SurveyService,
    private _activateRoute: ActivatedRoute,
    private _storageService: StorageService,
    private _overlayService: OverlayService) {

    this._overlayService.show();
    this._surveyService.getCurrentSurvey().subscribe((data) => {
      if (data === undefined) {
        this._activateRoute.params.subscribe((data) => {
          this.routeGuid = data['id'];

          this._surveyService.getSurvey(this.routeGuid).subscribe((surveyData) => {
            this._surveyService.setCurrentSurvey(surveyData);
            this.getCurrentQuestion();
          },
            error => {
              this._overlayService.hide();
            });
        });
      }
    });
  }

  ngOnInit() {
  }

  getCurrentQuestion() {
    let currentQuestionId = this.currentQuestion;
    if (currentQuestionId == null || currentQuestionId == undefined) {
      currentQuestionId = 0;
      this._storageService.setLocal(this.currentQuestionKey, currentQuestionId);
    }

    this._surveyService.getCurrentSurvey().subscribe((data) => {
      this.loaded = true;
      this.currentQuestionData = data.surveyQuestions[currentQuestionId];
      this._overlayService.hide();
      console.log(this.currentQuestionData);

    });
  }

  nextQuestion() {
    this._overlayService.show();
    this._storageService.setLocal(this.currentQuestionKey, this.currentQuestion + 1);
    this.getCurrentQuestion();
  }

  previousQuestion() {
    this._overlayService.show();
    this._storageService.setLocal(this.currentQuestionKey, this.currentQuestion - 1);
    this.getCurrentQuestion();
  }

  get currentQuestionKey() {
    return 'Survey_Current_Question_' + this.routeGuid;
  }

  get currentQuestion() {
    return parseInt(this._storageService.getLocal(this.currentQuestionKey));
  }

  get totalQuestionsKey() {
    return 'Survey_Questions_' + this.routeGuid;
  }

  get totalQuestions() {
    return parseInt(this._storageService.getLocal(this.totalQuestionsKey));
  }

}
