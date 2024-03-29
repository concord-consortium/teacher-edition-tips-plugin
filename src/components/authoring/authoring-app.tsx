import * as React from "react";
import * as ReactDOM from "react-dom";

import css from "./authoring-app.sass";
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
import { ILogEvent } from "../../utilities/analytics";

import { defaultWindowShadeProps, defaultQuestionWrapperProps, defaultSideTipProps } from "./inline-authoring-form";

const markdownHelper = {
  windowShadeType: WindowShadeType.TeacherTip,
  content: markdownHelpContent,
  tabNameOverride: "Help with Markdown"
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
            <WindowShade authoredState={ windowShade || defaultWindowShadeProps }
            logEvent={this.logEventMethod} />
          }
          {
            showQuestionWrapper &&
            <QuestionAndQuestionWrapper
              authoredState={ questionWrapper || defaultQuestionWrapperProps }
              logEvent={this.logEventMethod}
            />
          }
          {
            showSideTip &&
            <SideTip
              authoredState={ sideTip || defaultSideTipProps }
              addSideBarMethod={this.addSideBarMethod}
              logEvent={this.logEventMethod}
            />
          }
          <br/>
        </div>
        <div className={css.authoringFormContainer}>
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
            wrappedEmbeddableContext={null}
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
        <div className={css.json}>
          <JsonEditor authoredState={authoredState} onSave={this.updateState} />
        </div>
        <div className={css.markdownHelper}>
          <WindowShade authoredState={markdownHelper} logEvent={this.logEventMethod} />
        </div>
      </div>
    );
  }

  private logEventMethod = (logData: ILogEvent) => {
    /* eslint-disable no-console */
    console.log(`WindowShade Log Event: ${JSON.stringify(logData)}`);
    /* eslint-enable no-console */
  }

  private addSideBarMethod() {
    return {
      open: () => null,
      close: () => null
    };
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
    this.setState({authoredState: this.cloneState(newState)});
  }

  private cloneState(newState: IAuthoredState) {
    const prevState = (this.state && this.state.authoredState) || this.props.initialAuthoredState;
    return { ...prevState, ...newState};
  }

  private setInitialState(): IAuthoredState {
      return this.cloneState(this.props.initialAuthoredState);
  }
}

const targetDiv = document.getElementById("window-shade-editor");
ReactDOM.render(<AuthoringApp initialAuthoredState={defaultProps}/>, targetDiv);
