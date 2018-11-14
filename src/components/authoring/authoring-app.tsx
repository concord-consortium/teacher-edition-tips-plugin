import * as React from "react";
import * as ReactDOM from "react-dom";
import WindowShadeEdit from "./window-shade/window-shade-edit";
import QuestionWrapperEdit from "./question-wrapper/question-wrapper-edit";

import { IWindowShade, WindowShadeType, IAuthoredQuestionWrapper } from "../../types";

const windowShadeProps: IWindowShade = {
  windowShadeType: WindowShadeType.TheoryAndBackground,
  content: "## This is something"
};

const questionWrapperProps: IAuthoredQuestionWrapper = {
  correctExplanation: "correct",
  distractorsExplanation: "disractor",
  exemplar: "exemplare",
  teacherTip: "teacherTip",
  teacherTipImageOverlay: ""
};

ReactDOM.render(
  <div>
    <WindowShadeEdit initialProps={windowShadeProps} />
    <QuestionWrapperEdit initialProps={questionWrapperProps} />
  </div>,
  document.getElementById("window-shade-editor")
);
