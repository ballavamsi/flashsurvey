import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { PollModel, PollVote } from 'src/app/models/poll';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor(public api: ApiService) { }

  public addPoll(data: PollModel) {
    return this.api.addPoll(data);
  }

  public getPoll(pollguid: string) {
    return this.api.getPoll(pollguid);
  }

  public deletePoll(pollid: string) {
    return this.api.deletePoll(pollid);
  }


  public vote(data: PollVote) {
    return this.api.addPollVote(data);
  }

  public result(pollId: string) {
    return this.api.pollResult(pollId);
  }

  public getUserPolls(pagenumber: number, pagesize: number){
    return this.api.getUserPolls(pagenumber, pagesize);
  }

}
