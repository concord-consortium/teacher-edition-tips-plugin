import * as React from "react";

import css from "./question-and-question-wrapper.sass";
import { IAuthoredQuestionWrapper } from "../types";
import QuestionWrapper from "./question-wrapper";
import { ILogEvent } from "../utilities/analytics";

const testQuestionContext = {
  type: "Embeddable::MultipleChoice",
  choices: [
    { choice: "a", is_correct: true },
    { choice: "b", is_correct: false},
    { choice: "c", is_correct: false},
    { choice: "d", is_correct: true }
  ]
};

interface IProps {
  authoredState: IAuthoredQuestionWrapper;
  logEvent: (logData: ILogEvent) => void;
  updateFunction?: (nextState: IAuthoredQuestionWrapper) => void;
}

interface IState {}

// Headless container that provides state to children.
export default class QuestionAndQuestionWrapper extends React.Component<IProps, IState> {
  private domRef: any;

  public componentWillMount(){
    this.domRef = document.createElement("div");
    this.domRef.setAttribute("id", "wrapped-div");
    this.domRef.setAttribute("class", css.embeddableDiv);
    this.domRef.innerHTML = testQuestionContext.choices.map((c) => {
      return `<div><input type="radio">${c.choice}</input></div>`;
    }).join("\n");
  }

  public render() {
    const {authoredState} = this.props;
    return (
      <QuestionWrapper
        authoredState={authoredState}
        wrappedEmbeddableDiv={this.domRef}
        wrappedEmbeddableContext={testQuestionContext}
        logEvent={this.props.logEvent}
      />
    );
  }

}
