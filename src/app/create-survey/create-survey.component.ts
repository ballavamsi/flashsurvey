import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.scss']
})
export class CreateSurveyComponent implements OnInit {

  fg: FormGroup;
  constructor(private _formBuilder: FormBuilder) {
    this.fg = this._formBuilder.group({
      welcomeMessage: this._formBuilder.control('Welcome to the survey', [Validators.required]),
      welcomeImage: this._formBuilder.control(''),
      emailIdRequired: this._formBuilder.control(false),
      endMessage: this._formBuilder.control('Thank you for your valuable time', [Validators.required]),
      questions: this._formBuilder.array([
        this.newQuestionType()
      ])
    });
  }

  ngOnInit() {}

  onFileComplete(controlType: string, data: any) {
    if (data.success) {
      this.fg.get(controlType).patchValue(data.link);
    }
  }
  onSubmit() {
    console.log(this.fg.value);
  }

  // drag and drop
  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.questions.controls, event.previousIndex, event.currentIndex);
    moveItemInArray(this.questions.value, event.previousIndex, event.currentIndex);
  }

  newQuestionType(): FormGroup {
    return this._formBuilder.group({
      userQuestion: this._formBuilder.control('Your question goes here', [Validators.required]),
      explanation: this._formBuilder.control(''),
      isRequired: this._formBuilder.control(false),
      questionType: this._formBuilder.control(''),
      subProperties: this._formBuilder.group({
        minValue: this._formBuilder.control('0'),
        maxValue: this._formBuilder.control('1000')
      }),
    });
  }

  addNewQuestion() {
    this.questions.push(this.newQuestionType());
  }

  removeQuestion(index: number){
    this.questions.removeAt(index);
  }

  gettypeof(data:any)
  {
    console.log(typeof data);
  }

  getEachQuestionControl(index: number, prop: string): FormControl {
    return this.questions[index].get(prop) as FormControl;
  }

  get questions(): FormArray {
    return this.fg.get('questions') as FormArray;
  }

}
