import * as React from "react";

import * as css from "./question-wrapper-edit.sass";
import { IAuthoredQuestionWrapper } from "../../../types";
import ContentConfigurations from "../../../config/ui-configurations";
import QuestionWrapper from "../../question-wrapper";
import QuestionWrapperForm from "./question-wrapper-form";
import QuestionWrapperJson from "./question-wrapper-json";

const testQuestionContext = {
  type: "Embeddable::MultipleChoice",
  choices: [
    {
      choice: "a",
      is_correct: true
    },
    {
      choice: "b",
      is_correct: false
    },
    {
      choice: "c",
      is_correct: false
    },
    {
      choice: "d",
      is_correct: true
    }
  ]
};

interface IProps {
  initialProps: IAuthoredQuestionWrapper;
  updateFunction?: (nextState: IAuthoredQuestionWrapper) => void;
}

interface IState {
  authoredState: IAuthoredQuestionWrapper;
}

// Headless container that provides state to children.
export default class QuestionWrapperEditor extends React.Component<IProps, IState> {
  public state: IState = {
    authoredState: Object.assign({}, this.props.initialProps)
  };
  private domRef: any;

  public componentWillMount(){
    this.domRef = document.createElement("div");
    this.domRef.setAttribute("id", "wrapped-div");
    this.domRef.setAttribute("class", css.embeddableDiv);
    this.domRef.innerHTML = testQuestionContext.choices.map((c)=> {
      return `<div><input type="radio">${c.choice}</input></div>`;
    }).join("\n");
  }
  public update = (nextState: IAuthoredQuestionWrapper) => {
    const {updateFunction} = this.props;
    this.setState({authoredState: nextState}, () => {
      if (this.props.updateFunction) {
        this.props.updateFunction(nextState);
      }
    });
  }

  public render() {
    const {authoredState} = this.state;

    return (
      <div className={css.editor}>
        <div className={css.preview}>
          <QuestionWrapper
            authoredState={authoredState}
            wrappedEmbeddableDiv={this.domRef}
            wrappedEmbeddableContext={testQuestionContext}
          />
        </div>
      </div>
    );
  }

}
