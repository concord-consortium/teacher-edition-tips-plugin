import * as React from "react";

import * as css from "./question-wrapper-edit.sass";
import { IAuthoredQuestionWrapper } from "../../../types";
import ContentConfigurations from "../../../config/ui-configurations";
import QuestionAndQuestionWrapper from "../../question-and-question-wrapper";
import QuestionWrapperForm from "./question-wrapper-form";

interface IProps {
  initialAuthorData: IAuthoredQuestionWrapper;
  updateFunction?: (nextState: IAuthoredQuestionWrapper) => void;
}

interface IState {
  authoredState: IAuthoredQuestionWrapper;
}

export default class QuestionWrapperEditor extends React.Component<IProps, IState> {
  public state: IState = {
    authoredState: this.setIntialState()
  };
  private domRef: any;

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
          <QuestionAndQuestionWrapper authoredState={authoredState} />
        </div>
      </div>
    );
  }

    private setIntialState(): IAuthoredQuestionWrapper {
        return Object.assign({}, this.props.initialAuthorData);
    }
}
