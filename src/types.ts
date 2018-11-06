export interface IAuthoredState {
  type: string;
  windowShade?: IAuthoredWindowShade;
  questionWrapper?: IAuthoredQuestionWrapper;
}

export interface IAuthoredWindowShade {
  content: string;
}

export interface IAuthoredQuestionWrapper {
  correctExplanation?: string;
  distractorsExplanation?: string;
  teacherTip?: string;
  exemplar?: string;
}
