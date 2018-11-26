import * as React from "react";
import * as ReactDOM from "react-dom";
import WindowShade from "./window-shade";
import QuestionWrapper from "./question-wrapper";
import SideTip from "./side-tip";

import { IAuthoredState, ISideTip } from "../types";

interface IProps {
  PluginAPI: any;
  authoredState: IAuthoredState;
  wrappedEmbeddableDiv?: HTMLDivElement;
  wrappedEmbeddableContext?: object;
}

interface IState {}

export default class PluginApp extends React.Component<IProps, IState> {

  public render() {
    const { tipType } = this.props.authoredState;
    switch (tipType) {
      case "questionWrapper": return this.renderQuestionWrapper();
      case "windowShade":
        return this.renderWindowShade();
      case "sideTip": return this.renderSidebarTip();
    }
    return null;
  }

  public renderWindowShade() {
    const { windowShade } = this.props.authoredState;
    if (!windowShade) {
      return null;
    }
    return (
      <div>
        <WindowShade authoredState={windowShade} />
      </div>
    );
  }

  public renderQuestionWrapper() {
    const { wrappedEmbeddableDiv, wrappedEmbeddableContext, authoredState } = this.props;
    const { questionWrapper } = authoredState;
    if (!wrappedEmbeddableDiv || !wrappedEmbeddableContext) {
      // tslint:disable-next-line:no-console
      console.warn("Cannot render question wrapper - missing wrapped question reference");
      return null;
    }
    return (
      <div>
        <QuestionWrapper
          authoredState={questionWrapper || {}}
          wrappedEmbeddableDiv={wrappedEmbeddableDiv}
          wrappedEmbeddableContext={wrappedEmbeddableContext}
        />
      </div>
    );
  }

  public renderSidebarTip() {
    const { sideTip } = this.props.authoredState;
    const { PluginAPI } = this.props;
    const portalDom = document.createElement("div");
    return(
      ReactDOM.createPortal(
        <SideTip
          authoredState={sideTip as ISideTip}
          addSideBarMethod={PluginAPI.addSidebar}
          portalDom={portalDom}
        />
        ,
        portalDom)
    );
  }

}
