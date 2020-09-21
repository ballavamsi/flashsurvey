
export class SurveyModel {
  surveyId: number;
  welcometitle: string;
  welcomeDescription: string;
  welcomeimage: string;
  emailidrequired: number;
  askemail: number;
  enableprevious: number;
  endtitle: string;
  allowduplicate: number; //default 0
  enddate: string; //set next year date default
  surveyQuestions: SurveyQuestionsModel[];
  surveyGuid: string;
  surveyUserGuid: string;
}

export class SurveyQuestionsModel {
  surveyId: number;
  surveyQuestionId: number;
  typeId: number; // send type
  title: string;
  subtitle: string;
  isrequired: number;
  questionDisplayOrder: number; // this will be index
  createdBy: number; // 0 for now
  statusId: number; //0 for now
  options: {};
  objectOptions: SurveyQuestionOptionsModel[];
  selectedvalues: {};
  questiontype: string;
}

export class SurveyQuestionOptionsModel {
  surveyQuestionOptionId: number;
  surveyQuestionId: number;
  optionKey: string;
  optionValue: string;
  isChecked: boolean;
  selectedRating: number;
  createdBy: number;
  displayOrder: number;
}


export class UserSurveysResponseModel{
  userSurveys: UserSurveysViewModel[];
  totalSurveys: number;
}

export class UserSurveysViewModel{
  surveyId: number;
  surveyGuid: string;
  status: string;
  date: Date;
  feedbacks: number;
  surveyName: string;
}

export class UserSurveyFeedbackResponseModel{
  surveyTitle: string;
  surveyLogo: string;
  feedbacks: UserSurveyFeedbacks[];
  total: number;
}

export class UserSurveyFeedbacks{
  surveyUserId: number;
  surveyUserGuid: string;
  emailId: string;
  receivedDate: Date;
  comment: string;
  reviewComplete: boolean;
  reviewUpdatedDate: Date;
}

export class SurveyMetricsViewModel {
  title: string;
  description: string;
  logo: string;
  questions: QuestionMetricsViewModel[];
}

export class QuestionMetricsViewModel {
  question: string;
  explanation: string;
  questionType: string;
  options: OptionsMetricsViewModel[];
  originalQuestionOptions: SurveyQuestionOptionsModel[];
}

export class OptionsMetricsViewModel {
  optionId: number;
  optionText: string;
  optionCount: number;
  optionAverage: number;
  subOptions: OptionsMetricsViewModel[];
}
