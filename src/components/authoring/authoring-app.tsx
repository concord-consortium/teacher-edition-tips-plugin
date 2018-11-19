import * as React from "react";
import * as ReactDOM from "react-dom";

import * as css from "./authoring-app.sass";
import WindowShade from "../window-shade";
import WindowShadeForm from "./window-shade/window-shade-form";

import QuestionAndQuestionWrapper from "../question-and-question-wrapper";
import QuestionWrapperForm from "./question-wrapper/question-wrapper-form";

import JsonEditor from "./json-editor";

import {
  IAuthoredState, IWindowShade, WindowShadeType,
  IAuthoredQuestionWrapper, TeacherTipType
} from "../../types";

const defaultWindowShadeProps: IWindowShade = {
  windowShadeType: WindowShadeType.TeacherTip,
  content: "## This is something"
};

const defaultQuestionWrapperProps: IAuthoredQuestionWrapper = {
  correctExplanation: "correct",
  distractorsExplanation: "disractor",
  exemplar: "exemplare",
  teacherTip: "teacherTip",
  teacherTipImageOverlay: ""
};

const defaultProps: IAuthoredState = {
  tipType: TeacherTipType.WindowShade,
  questionWrapper: defaultQuestionWrapperProps,
  windowShade: defaultWindowShadeProps
};

interface IProps {
  initialAuthoredState: IAuthoredState;
  updateFunction?: (nextState: IAuthoredQuestionWrapper) => void;
}

interface IState {
  authoredState: IAuthoredState;
}

// Headless container that provides state to children.
export default class AuthoringApp extends React.Component<IProps, IState> {
  public state: IState = {
    authoredState: this.setInitialState()
  };

  public render() {
    const { authoredState } = this.state;
    const { tipType, windowShade, questionWrapper } = authoredState;
    const showWindowShade =  tipType === TeacherTipType.WindowShade;
    const showQuestionWrapper =  tipType === TeacherTipType.QuestionWrapper;
    return (
      <div className={css.container}>
        <div className={css.selector}>
          {this.renderTypeSelector()}
        </div>
        <div className={css.preview}>
          {
            showWindowShade &&
            <WindowShade authoredState={ windowShade || defaultWindowShadeProps } />
          }
          {
            showQuestionWrapper &&
            <QuestionAndQuestionWrapper
              authoredState={ questionWrapper || defaultQuestionWrapperProps }
            />
          }
        </div>
        <div className={css.editor}>
          {
          showWindowShade &&
          <WindowShadeForm
            authoredState={ windowShade || defaultWindowShadeProps }
            onSave={ this.updateWindowShade }
          />
          }
          {
          showQuestionWrapper &&
          <QuestionWrapperForm
            authoredState={ questionWrapper || defaultQuestionWrapperProps }
            onSave={ this.updateQuestionWRapper }
          />
          }
        </div>
        <div className={css.json}>
          <JsonEditor authoredState={authoredState} onSave={this.updateState} />
        </div>
      </div>
    );
  }

  private renderTypeSelector() {
    const {tipType} = this.state.authoredState;
    const options = [
      TeacherTipType.QuestionWrapper,
      TeacherTipType.SideTip,
      TeacherTipType.WindowShade
    ].map( (type) => <option value={type} key={type}>{type} </option>);

    return (
      <select className={css.big} value={tipType} onChange={this.changeTypeSelection}>
        {options}
      </select>
    );
  }
  private changeTypeSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = event.target.value as TeacherTipType;
    this.updateState({tipType: newType});
  }

  private updateWindowShade = (newWindowShade: IWindowShade) => {
    this.updateState({windowShade: newWindowShade} as IAuthoredState);
  }

  private updateQuestionWRapper = (newQuestionWrapper: IAuthoredQuestionWrapper) => {
    this.updateState({questionWrapper: newQuestionWrapper} as IAuthoredState);
  }

  private updateState = (newState: IAuthoredState) => {
    this.setState({authoredState: this.cloneState(newState)}, () => {
      // console.log(this.state)
    });
  }

  private cloneState(newState: IAuthoredState) {
    const prevState = (this.state && this.state.authoredState) || this.props.initialAuthoredState;
    return Object.assign({}, prevState, newState);
  }

  private setInitialState(): IAuthoredState {
      return this.cloneState(this.props.initialAuthoredState);
  }
}

const targetDiv = document.getElementById("window-shade-editor");
ReactDOM.render(<AuthoringApp initialAuthoredState={defaultProps}/>, targetDiv);
