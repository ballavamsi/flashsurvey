import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Status } from 'src/app/models/status';
import { PollModel, PollViewModel, PollVote, PollResult } from 'src/app/models/poll';
import { SurveyModel } from 'src/app/create-survey/create-survey.component';
@Injectable({
  providedIn: 'root'
})


export class ApiService {
  _API: string;
  constructor(public http: HttpClient) {
    this._API = environment.API_URL + '/';
  }

  getStatus(): Observable<Status[]> {
    return this.http.get<Status[]>(this._API + 'status');
  }

  addPoll(data: PollModel): Observable<PollViewModel>{
    return this.http.put<PollViewModel>(this._API + 'poll/add', data);
  }

  getPoll(pollguid: string): Observable<PollViewModel>{
    return this.http.get<PollViewModel>(this._API + `poll/guid/${pollguid}`);
  }

  addPollVote(data: PollVote): Observable<boolean>{
    return this.http.put<boolean>(this._API + 'poll/vote', data);
  }

  pollResult(pollId: string): Observable<PollResult>{
    return this.http.get<PollResult>(this._API + `poll/result/${pollId}`);
  }

  //Survey
  addSurvey(data: SurveyModel): Observable<SurveyModel>{
    return this.http.put<SurveyModel>(this._API + 'survey/add', data);
  }
}
