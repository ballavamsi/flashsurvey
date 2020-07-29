import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { SurveyModel } from 'src/app/create-survey/create-survey.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private _emptySurvey: SurveyModel;
  constructor(public api: ApiService) { }

  $currentSurvey: BehaviorSubject<SurveyModel> = new BehaviorSubject(this._emptySurvey);
  $previewSurvey: BehaviorSubject<SurveyModel> = new BehaviorSubject(this._emptySurvey);

  public addSurvey(data: SurveyModel) {
    return this.api.addSurvey(data);
  }

  public getSurvey(surveyguid: string) {
    return this.api.getSurvey(surveyguid);
  }

  public beginSurvey(surveyguid: string, emailId: string) {
    return this.api.beginSurvey(surveyguid,emailId);
  }
  public setCurrentSurvey(data: SurveyModel) {
    this.$currentSurvey.next(data);
  }

  getCurrentSurvey(): Observable<SurveyModel> {
    return this.$currentSurvey.asObservable();
  }

  public clearSurvey(){
    this.$currentSurvey.next(this._emptySurvey);
  }

  public setPreviewSurvey(data: SurveyModel) {
    this.$previewSurvey.next(data);
  }

  getPreviewSurvey(): Observable<SurveyModel> {
    return this.$previewSurvey.asObservable();
  }

  public clearPreviewSurvey(){
    this.$previewSurvey.next(this._emptySurvey);
  }

}
