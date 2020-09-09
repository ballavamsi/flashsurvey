import { Component, OnInit } from '@angular/core';
import { SurveyQuestionsModel, SurveyModel } from 'src/app/models/survey';
import { QuestionType, QuestionAnswerRequest, QuestionAnswersBody } from 'src/app/models/question-type';
import { SurveyService } from 'src/app/services/survey/survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';
import { OverlayService } from 'src/app/components/overlay/overlay.service';
import { ApiService } from 'src/app/services/api/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {

  routeGuid: string;
  loaded = false;
  currentQuestionData: SurveyQuestionsModel;
  x_options = {};
  currentQuestionNumber = 0;
  lstQuestionTypes: QuestionType[];
  lstAnswers = [];
  questionType = '';
  progressPercentage = 0;
  finalPage = false;
  surveyData: SurveyModel;

  // answers data
  essayAnswer = '';
  singleOption = 0;
  someRange = [1, 1000000000];

  //slider config
  sliderconfig: any = {
    behaviour: 'drag',
    margin: 1,
    pips: {
      mode: 'steps',
      density: 1
    }
  };

  constructor(private _surveyService: SurveyService,
    private _activateRoute: ActivatedRoute,
    private _storageService: StorageService,
    private _overlayService: OverlayService,
    private _route: Router,
    private _apiService: ApiService,
    private _snackBar: MatSnackBar) {

    this._overlayService.show();
    var questionTypes = this._storageService.getSession('questiontypes');
    if (questionTypes == null) {
      this._apiService.getQuestionTypes().subscribe((data) => {
        this._storageService.setSession('questiontypes', JSON.stringify(data));
        this.lstQuestionTypes = data;
        this.callSurveyAPI();
      });
    }
    else {
      this.lstQuestionTypes = JSON.parse(questionTypes) as QuestionType[];
      this.callSurveyAPI();
    }


  }

  onChange(data: any) {

  }

  callSurveyAPI() {

    let dataLoaded = false;
    this._activateRoute.params.subscribe((data) => {
      this.routeGuid = data.id;
      this._storageService.setSession('SurveyGUID', data.id);
      const sess = this._storageService.getSession(this.sessionKey);
      this.refreshCurrentQuestionNumberValue();
      if (sess != null && this.currentQuestionNumber == 0) {
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
        this._route.navigate([`survey/view/${this.routeGUIDValue}`]);
      }
    });
  }

  ngOnInit() {
  }

  onSubmit() {

    this._overlayService.show();
    this.setAnswerToQuestion();

    let data = '';
    let dataToSend = [];
    let dataToRequest = new QuestionAnswerRequest();
    this.surveyData.surveyQuestions.forEach((element, index) => {

      let q = new QuestionAnswersBody();
      q.key = element.surveyQuestionId.toString();

      if (isNaN(this.lstAnswers[index])) {
        q.number = 0;
      }
      if (this.lstAnswers[index] == undefined) {
        q.selected = [];
      }
      if (typeof (this.lstAnswers[index]) == 'number' && !isNaN(this.lstAnswers[index])) {
        q.number = this.lstAnswers[index];
      }
      if (typeof (this.lstAnswers[index]) == 'string') {
        q.text = this.lstAnswers[index];
      }
      if (typeof (this.lstAnswers[index]) == 'object' && this.lstAnswers[index] != undefined) {
        q.selected = this.lstAnswers[index];
      }
      dataToSend.push(q);
      // data2[element.surveyQuestionId] = this.lstAnswers[index];
    });

    dataToRequest.data = dataToSend;

    this._surveyService.submitSurvey(this.routeGUIDValue, this.sessionValue(), dataToRequest).subscribe(() => {
      this.finalPage = true;
      this.clearSurveySession();
      this._overlayService.hide();
      this._route.navigate([`thankyou/survey/${this.routeGUIDValue}`]);
    },
      error => {
        this.openDismiss('Something went wrong, please try again', 'Dismiss');
        this._overlayService.hide();
      });
  }

  updateProgressBar() {
    this.progressPercentage = ((this.currentQuestionNumber + 1) / this.totalQuestions) * 100;
  }

  onRatingChanged(rating) {
    this.singleOption = rating;
  }

  onRatingChangedForEach(i, rating) {
    this.currentQuestionData.objectOptions[i].selectedRating = rating;
  }

  get getXValueOptions() {
    return this.currentQuestionData.objectOptions.filter(x => x.optionKey.startsWith('x_'));
  }

  get getValueOptions() {
    return this.currentQuestionData.objectOptions.filter(x => !x.optionKey.startsWith('x_'));
  }

  getCurrentQuestion() {
    this.refreshCurrentQuestionNumberValue();
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
      this.refreshCurrentQuestionNumberValue();
    });
  }

  nextQuestion() {

    this.refreshCurrentQuestionNumberValue();

    if (this.currentQuestionNumber != this.totalQuestions - 1) {
      this._overlayService.show();
      this.setAnswerToQuestion();
      this._storageService.setSession(this.currentQuestionKey, this.currentQuestionNumber + 1);
      this.getCurrentQuestion();
    }
    else {
      this.refreshCurrentQuestionNumberValue();
      return;
    }
  }

  previousQuestion() {
    this.refreshCurrentQuestionNumberValue();
    if (this.currentQuestionNumber <= 0) {
      return;
    }
    this._overlayService.show();
    this.setAnswerToQuestion();
    this._storageService.setSession(this.currentQuestionKey, this.currentQuestionNumber - 1);
    this.getCurrentQuestion();
  }

  convertInt(data: string) {
    return parseInt(data);
  }

  private clearSurveySession() {
    this._storageService.removeSession(this.sessionKey);
    this._storageService.removeSession(this.totalQuestionsKey);
    this._storageService.removeSession(this.currentQuestionKey);
    this._storageService.removeSession('SurveyGUID');
  }

  private get routeGUIDValue() {
    return this.routeGuid == undefined || this.routeGuid == null ? this._storageService.getSession('SurveyGUID') : this.routeGuid;
  }

  private get sessionKey() {
    return `Survey_Session_${this.routeGUIDValue}`;
  }

  private sessionValue() {
    return this._storageService.getSession(this.sessionKey);
  }

  updateUIWithAnswers() {
    this.refreshCurrentQuestionNumberValue();

    this.essayAnswer = '';
    this.singleOption = 0;

    this._surveyService.getCurrentSurveyAnswers().subscribe((data) => {

      if (data.length > 0 && data.length > this.currentQuestionNumber) {
        this.lstAnswers = data;
        switch (this.questionType) {
          case 'essay':
            this.essayAnswer = this.lstAnswers[this.currentQuestionNumber];
            break;
          case 'radiobuttons':
            this.singleOption = parseInt(this.lstAnswers[this.currentQuestionNumber]);
            break;
          case 'multiple':
            let data = this.lstAnswers[this.currentQuestionNumber];
            let multipleData = data.split(',');
            this.currentQuestionData.objectOptions.forEach((element) => {
              if (multipleData != undefined && multipleData.includes(element.surveyQuestionOptionId.toString())) {
                element.isChecked = true;
              }
            });
            break;
          case 'imageradiobuttons':
            this.singleOption = parseInt(this.lstAnswers[this.currentQuestionNumber]);
            break;
          case 'imagemultiple':
            let data_imagemultiple = this.lstAnswers[this.currentQuestionNumber];
            let imagemultipleData = data_imagemultiple.split(',');
            this.currentQuestionData.objectOptions.forEach((element) => {
              if (imagemultipleData != undefined && imagemultipleData.includes(element.surveyQuestionOptionId.toString())) {
                element.isChecked = true;
              }
            });
            break;
          case 'slider':
            var ansValue = this.lstAnswers[this.currentQuestionNumber];
            if (ansValue != undefined) {
              this.singleOption = parseInt(ansValue);
            }
            else {
              this.singleOption = parseInt(this.currentQuestionData.options['min']);
            }
            break;
          case 'rangeslider':
            var rangeValues = this.lstAnswers[this.currentQuestionNumber];
            if (rangeValues != undefined) {
              this.someRange = [parseInt(rangeValues[0]), parseInt(rangeValues[1])];
            }
            else {
              this.someRange = [parseInt(this.currentQuestionData.options['min']), parseInt(this.currentQuestionData.options['max'])]
              this.lstAnswers[this.currentQuestionNumber] = [this.currentQuestionData.options['min'], this.currentQuestionData.options['max']];
            }
            break;
          case 'starrating':
            this.singleOption = parseInt(this.lstAnswers[this.currentQuestionNumber]);
            break;
          case 'multiplerating':
            let multipleratings = this.lstAnswers[this.currentQuestionNumber];
            this.currentQuestionData.objectOptions.forEach((element, i) => {
              if (multipleratings != undefined) {
                element.selectedRating = parseInt(multipleratings[i]);
              }
            });
            break;
          case 'customrating':
            let customratings = this.lstAnswers[this.currentQuestionNumber];
            this.currentQuestionData.objectOptions.forEach((element, i) => {
              if (customratings != undefined && element.optionKey.startsWith("value")) {
                element.selectedRating = parseInt(customratings[i]);
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
    this.refreshCurrentQuestionNumberValue();

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
        case 'imageradiobuttons':
          answerData = this.singleOption;
          break;
        case 'imagemultiple':
          answerData = this.currentQuestionData.objectOptions.filter(x => x.isChecked).map(x => x.surveyQuestionOptionId.toString());
          break;
        case 'slider':
          answerData = this.singleOption;
          break;
        case 'rangeslider':
          answerData = [this.someRange[0].toString(), this.someRange[1].toString()];
          break;
        case 'starrating':
          answerData = this.singleOption;
          break;
        case 'multiplerating':
          answerData = this.currentQuestionData.objectOptions.map(x => x.selectedRating.toString());
          break;
        case 'customrating':
          answerData = this.currentQuestionData.objectOptions.filter(x => x.optionKey.startsWith("value")).map(x => (x.selectedRating || 0).toString());
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
    return 'Survey_Current_Question_' + this.routeGUIDValue;
  }

  refreshCurrentQuestionNumberValue() {
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
    return 'Survey_Questions_' + this.routeGUIDValue;
  }

  get totalQuestions() {
    var questionCount = parseInt(this._storageService.getSession(this.totalQuestionsKey));
    return questionCount == 0 ? 10 : questionCount;
  }

  // open snackbar
  openDismiss(message: string, buttontext: string) {
    this._snackBar.open(message, buttontext, {
      duration: 3000,
    });
  }

}
