export enum TeacherTipType {
  QuestionWrapper = "questionWrapper",
  WindowShade = "windowShade",
  SideTip = "sideTip"
}

export interface IAuthoredState {
  tipType: TeacherTipType;
  windowShade?: IWindowShade;
  questionWrapper?: IAuthoredQuestionWrapper;
  sideTip?: ISideTip;
}

export enum WindowShadeType {
  TheoryAndBackground = "theoryAndBackground",
  TeacherTip = "teacherTip",
  DiscussionPoints = "discussionPoints"
}

export enum WindowShadeLayout {
  Default = "default",
  RightText = "rightText"
}

export enum MediaType {
  None = "none",
  Image = "image",
  Video = "video"
}

interface IBaseTip {
  content: string;
  mediaType?: MediaType;
  mediaURL?: string;
  mediaCaption?: string;
  tabNameOverride?: string;
}

export interface IWindowShade extends IBaseTip {
  windowShadeType: WindowShadeType;
  layout?: WindowShadeLayout;
}

export interface ISideTip extends IBaseTip {
  content: string;
  mediaType?: MediaType;
  mediaURL?: string;
  mediaCaption?: string;
}

export interface IAuthoredQuestionWrapper {
  correctExplanation?: string;
  distractorsExplanation?: string;
  teacherTip?: string;
  exemplar?: string;
}
