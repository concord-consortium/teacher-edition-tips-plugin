import * as React from "react";
import * as ReactDOM from "react-dom";

import WindowShade from "../window-shade";
import WindowShadeForm from "./window-shade/window-shade-Form";

import QuestionAndQuestionWrapper from "../question-and-question-wrapper";
import QuestionWrapperForm from "./question-wrapper/question-wrapper-form";

import JsonEditor from "./json-editor";

import {
  IAuthoredState, IWindowShade, WindowShadeType,
  IAuthoredQuestionWrapper, TeacherTipType
} from "../../types";

const defaultWindowShadeProps: IWindowShade = {
  windowShadeType: WindowShadeType.TheoryAndBackground,
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
      <div>
        <div>
          {this.renderTypeSelector()}
        </div>
        <div>
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
        <div>
          {
          showWindowShade &&
          <WindowShadeForm
            authoredState={ windowShade || defaultWindowShadeProps }
            onSave={ this.updateWindowShade }
          />
          }
        </div>
        <div>
          {
          showQuestionWrapper &&
          <QuestionWrapperForm
            authoredState={ questionWrapper || defaultQuestionWrapperProps }
            onSave={ this.updateQuestionWRapper }
          />
          }
        </div>
        <div>
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
      <select value={tipType} onChange={this.changeTypeSelection}>
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
    this.setState({authoredState: this.cloneState(newState)}, () => console.log(this.state));
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
