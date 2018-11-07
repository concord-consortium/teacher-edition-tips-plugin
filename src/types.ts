
export type TypeTeachearTipType = "windowShade" | "sideTip" | "questionWrapper";
export type TypeWindowShadeType = "teacherTip" | "theoryAndBackground";

export interface IAuthoredState {
  type: TypeTeachearTipType;
  windowShade?: IAuthoredWindowShade;
  questionWrapper?: IAuthoredQuestionWrapper;
  sideTip?: IAuthoredSideTip;
}

export interface IAuthoredWindowShade {
  content: string;
  type: TypeWindowShadeType;
  tabNameOverride?: string;
}

export interface IAuthoredSideTip {
  content: string;
}

export interface IAuthoredQuestionWrapper {
  correctExplanation?: string;
  distractorsExplanation?: string;
  teacherTip?: string;
  exemplar?: string;
}
