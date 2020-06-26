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

  public listQuestionTypes: QuestionType[];

  constructor() {
  }

  ngOnInit() {
    this.listQuestionTypes = [
      new QuestionType(1, 'Essay' ),
      new QuestionType(2, 'Rating' ),
      new QuestionType(3, 'Range' )
    ];
    console.log(this.idx);
    console.log(this.questionForm);
    this.formChange.emit(this.questionForm);
  }

  onChanges(): void {
    console.log('MyForm > onChanges', this.questionForm.value);
    this.questionForm.valueChanges.subscribe(value => {
      this.formChange.emit(this.questionForm);
    });
  }

  get isRequired(){
    return this.questionForm.get('isRequired').value;
  }

  get userQuestion(){
    return this.questionForm.get('userQuestion').value;
  }

  get SurveyQuestionTypes() {
    return this.listQuestionTypes;
  }

}

export class QuestionType {
  constructor(public id: number, public name: string) { }
}
