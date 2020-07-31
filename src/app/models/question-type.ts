
export class QuestionType {
  constructor(public id: number, public code: string, public name: string) { }
}

export class QuestionAnswerRequest{
  public data: QuestionAnswersBody[];
}

export class QuestionAnswersBody{
  public key: string;
  public text: string;
  public number: number;
  public selected: string[]
}
