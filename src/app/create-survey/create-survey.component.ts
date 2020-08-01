import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SurveyService } from '../services/survey/survey.service';
import { OverlayService } from '../overlay/overlay.module';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.scss']
})
export class CreateSurveyComponent implements OnInit {

  fg: FormGroup;
  questionOptions = [];
  questionTypes = [];
  questionSaved = [];
  newSurveyViewModel: SurveyModel;
  displayAddQuestion = false;
  constructor(private _formBuilder: FormBuilder,
    private _surveyService: SurveyService,
    private _overlayService: OverlayService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    public dialog: MatDialog) {
    this.fg = this._formBuilder.group({
      welcomeMessage: this._formBuilder.control('', [Validators.required]),
      welcomeDescription: this._formBuilder.control(''),
      welcomeImage: this._formBuilder.control(''),
      emailIdRequired: this._formBuilder.control(false),
      askEmail: this._formBuilder.control(false),
      endMessage: this._formBuilder.control('', [Validators.required]),
      questions: this._formBuilder.array([
        this.newQuestionType()
      ])
    });
  }

  ngOnInit() { }

  onFileComplete(controlType: string, data: any) {
    if (data.success) {
      this.fg.get(controlType).patchValue(data.data.display_url);
    }
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
       (returnData: SurveyModel) =>{
          this.newSurveyViewModel = returnData;
          this._overlayService.hide();
          this.openDialog('Survey Created successfully', 'Click on the link to copy', this.generateLink(returnData.surveyGuid), true);
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

  additionalValidations() {
    if (this.questionSaved.indexOf(false) == -1) {
      return "";
    }
    if (this.questionSaved.indexOf(false) >= 0) {
      return "Few questions are not saved.";
    }

  }

  modifyBody(data: any) {
    let survey = new SurveyModel();
    survey.welcometitle = data['welcomeMessage'];
    survey.welcomeDescription = data['welcomeDescription'];
    survey.welcomeimage = data['welcomeImage'];
    survey.emailidrequired = data['emailIdRequired'] ? 1 : 0;
    survey.askemail = data['askEmail'] ? 1 : 0;
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

  // drag and drop
  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.questions.controls, event.previousIndex, event.currentIndex);
    moveItemInArray(this.questions.value, event.previousIndex, event.currentIndex);
    moveItemInArray(this.questionOptions, event.previousIndex, event.currentIndex);
    moveItemInArray(this.questionTypes, event.previousIndex, event.currentIndex);
    moveItemInArray(this.questionSaved, event.previousIndex, event.currentIndex);
  }

  newQuestionType(): FormGroup {
    this.questionSaved.push(false);
    return this._formBuilder.group({
      userQuestion: this._formBuilder.control('', [Validators.required]),
      explanation: this._formBuilder.control(''),
      isRequired: this._formBuilder.control(false),
      questionType: this._formBuilder.control('-1'),
      questionOptions: this._formBuilder.control({})
    });
  }

  addQuestionOptions(data: any, i: any) {
    this.questionOptions[i] = data['options'];
    this.questionTypes[i] = data['type'];
    this.questionSaved[i] = true;
    this.updateAddNewQuestionVisibility();
  }

  addNewQuestion() {
    this.questions.push(this.newQuestionType());
    this.questionOptions.push({});
    this.questionTypes.push();
    this.updateAddNewQuestionVisibility();
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
    this.questionOptions.splice(index, 1);
    this.questionTypes.splice(index, 1);
    this.questionSaved.splice(index, 1);
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

  getEachQuestionControl(index: number, prop: string): FormControl {
    return this.questions[index].get(prop) as FormControl;
  }

  get questions(): FormArray {
    return this.fg.get('questions') as FormArray;
  }

  // open snackbar
  openDismiss(message: string, buttontext: string) {
    this._snackBar.open(message, buttontext, {
      duration: 3000,
    });
  }

  /// Get Values
  generateLink(shareId: string): string {
    return window.location.origin + `/survey/view/${shareId}`;
  }

  openDialog(_heading: string, _subheading: string, _message: string, _isLinkShare: boolean) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: {
        message: _message,
        heading: _heading,
        subheading: _subheading,
        isHtml: _isLinkShare,
        buttonText: {
          cancel: 'Close'
        }
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      const newSurveyDetails = this.newSurveyViewModel;
      let sharelink = '';
      if (newSurveyDetails != null) { sharelink = newSurveyDetails.surveyGuid; }
      this._router.navigate([`survey/view/${sharelink}`]);
    });
  }

}


export class SurveyModel {
  surveyId: number;
  welcometitle: string;
  welcomeDescription: string;
  welcomeimage: string;
  emailidrequired: number;
  askemail: number;
  endtitle: string;
  allowduplicate: number; //default 0
  enddate: string; //set next year date default
  surveyQuestions: SurveyQuestionsModel[];
  surveyGuid: string;
}

export class SurveyQuestionsModel {
  surveyId: number;
  surveyQuestionId: number;
  typeId: number; // send type
  title: string;
  subtitle: string;
  isrequired: number;
  questionDisplayOrder: number; // this will be index
  createdBy: number; // 0 for now
  statusId: number; //0 for now
  options: {};
  objectOptions: SurveyQuestionOptionsModel[];
}

export class SurveyQuestionOptionsModel {
  surveyQuestionOptionId: number;
  surveyQuestionId: number;
  optionKey: string;
  optionValue: string;
  isChecked: boolean;
  createdBy: number;
  displayOrder: number;
}
