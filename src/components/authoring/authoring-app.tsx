import * as React from "react";
import * as ReactDOM from "react-dom";

import * as css from "./authoring-app.sass";
import WindowShade from "../window-shade";
import WindowShadeForm from "./window-shade/window-shade-form";

import QuestionAndQuestionWrapper from "../question-and-question-wrapper";
import QuestionWrapperForm from "./question-wrapper/question-wrapper-form";

import SideTip from "../side-tip";
import SideTipForm from "./side-tip/side-tip-form";

import JsonEditor from "./json-editor";

import markdownHelpContent from "./markdown-help";

import {
  IAuthoredState, IWindowShade, ISideTip, WindowShadeType,
  IAuthoredQuestionWrapper, TeacherTipType
} from "../../types";

const defaultWindowShadeProps: IWindowShade = {
  windowShadeType: WindowShadeType.TeacherTip,
  initialOpenState: true,
  content: "## This is something"
};

/* tslint:disable max-line-length*/
const defaultSideTipProps: ISideTip = {
  content: `Welcome to the **Teacher Edition** of the **GEODE: What will Earth look like in 500 million years?** activity sequence. This interactive guide will help you get acquainted with these activities from a student’s perspective and also provide you with learning theory and learning objectives, additional information on subject matter, classroom discussion points, and tips on achieving learning goals.

  ## Getting Started

  To begin, work through the lesson’s content page by page. The Teacher Edition components — which you can click or tap to open and close — will highlight additional information in several key areas:

  ## Getting Started

  To begin, work through the lesson’s content page by page. The Teacher Edition components — which you can click or tap to open and close — will highlight additional information in several key areas:


  `
};
/* tslint:enable max-line-length*/

const markdownHelper = {
  windowShadeType: WindowShadeType.TeacherTip,
  content: markdownHelpContent,
  tabNameOverride: "Help with Markdown"
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
    const { tipType, windowShade, questionWrapper, sideTip } = authoredState;
    const showWindowShade =  tipType === TeacherTipType.WindowShade;
    const showQuestionWrapper =  tipType === TeacherTipType.QuestionWrapper;
    const showSideTip =  tipType === TeacherTipType.SideTip;
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
          {
            showSideTip &&
            <SideTip
              authoredState={ sideTip || defaultSideTipProps }
              addSideBarMethod={this.addSideBarMethod}
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
          {
          showSideTip &&
          <SideTipForm
            authoredState={ sideTip || defaultSideTipProps }
            onSave={ this.updateSideTip }
          />
          }
        </div>
        <WindowShade authoredState={markdownHelper} />
        <div className={css.json}>
          <JsonEditor authoredState={authoredState} onSave={this.updateState} />
        </div>
      </div>
    );
  }

  private addSideBarMethod() {
    const fakeController = {
      open: () => null,
      close: () => null
    };
    return fakeController;
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

  private updateSideTip = (newSideTip: ISideTip) => {
    this.updateState({sideTip: newSideTip} as IAuthoredState);
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
