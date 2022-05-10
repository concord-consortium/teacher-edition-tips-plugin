import * as React from "react";
import css from "./question-wrapper-form.sass";

import { IAuthoredQuestionWrapper, QuestionWrapperLocation  } from "../../../types";

const QuestionWrapperLocationStrings = {
  [QuestionWrapperLocation.Bottom]: "Bottom",
  [QuestionWrapperLocation.StickyNote]: "Sticky note",
  [QuestionWrapperLocation.Top]: "Top"
};

interface IProps {
  onSave?: (newState: IAuthoredQuestionWrapper) => void;
  authoredState: IAuthoredQuestionWrapper;
  wrappedEmbeddableContext: any;
}

interface IState {
  correctExplanation?: string;
  distractorsExplanation?: string;
  teacherTip?: string;
  teacherTipImageOverlay?: string;
  exemplar?: string;
  location?: QuestionWrapperLocation;
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
      teacherTipImageOverlay, exemplar, location
    } = this.state;

    const _location = location ? location : QuestionWrapperLocation.Bottom;

    const allLocations = [
      QuestionWrapperLocation.Bottom,
      QuestionWrapperLocation.StickyNote,
      QuestionWrapperLocation.Top
    ];

    return (
      <div className={css.container}>
        <div className={css.section}>
          <label> Correct Explanation (Markdown) </label>
          <br/>
          <textarea
            value={correctExplanation}
            onChange={this.updateCorrectExplaination}
          />
        </div>

        <div className={css.section}>
          <label> Distractor Explanation (Markdown) </label>
          <br/>
          <textarea
            value={distractorsExplanation}
            onChange={this.updateDistractor}
          />
        </div>

        <div className={css.section}>
          <label> Teacher Tip (Markdown) </label>
          <br/>
          <textarea
            value={teacherTip}
            onChange={this.updateTeacherTip}
          />
        </div>

        <div className={css.section}>
          <label> Teacher Tip Image Overlay (Markdown) </label>
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

        <div className={css.section}>
          <label> Note location </label>
          <br/>
          <select onChange={this.updateLocation} value={_location}>
            {
              allLocations.map( (key: QuestionWrapperLocation ) => {
                return(
                  <option
                    value={key}
                    key={key}>
                    {QuestionWrapperLocationStrings[key]}
                  </option>
                );
              })
            }
          </select>
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

  private updateLocation = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value as QuestionWrapperLocation;
    this.setState({location: newValue}, () => this.sendChangeEvent());
  }

}
