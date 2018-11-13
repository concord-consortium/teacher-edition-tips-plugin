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
  DiscussionPoints = "discussionPoints",
  DiggingDeeper = "diggingDeeper"
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

export interface IWindowShade {
  windowShadeType: WindowShadeType;
  content: string;
  layout?: WindowShadeLayout;
  tabNameOverride?: string;
  mediaType?: MediaType;
  mediaURL?: string;
  mediaCaption?: string;
}
export interface ISideTip {
  content: string;
  layout?: WindowShadeLayout;
  mediaType?: MediaType;
  mediaURL?: string;
  mediaCaption?: string;
}

export interface IAuthoredQuestionWrapper {
  correctExplanation?: string;
  distractorsExplanation?: string;
  teacherTip?: string;
  teacherTipImageOverlay?: string;
  exemplar?: string;
}
