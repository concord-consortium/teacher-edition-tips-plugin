import * as React from "react";

import css from "./authoring-app.sass";
import WindowShade from "../window-shade";
import WindowShadeForm from "./window-shade/window-shade-form";

import QuestionWrapper from "../question-wrapper";
import QuestionWrapperForm from "./question-wrapper/question-wrapper-form";

import SideTip from "../side-tip";
import SideTipForm from "./side-tip/side-tip-form";

import {
  IAuthoredState, IWindowShade, ISideTip, IAuthoredQuestionWrapper, TeacherTipType,
  WindowShadeType, QuestionWrapperLocation
} from "../../types";
import { ILogEvent } from "../../utilities/analytics";
import { getFormButtonsConfiguration } from "../../config/ui-configurations";

export const defaultWindowShadeProps: IWindowShade = {
  windowShadeType: WindowShadeType.TheoryAndBackground,
  initialOpenState: true,
  content: "This is something",
  mediaCaption: "Last, First. \"Title of Work.\" Year created. Site Title " +
    "[OR] Publisher. Gallery [OR] Location. http://www.url.com."
};

export const defaultSideTipProps: ISideTip = {
  content: `Welcome to the **Teacher Edition** of the **GEODE: What will Earth look like in 500 million years?** activity sequence. This interactive guide will help you get acquainted with these activities from a student’s perspective and also provide you with learning theory and learning objectives, additional information on subject matter, classroom discussion points, and tips on achieving learning goals.

  ## Getting Started

  To begin, work through the lesson’s content page by page. The Teacher Edition components — which you can click or tap to open and close — will highlight additional information in several key areas:

  ## Getting Started

  To begin, work through the lesson’s content page by page. The Teacher Edition components — which you can click or tap to open and close — will highlight additional information in several key areas:


  `
};
/* tslint:enable max-line-length*/

export const defaultQuestionWrapperProps: IAuthoredQuestionWrapper = {
  correctExplanation: "",
  distractorsExplanation: "",
  exemplar: "",
  teacherTip: "",
  teacherTipImageOverlay: "",
  location: QuestionWrapperLocation.Bottom
};

interface IProps {
  initialAuthoredState: IAuthoredState;
  saveAuthoredPluginState: (json: string) => void;
  closeAuthoredPluginForm?: () => void;
  wrappedEmbeddableDiv?: HTMLElement | null;
  wrappedEmbeddableContext?: object | null;
}

interface IState {
  authoredState: IAuthoredState;
}

export default class InlineAuthoringForm extends React.Component<IProps, IState> {
  public state: IState = {
    authoredState: this.setInitialState()
  };

  public render() {
    const { authoredState } = this.state;
    const { tipType, windowShade, questionWrapper, sideTip } = authoredState;
    const { wrappedEmbeddableDiv, wrappedEmbeddableContext } = this.props;
    const showWindowShade =  tipType === TeacherTipType.WindowShade;
    const showQuestionWrapper =  tipType === TeacherTipType.QuestionWrapper;
    const showSideTip =  tipType === TeacherTipType.SideTip;
    const cancelButtonConfig = getFormButtonsConfiguration("cancelButton");
    const saveButtonConfig = getFormButtonsConfiguration("saveButton");
    return (
      <div className={css.inlineAuthoringContainer}>
        <div className={css.preview}>
          {
            showWindowShade &&
            <WindowShade authoredState={ windowShade || defaultWindowShadeProps }
            logEvent={this.logEventMethod} className="inlineAuthoring" />
          }
          {
            showQuestionWrapper && wrappedEmbeddableDiv &&
            <QuestionWrapper
              authoredState={ questionWrapper || defaultQuestionWrapperProps }
              wrappedEmbeddableDiv={wrappedEmbeddableDiv}
              wrappedEmbeddableContext={wrappedEmbeddableContext}
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
            hideSaveButton={ true }
          />
          }
          {
          showQuestionWrapper &&
          <QuestionWrapperForm
            authoredState={ questionWrapper || defaultQuestionWrapperProps }
            wrappedEmbeddableContext={wrappedEmbeddableContext}
            onSave={ this.updateQuestionWRapper }
          />
          }
          {
          showSideTip &&
          <SideTipForm
            authoredState={ sideTip || defaultSideTipProps }
            onSave={ this.updateSideTip }
            hideSaveButton={ true }
          />
          }
        </div>
        <div className={css.inlineFormButtons + " submit-container"}>
          <button onClick={this.closeForm} className={css.inlineFormButton}>
            <cancelButtonConfig.Icon className={css.svgIcon} />
            <span className={css.lineAdjust}>
              Cancel
            </span>
          </button>
          <button onClick={this.saveAuthoredState} className={css.inlineFormButton}>
            <saveButtonConfig.Icon className={css.svgIcon} />
            <span className={css.lineAdjust}>
              Save
            </span>
          </button>
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

  private saveAuthoredState = () => {
    this.props.saveAuthoredPluginState(JSON.stringify(this.state.authoredState));
  }

  private closeForm = () => {
    if (this.props.closeAuthoredPluginForm) {
      this.props.closeAuthoredPluginForm();
    }
  }
}
