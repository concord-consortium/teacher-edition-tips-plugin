export interface IAuthoredState {
  type: string;
  windowShade?: IAuthoredWindowShade;
  questionWrapper?: IAuthoredQuestionWrapper;
}

export interface IAuthoredWindowShade {
  type: string;
  content: string;
  mediaType?: string;  // Must be either "none", "image", or "video". Could this be a use for enum?
}

export interface IAuthoredQuestionWrapper {
  correctExplanation?: string;
  distractorsExplanation?: string;
  teacherTip?: string;
  exemplar?: string;
}
