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
        <div className={css.section}>
          <label> Correct Explanation </label>
          <br/>
          <textarea
            value={correctExplanation}
            onChange={this.updateCorrectExplaination}
          />
        </div>

        <div className={css.section}>
          <label> Distractor Explanation </label>
          <br/>
          <textarea
            value={distractorsExplanation}
            onChange={this.updateDistractor}
          />
        </div>

        <div className={css.section}>
          <label> Teacher Tip </label>
          <br/>
          <textarea
            value={teacherTip}
            onChange={this.updateTeacherTip}
          />
        </div>

        <div className={css.section}>
          <label> Teacher Tip Image Overlay</label>
          <br/>
          <input type="text"
            value={teacherTipImageOverlay}
            onChange={this.updateTeacherTipOverlay}
          />
        </div>

        <div className={css.section}>
          <label> Exemplar </label>
          <br/>
          <textarea
            value={exemplar}
            onChange={this.updateExemplar}
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

  private updateDistractor = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    this.setState({distractorsExplanation: newValue}, () => this.sendChangeEvent());
  }

  private updateTeacherTip = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    this.setState({teacherTip: newValue}, () => this.sendChangeEvent());
  }

  private updateExemplar = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    this.setState({exemplar: newValue}, () => this.sendChangeEvent());
  }

  private updateTeacherTipOverlay = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    this.setState({teacherTipImageOverlay: newValue}, () => this.sendChangeEvent());
  }

}
