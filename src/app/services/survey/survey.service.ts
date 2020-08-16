import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { SurveyModel } from 'src/app/create-survey/create-survey.component';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { QuestionAnswersBody, QuestionAnswerRequest } from 'src/app/models/question-type';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private _emptySurvey: SurveyModel;
  private _emptyAnswers = [];
 _messageforsuccess : string;

  constructor(public api: ApiService) { }

  $currentSurvey: BehaviorSubject<SurveyModel> = new BehaviorSubject(this._emptySurvey);
  $currentSurveyAnswers: BehaviorSubject<any[]> = new BehaviorSubject(this._emptyAnswers);
  $previewSurvey: BehaviorSubject<SurveyModel> = new BehaviorSubject(this._emptySurvey);
  $messageSuccess: BehaviorSubject<string> = new BehaviorSubject(this._messageforsuccess);

  public addSurvey(data: SurveyModel) {
    return this.api.addSurvey(data);
  }

  public getSurvey(surveyguid: string) {
    return this.api.getSurvey(surveyguid);
  }

  public beginSurvey(surveyguid: string, emailId: string) {
    return this.api.beginSurvey(surveyguid,emailId);
  }

  public submitSurvey(surveyguid: string,session: string, data: QuestionAnswerRequest){
    return this.api.submitSurvey(surveyguid,session,data);
  }
  ///Begin observables
  public setCurrentSurvey(data: SurveyModel) {
    this.$currentSurvey.next(data);
  }

  public getCurrentSurvey(): Observable<SurveyModel> {
    return this.$currentSurvey.asObservable();
  }

  public clearSurvey(){
    this.$currentSurvey.next(this._emptySurvey);
  }

  public setCurrentSurveyAnswers(data: any) {
    this.$currentSurveyAnswers.next(data);
  }

  public getCurrentSurveyAnswers(): Observable<any> {
    return this.$currentSurveyAnswers.asObservable();
  }

  public clearSurveyAnswers(){
    this.$currentSurveyAnswers.next(this._emptyAnswers);
  }

  public setPreviewSurvey(data: SurveyModel) {
    this.$previewSurvey.next(data);
  }

  public getPreviewSurvey(): Observable<SurveyModel> {
    return this.$previewSurvey.asObservable();
  }

  public clearPreviewSurvey(){
    this.$previewSurvey.next(this._emptySurvey);
  }

   public storeurl(data: string)
   {
     this.$messageSuccess.next(data);
   }

   public getStoredUrl(): Observable<string> {
    return this.$messageSuccess.asObservable();
  }


}
