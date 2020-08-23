export class PollModel {
  public constructor(init?: Partial<PollModel>) {
    Object.assign(this, init);
}
  pollGuid: string;
  name: string;
  options: string[];
  type: PollOptionTypes;
  endDate: Date;
  duplicate: boolean;
  status: number;
}

export class PollViewModel{
  pollId:	number;
  name:	string;
  type:	number;
  duplicate:	number;
  enddate:	Date;
  createdBy:	number;
  createdDate:	Date;
  statusId:	number;
  updatedDate:	Date;
  updatedBy: number;
  pollGuid:	string;
  pollOptions: PollOptions[];
}

export class PollOptions{
  pollOptionId:	number;
  pollId:	number;
  optionText:	string;
  statusId:	number;
  orderId:	number;
  createdBy:	number;
  createdDate:	Date;
  updatedBy:	number;
  updatedDate:	Date;
}

export enum PollOptionTypes {
  radiobutton,
  checkbox
}

export class PollVote{
  pollId: number;
  options: PollOptionVote[]
}

export class PollOptionVote{
  optionId: number;
  optionText: string;
  isChecked: boolean;
}

export class GraphResult{
  label: string;
  count: number;
}

export class PollResult{
  question: string;
  options: GraphResult[];
  regions: GraphResult[];
}

export class UserPollsResponseModel{
  userPolls: UserPollsViewModel[];
  totalPolls: number;
}

export class UserPollsViewModel{
  pollId: number;
  pollGuid: string;
  status: string;
  date: Date;
  votes: number;
  pollName: string;
}
