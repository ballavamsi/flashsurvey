import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatAccordion, MatSnackBar } from '@angular/material';
import { SurveyService } from 'src/app/services/survey/survey.service';
import { ApiService } from 'src/app/services/api/api.service';
import { QuestionType } from 'src/app/models/question-type';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-survey-question',
  templateUrl: './survey-question.component.html',
  styleUrls: ['./survey-question.component.scss']
})


export class SurveyQuestionComponent implements OnInit {
  constructor(private _snackBar: MatSnackBar,
    private _apiService: ApiService,
    private _storageService: StorageService) {
  }

  get isRequired() {
    return this.questionForm.get('isRequired').value;
  }

  get userQuestion() {
    return this.questionForm.get('userQuestion').value;
  }

  get SurveyQuestionTypes() {
    return this.listQuestionTypes;
  }
  @ViewChild('myaccordian', { static: true }) accordion: MatAccordion;

  @Input() questionForm: FormGroup;
  @Input() idx: number;
  @Output() idxToRemove: EventEmitter<number> = new EventEmitter<number>();
  @Output() formChange: EventEmitter<any> = new EventEmitter();
  @Output() questionAdditionalInfo: EventEmitter<any> = new EventEmitter<any>();
  @Output() IsSaved: EventEmitter<any> = new EventEmitter<any>();
  public listQuestionTypes: QuestionType[];
  public options = [];
  public newitem = '';
  public minValue = 10;
  public maxValue = 1000;
  public selectedListQuestionTypes = "";

  public expandedPanel = true;
  public disableState = true;
  invalidForm = false;

  ngOnInit() {

    var questionTypes = this._storageService.getSession('questiontypes');
    if (questionTypes == null) {
      this._apiService.getQuestionTypes().subscribe((data) => {
        this._storageService.setSession('questiontypes', JSON.stringify(data));
        this.listQuestionTypes = data;
      });
    }
    else {
      this.listQuestionTypes = JSON.parse(questionTypes) as QuestionType[];
    }
    console.log(this.idx);
    console.log(this.questionForm);
    this.selectedListQuestionTypes = this.questionForm.controls['questionType'].value;
    this.formChange.emit(this.questionForm);
    this.IsSaved.emit(false);
    this.invalidForm = true;
  }

  setQuestionType(idx, event) {
    this.selectedListQuestionTypes = event.value;
    this.invalidForm = true;
    this.IsSaved.emit(false);
  }

  SaveEmit(idx) {
    //this.questionOptions.emit({ 'min': 10, 'max': 100 });

    let emitOptions = {};

    if (this.selectedListQuestionTypes == '-1') {
      this.openDismiss('Select question type', 'Dismiss');
      return;
    }

    if (this.selectedListQuestionTypes == 'essay') {
      emitOptions['min'] = this.minValue;
      emitOptions['max'] = this.maxValue;
    }

    if (this.selectedListQuestionTypes == 'radiobuttons' || this.selectedListQuestionTypes == 'multiple'
      || this.selectedListQuestionTypes == 'imageradiobuttons' || this.selectedListQuestionTypes == 'imagemultiple') {
      let i = 0;
      this.options.forEach(element => {
        let valueText = 'value' + i;
        emitOptions[valueText] = element;
        i++;
      });
    }

    if (this.selectedListQuestionTypes == 'rangeslider') {
      emitOptions['min'] = this.minValue;
      emitOptions['max'] = this.maxValue;
    }

    let emitData = {
      'options': emitOptions,
      'type': this.listQuestionTypes.find(x => x.code == this.selectedListQuestionTypes).id
    };

    if (this.questionForm.valid) {
      const questionValidationMessages = this.questionValidations(emitOptions);
      if (questionValidationMessages != '') {
        this.openDismiss(questionValidationMessages, 'Dismiss');
        this.invalidForm = true;
        return;
      }
      this.questionAdditionalInfo.emit(emitData);
      this.formChange.emit(this.questionForm);
      this.disableState = false;
      this.expandedPanel = false;
      this.IsSaved.emit(true);
      this.invalidForm = false;
    }
    else {
      this.openDismiss('All the required details are not filled', 'Dismiss');
      this.invalidForm = true;
    }
  }

  questionValidations(emitOptions: any) {
    if (this.selectedListQuestionTypes == 'essay') {
      if (emitOptions['min'] == '' || emitOptions['min'] == null) {
        return 'Minimum characters cannot be empty';
      }
      if (emitOptions['min'] < 10) {
        return 'Minimum characters should be between 10 and 1000';
      }
      if (emitOptions['min'] > 1000) {
        return 'Minimum characters cannot be greater than 1000';
      }

      if (emitOptions['max'] == '' || emitOptions['max'] == null) {
        return 'Maximum characters cannot be empty';
      }
    }

    if (this.selectedListQuestionTypes == 'rangeslider') {
      if (emitOptions['min'] == '' || emitOptions['min'] == null) {
        return 'Starting range cannot be empty';
      }
      if (emitOptions['max'] == '' || emitOptions['max'] == null) {
        return 'Ending range cannot be empty';
      }
      if (emitOptions['min'] > emitOptions['max']) {
        return 'Starting range cannot be greater than ending';
      }
    }

    if (this.selectedListQuestionTypes == 'radiobuttons' || this.selectedListQuestionTypes == 'multiple' ||
        this.selectedListQuestionTypes == 'imageradiobuttons' || this.selectedListQuestionTypes == 'imagemultiple') {
      if (emitOptions['value0'] == undefined) {
        return 'There should be atleast one option.';
      }
    }
    return '';
  }

  addOption() {

    if (this.newitem == '' || this.newitem == undefined || this.newitem == null) {
      this.openDismiss("Option cannot be empty","Dismiss");
      return;
    }

    if (this.options.includes(this.newitem)) {
      this.openDismiss("Option already exists in the list","Dismiss");
      return;
    }

    this.options.push(this.newitem);
    this.newitem = '';
  }

  onFileComplete(data: any) {
    if (data.success) {
      this.newitem = data.data.display_url;
      this.addOption();
    }
  }

  removeOption(index: number) {
    this.options.splice(index, 1);
  }

  textChanged() {
    this.invalidForm = true;
    this.IsSaved.emit(false);
  }

  getOptionName(key: string) {
    return this.SurveyQuestionTypes.filter(x => x.code === key)[0].name;
  }
  emitAfterExpanded(event: any) {
    console.log(event);
    this.disableState = true;
    this.expandedPanel = true;
  }

  emitAfterCollapsed(event: any) {
    console.log(event);
    this.disableState = false;
    this.expandedPanel = false;
  }

  // open snackbar
  openDismiss(message: string, buttontext: string) {
    this._snackBar.open(message, buttontext, {
      duration: 3000,
    });
  }

}
