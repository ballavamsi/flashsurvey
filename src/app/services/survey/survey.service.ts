import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { SurveyModel } from 'src/app/create-survey/create-survey.component';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(public api: ApiService) { }

  public addSurvey(data: SurveyModel) {
    return this.api.addSurvey(data);
  }

}
