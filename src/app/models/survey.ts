
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
