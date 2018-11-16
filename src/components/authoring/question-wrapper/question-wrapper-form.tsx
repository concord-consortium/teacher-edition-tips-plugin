import * as React from "react";
import * as css from "./question-wrapper-form.sass";

import { IAuthoredQuestionWrapper  } from "../../../types";
import { getContentConfiguration } from "../../../config/ui-configurations";

interface IProps {
  onSave?: (newState: IAuthoredQuestionWrapper) => void;
  authoredState: IAuthoredQuestionWrapper;
}

interface IState {
  correctExplanation?: string;
  distractorsExplanation?: string;
  teacherTip?: string;
  teacherTipImageOverlay?: string;
  exemplar?: string;
}

export default class QuestionWRapperForm extends React.Component<IProps, IState> {
  public state: IState = {...this.props.authoredState};

  public componentDidUpdate(prevProps: IProps) {
    const {authoredState} = this.props;
    if (prevProps.authoredState !== this.props.authoredState) {
      this.setState({...authoredState});
    }
  }

  public render() {
    const {
      correctExplanation, distractorsExplanation,  teacherTip,
      teacherTipImageOverlay, exemplar
    } = this.state;

    return (
      <div className={css.container}>
        <div>
          <label> Correct correctExplanation </label>
          <br/>
          <textarea
            value={correctExplanation}
            onChange={this.updateCorrectExplaination}
          />
        </div>
      </div>
    );
  }

  private sendChangeEvent = () => {
    if (this.props.onSave) {
      this.props.onSave(this.state);
    }
  }

  private updateCorrectExplaination = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    this.setState({correctExplanation: newValue}, () => this.sendChangeEvent());
  }
}
