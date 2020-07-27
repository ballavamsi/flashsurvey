import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatAccordion, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-survey-question',
  templateUrl: './survey-question.component.html',
  styleUrls: ['./survey-question.component.scss']
})


export class SurveyQuestionComponent implements OnInit {
  constructor(private _snackBar: MatSnackBar) {
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
  public minValue = 1;
  public maxValue = 1000;
  public selectedListQuestionTypes = "";

  public expandedPanel = true;

  disableState = false;

  ngOnInit() {
    this.listQuestionTypes = [
      new QuestionType('-1', '--Select--'),
      new QuestionType('essay', 'Essay'),
      new QuestionType('radiobuttons', 'Radiobutton Options'),
      new QuestionType('multiple', 'Multiselect Options'),
      new QuestionType('rangeslider', 'Range Slider'),
      new QuestionType('rating', 'Rating')
    ];
    console.log(this.idx);
    console.log(this.questionForm);
    this.selectedListQuestionTypes = this.questionForm.controls['questionType'].value;
    this.formChange.emit(this.questionForm);
  }

  onChanges(): void {
    // console.log('MyForm > onChanges', this.questionForm.value);
    // this.questionForm.valueChanges.subscribe(value => {
    //   this.formChange.emit(this.questionForm);
    // });
  }

  setQuestionType(idx, event) {
    this.selectedListQuestionTypes = event.value;
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

    if (this.selectedListQuestionTypes == 'radiobuttons') {
      let i = 0;
      this.options.forEach(element => {
        let valueText = 'value' + i;
        emitOptions[valueText] = element;
        i++;
      });
    }

    let emitData = {
      'options': emitOptions,
      'type': this.listQuestionTypes.findIndex(x => x.code == this.selectedListQuestionTypes)
    };

    if (this.questionForm.valid) {
      const questionValidationMessages = this.questionValidations(emitOptions);
      if(questionValidationMessages != '')
      {
        this.openDismiss(questionValidationMessages,'Dismiss');
        return;
      }
      this.questionAdditionalInfo.emit(emitData);
      this.formChange.emit(this.questionForm);
      this.disableState = false;
      this.expandedPanel = false;
    }
    else {
      this.openDismiss('All the required details are not filled', 'Dismiss');
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
    }
    return '';
  }

  addOption() {
    if (this.newitem != '' && !this.options.includes(this.newitem)) {
      this.options.push(this.newitem);
      this.newitem = '';
    }
  }

  getOptionName(key: string) {
    return this.SurveyQuestionTypes.filter(x => x.code === key)[0].name;
  }
  emitAfterExpanded(event: any) {
    console.log(event);
    this.disableState = true;
    this.expandedPanel = true;
  }

  // open snackbar
  openDismiss(message: string, buttontext: string) {
    this._snackBar.open(message, buttontext, {
      duration: 3000,
    });
  }

}

export class QuestionType {
  constructor(public code: string, public name: string) { }
}
