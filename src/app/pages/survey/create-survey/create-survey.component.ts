import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormArray, UntypedFormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OverlayService } from 'src/app/components/overlay/overlay.service';
import { SurveyService } from 'src/app/services/survey/survey.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { SurveyQuestionsModel, SurveyModel } from 'src/app/models/survey';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.scss']
})
export class CreateSurveyComponent implements OnInit {

  today = moment().add(1, 'day');
  minDate = {year: this.today.year , month: this.today.month , day: this.today.day};
  maxDate = moment().add(3, 'months').format('L');
  step = 0;
  displayAddQuestion = false;


  fg : UntypedFormGroup;
  questionSaved = [];
  questionOptions = [];
  questionTypes = [];
  newSurveyViewModel: SurveyModel;


  constructor(private _formBuilder: UntypedFormBuilder,
    private _surveyService: SurveyService,
    private _overlayService: OverlayService,
    private _snackBar: MatSnackBar,
    private _router: Router) {

    this.fg = this._formBuilder.group({
      welcomeMessage: this._formBuilder.control('', [Validators.required]),
      welcomeDescription: this._formBuilder.control(''),
      welcomeImage: this._formBuilder.control(''),
      emailIdRequired: this._formBuilder.control(false),
      askEmail: this._formBuilder.control(false),
      enablePrevious: this._formBuilder.control(false),
      endMessage: this._formBuilder.control('', [Validators.required]),
      questions: this._formBuilder.array([
        this.newQuestionType()
      ])
    });

  }

  // new question

  addNewQuestion() {
    this.questions.push(this.newQuestionType());
    this.questionOptions.push({});
    this.questionTypes.push();
    this.updateAddNewQuestionVisibility();
  }

  newQuestionType(): UntypedFormGroup {
    this.questionSaved.push(false);
    return this._formBuilder.group({
      userQuestion: this._formBuilder.control('', [Validators.required]),
      explanation: this._formBuilder.control(''),
      isRequired: this._formBuilder.control(false),
      questionType: this._formBuilder.control('-1'),
      questionOptions: this._formBuilder.control({})
    });
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
    this.questionOptions.splice(index, 1);
    this.questionTypes.splice(index, 1);
    this.questionSaved.splice(index, 1);
    this.updateAddNewQuestionVisibility();
  }

  additionalValidations() {
    if (this.questionSaved.indexOf(false) == -1) {
      return "";
    }
    if (this.questionSaved.indexOf(false) >= 0) {
      return "Few questions are not saved.";
    }

  }

  ////#region  submit
  modifyBody(data: any) {
    let survey = new SurveyModel();
    survey.welcometitle = data['welcomeMessage'];
    survey.welcomeDescription = data['welcomeDescription'];
    survey.welcomeimage = data['welcomeImage'];
    survey.emailidrequired = data['emailIdRequired'] ? 1 : 0;
    survey.askemail = data['askEmail'] ? 1 : 0;
    survey.enableprevious = data['enablePrevious'] ? 1 : 0;
    survey.endtitle = data['endMessage'];
    survey.allowduplicate = 0; //default 0
    survey.enddate = new Date((new Date().getDate()) + 365).toISOString(); //set next year date default
    survey.surveyQuestions = [];

    data['questions'].forEach((element, index) => {
      let eachquestion = new SurveyQuestionsModel();
      eachquestion.surveyQuestionId = 0;
      eachquestion.questionDisplayOrder = index + 1;
      eachquestion.title = element['userQuestion'];
      eachquestion.subtitle = element['explanation'];
      eachquestion.isrequired = element['isRequired'] ? 1 : 0;
      eachquestion.options = this.questionOptions[index];
      eachquestion.createdBy = 0;
      eachquestion.typeId = this.questionTypes[index];

      survey.surveyQuestions.push(eachquestion);
    });
    return survey;
  }

  onSubmit() {
    this._overlayService.show();
    const data = this.fg.value;
    const modifiedData = this.modifyBody(data);

    const additionalValidationsMessage = this.additionalValidations();
    if (this.fg.valid) {
      if (modifiedData.surveyQuestions.length == 0) {
        this._overlayService.hide();
        this.openDismiss('There should be atleast one question', 'Dismiss');
        return;
      }

      if (additionalValidationsMessage != "") {
        this._overlayService.hide();
        this.openDismiss(additionalValidationsMessage, 'Dismiss');
        return;
      }

      this._surveyService.addSurvey(modifiedData).subscribe(
        (returnData: SurveyModel) => {
          this.newSurveyViewModel = returnData;
          this._overlayService.hide();
          this._router.navigate([`success/survey/${returnData.surveyGuid}`]);
        },
        error => {
          this.openDismiss('Failed to create survey, please try again', 'Close');
          this._overlayService.hide();
        });
    }
    else {
      this._overlayService.hide();
      this.openDismiss("All required details are not filled", 'Dismiss');
    }


  }
  //#endregion

  //on image upload
  onFileComplete(controlType: string, data: any) {
    if (data.success) {
      this.fg.get(controlType).patchValue(data.data.display_url);
    }
  }

  onEmailMandatoryChange(){
    if(this.fg.get('emailIdRequired').value === true)
    {
      this.fg.get('askEmail').patchValue(true);
    }
  }


  // open snackbar
  openDismiss(message: string, buttontext: string) {
    this._snackBar.open(message, buttontext, {
      duration: 3000,
    });
  }

  //#region  next and back
  onClickNext(){
    this.step=1;
  }
  onClickBack(){
    this.step=0;
  }
  //#endregion

  addQuestionOptions(data: any, i: any) {
    this.questionOptions[i] = data['options'];
    this.questionTypes[i] = data['type'];
    this.questionSaved[i] = true;
    this.updateAddNewQuestionVisibility();
  }

  updateAddNewQuestionVisibility() {
    if (this.questionSaved.findIndex(x => x == false) != -1) {
      this.displayAddQuestion = false;
    }
    else {
      this.displayAddQuestion = true;
    }
  }

  IsSavedCheck(data: any, i: number) {
    this.questionSaved[i] = data;
    this.updateAddNewQuestionVisibility();
  }

  gettypeof(data: any) {
    console.log(typeof data);
  }

  getEachQuestionControl(index: number, prop: string): UntypedFormControl {
    return this.questions[index].get(prop) as UntypedFormControl;
  }

  get questions(): UntypedFormArray {
    return this.fg.get('questions') as UntypedFormArray;
  }

  ngOnInit() {
  }

}
