import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.scss']
})
export class CreateSurveyComponent implements OnInit {

  fg: FormGroup;

  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker'
  ];

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.fg = this._formBuilder.group({
      welcomeMessage: ['Welcome to the survey', Validators.required],
      welcomeImage: [''],
      emailIdRequired: [],
      endMessage: ['Thank you for your valuable time', Validators.required]
    });
  }

  onFileComplete(controlType: string, data: any) {
    if(data.success) {
      this.fg.get(controlType).patchValue(data.link);
    }
  }
  onSubmit(){
    console.log(this.fg.value);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

}
