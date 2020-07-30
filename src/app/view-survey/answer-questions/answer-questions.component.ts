import { Component, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/services/survey/survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';
import { SurveyQuestionsModel, SurveyModel } from 'src/app/create-survey/create-survey.component';
import { OverlayService } from 'src/app/overlay/overlay.module';
import { error } from 'util';
import { ApiService } from 'src/app/services/api/api.service';
import { QuestionAnswersBody, QuestionType, QuestionAnswerRequest } from 'src/app/models/question-type';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-answer-questions',
  templateUrl: './answer-questions.component.html',
  styleUrls: ['./answer-questions.component.scss']
})
export class AnswerQuestionsComponent implements OnInit {

  routeGuid: string;
  loaded = false;
  currentQuestionData: SurveyQuestionsModel;
  currentQuestionNumber = 0;
  lstQuestionTypes: QuestionType[];
  lstAnswers = [];
  questionType = '';
  progressPercentage = 0;
  finalPage = false;
  private surveyData: SurveyModel;

  // answers data
  essayAnswer = '';
  singleOption = 0;

  constructor(private _surveyService: SurveyService,
    private _activateRoute: ActivatedRoute,
    private _storageService: StorageService,
    private _overlayService: OverlayService,
    private _route: Router,
    private _apiService: ApiService) {

    this._overlayService.show();
    var questionTypes = this._storageService.getSession('questiontypes');
    if (questionTypes == null) {
      this._apiService.getQuestionTypes().subscribe((data) => {
        this._storageService.setSession('questiontypes', JSON.stringify(data));
        this.lstQuestionTypes = data;
      });
    }
    else{
      this.lstQuestionTypes = JSON.parse(questionTypes) as QuestionType[];
    }

    let dataLoaded = false;
    this._surveyService.getCurrentSurvey().subscribe((data) => {
      this.surveyData = data;
      if (data === undefined) {
        this._activateRoute.params.subscribe((data) => {
          this.routeGuid = data.id;
          const sess = this._storageService.getSession(this.sessionKey);
          if (sess != null) {
            this._surveyService.getSurvey(this.routeGuid).subscribe((surveyData) => {
              this.surveyData = surveyData;
              this._surveyService.setCurrentSurvey(surveyData);
              this.getCurrentQuestion();
              dataLoaded = true;
            },
              error => {
                this._overlayService.hide();
              });
          } else {
            this._route.navigate([`survey/view/${this.routeGuid}`]);
          }
        });
      } else {
        this.getCurrentQuestion();
      }
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.setAnswerToQuestion();

    let data = '';
    let dataToSend =[];
    let dataToRequest = new QuestionAnswerRequest();
    this.surveyData.surveyQuestions.forEach((element, index) => {

      let q = new QuestionAnswersBody();
      q.key = element.surveyQuestionId.toString();

      if (typeof (this.lstAnswers[index]) == "number") {
        q.number = this.lstAnswers[index];
      }
      if (typeof (this.lstAnswers[index]) == "string") {
        q.text = this.lstAnswers[index];
      }
      if (typeof (this.lstAnswers[index]) == "object") {
        q.selected = this.lstAnswers[index];
      }
      dataToSend.push(q);
      // data2[element.surveyQuestionId] = this.lstAnswers[index];
    });

    dataToRequest.data = dataToSend;

    this._surveyService.submitSurvey(this.routeGuid, this.sessionValue(), dataToRequest).subscribe(() => {
      this.finalPage = true;
    });
  }

  updateProgressBar() {
    this.progressPercentage = ((this.currentQuestionNumber + 1) / this.totalQuestions) * 100;
  }

  getCurrentQuestion() {
    this.currentQuestionNumberValue();
    const currentQuestionId = this.currentQuestionNumber;

    this._surveyService.getCurrentSurvey().subscribe((data) => {
      this.loaded = true;
      this.currentQuestionData = data.surveyQuestions[currentQuestionId];

      this.currentQuestionData.objectOptions.forEach(element => {
        element.isChecked = false;
      });

      this._overlayService.hide();
      this.questionType = this.lstQuestionTypes.find(x => x.id == this.currentQuestionData.typeId).code;

      this.updateUIWithAnswers();
      this.updateProgressBar();
    });
  }

  nextQuestion() {
    this.currentQuestionNumberValue();
    this._overlayService.show();
    this.setAnswerToQuestion();
    this._storageService.setSession(this.currentQuestionKey, this.currentQuestionNumber + 1);
    this.getCurrentQuestion();
  }

  previousQuestion() {
    this.currentQuestionNumberValue();
    if (this.currentQuestionNumber <= 0) {
      return;
    }
    this._overlayService.show();
    this.setAnswerToQuestion();
    this._storageService.setSession(this.currentQuestionKey, this.currentQuestionNumber - 1);
    this.getCurrentQuestion();
  }

  private clearSurveySession() {
    this._storageService.removeSession(this.sessionKey);
    this._storageService.removeSession(this.totalQuestionsKey);
    this._storageService.removeSession(this.currentQuestionKey);
  }

  private get sessionKey() {
    return `Survey_Session_${this.routeGuid}`;
  }

  private sessionValue() {
    return this._storageService.getSession(this.sessionKey);
  }

  updateUIWithAnswers() {
    this.currentQuestionNumberValue();
    this._surveyService.getCurrentSurveyAnswers().subscribe((data) => {

      if (data.length > 0) {
        this.lstAnswers = data;
        switch (this.questionType) {
          case 'essay':
            this.essayAnswer = this.lstAnswers[this.currentQuestionNumber];
            break;
          case 'radiobuttons':
            this.singleOption = parseInt(this.lstAnswers[this.currentQuestionNumber]);
            break;
          case 'multiple':
            this.currentQuestionData.objectOptions.forEach((element) => {
              if (this.lstAnswers[this.currentQuestionNumber].indexOf(element.surveyQuestionOptionId.toString()) != -1) {
                element.isChecked = true;
              }
            });
            break;
          default:
            break;
        }
      }
    });
  }

  setAnswerToQuestion() {
    this.currentQuestionNumberValue();

    this._surveyService.getCurrentSurveyAnswers().subscribe((data) => {

      let answerData: any;
      switch (this.questionType) {
        case 'essay':
          answerData = this.essayAnswer;
          break;
        case 'radiobuttons':
          answerData = this.singleOption;
          break;
        case 'multiple':
          answerData = this.currentQuestionData.objectOptions.filter(x => x.isChecked).map(x => x.surveyQuestionOptionId.toString());
          break;
        default:
          break;
      }

      if (this.lstAnswers.length < this.currentQuestionNumber) {
        let itemsNumber = this.lstAnswers.length;
        while (itemsNumber < this.currentQuestionNumber - 1) {
          this.lstAnswers.push();
          itemsNumber++;
        }
        this.lstAnswers.push(answerData);
      } else {
        this.lstAnswers[this.currentQuestionNumber] = answerData;
      }

      if (data.length != this.lstAnswers.length || this.lstAnswers[this.currentQuestionNumber] != data[this.currentQuestionNumber]) {
        this._surveyService.setCurrentSurveyAnswers(this.lstAnswers);
      }
    });

  }

  get currentQuestionKey() {
    return 'Survey_Current_Question_' + this.routeGuid;
  }

  currentQuestionNumberValue() {
    let val = this._storageService.getSession(this.currentQuestionKey);
    let nu = parseInt(val);
    if (isNaN(nu) || nu == undefined || nu == null || nu < 0) {
      this._storageService.setSession(this.currentQuestionKey, 0);
      this.currentQuestionNumber = 0;
    } else {
      this.currentQuestionNumber = nu;
    }
  }


  get totalQuestionsKey() {
    return 'Survey_Questions_' + this.routeGuid;
  }

  get totalQuestions() {
    var questionCount = parseInt(this._storageService.getSession(this.totalQuestionsKey));
    return questionCount == 0 ? 10 : questionCount;
  }

}
