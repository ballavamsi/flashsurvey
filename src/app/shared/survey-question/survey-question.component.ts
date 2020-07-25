import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-survey-question',
  templateUrl: './survey-question.component.html',
  styleUrls: ['./survey-question.component.scss']
})


export class SurveyQuestionComponent implements OnInit {
  @Input() questionForm: FormGroup;
  @Input() idx: number;
  @Output() idxToRemove: EventEmitter<number> = new EventEmitter<number>();
  @Output() formChange: EventEmitter<any> = new EventEmitter();
  @Output() questionAdditionalInfo: EventEmitter<any> = new EventEmitter<any>();
  public listQuestionTypes: QuestionType[];
  public options = [];
  public newitem: any;
  public minValue: any;
  public maxValue: any;
  public selectedListQuestionTypes = ['essay'];
  constructor() {
  }

  ngOnInit() {
    this.listQuestionTypes = [
      new QuestionType('essay', 'Essay'),
      new QuestionType('radiobuttons', 'Single Option'),
      new QuestionType('multiple', 'Multiple Options'),
      new QuestionType('rangeslider', 'Range Slider'),
      new QuestionType('rating', 'Rating')
    ];
    console.log(this.idx);
    console.log(this.questionForm);
    this.formChange.emit(this.questionForm);
  }

  onChanges(): void {
    // console.log('MyForm > onChanges', this.questionForm.value);
    // this.questionForm.valueChanges.subscribe(value => {
    //   this.formChange.emit(this.questionForm);
    // });
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

  setQuestionType(idx, event) {
    this.selectedListQuestionTypes[idx] = event.value;
  }

  SaveEmit(idx) {
    //this.questionOptions.emit({ 'min': 10, 'max': 100 });

    let emitOptions = {};

    if (this.selectedListQuestionTypes[idx] == 'essay') {
      emitOptions['min'] = this.minValue;
      emitOptions['max'] = this.maxValue;
    }

    if (this.selectedListQuestionTypes[idx] == 'radiobuttons') {
      let i = 0;
      this.options.forEach(element => {
        let valueText = 'value' + i;
        emitOptions[valueText] = element;
        i++;
      });
    }

    let emitData = {
      'options': emitOptions,
      'type': this.listQuestionTypes.findIndex(x => x.code == this.selectedListQuestionTypes[idx])
    };

    this.questionAdditionalInfo.emit(emitData);
    this.formChange.emit(this.questionForm);
  }

  addOption() {
    if (this.newitem != '' && !this.options.includes(this.newitem)) {
      this.options.push(this.newitem);
      this.newitem = '';
    }
  }

}

export class QuestionType {
  constructor(public code: string, public name: string) { }
}
