import * as React from "react";
import * as ReactDOM from "react-dom";
import WindowShade from "./window-shade";
import QuestionWrapper from "./question-wrapper";
import SideTip from "./side-tip";
import * as PluginAPI from "@concord-consortium/lara-plugin-api";

import { IAuthoredState, ISideTip } from "../types";
import { IPluginRuntimeContext } from "@concord-consortium/lara-plugin-api";
import { ILogEvent, logEvent } from "../utilities/analytics";

interface IProps {
  authoredState: IAuthoredState;
  wrappedEmbeddableDiv: HTMLElement | null;
  wrappedEmbeddableContext: object | null;
  pluginContext: IPluginRuntimeContext;
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

  public logEventMethod = (logData: ILogEvent) => {
    logEvent(this.props.pluginContext, logData);
  }

  public renderWindowShade() {
    const { windowShade } = this.props.authoredState;
    if (!windowShade) {
      return null;
    }
    return (
      <div>
        <WindowShade
          authoredState={windowShade}
          logEvent={this.logEventMethod}
        />
      </div>
    );
  }

  public renderQuestionWrapper() {
    const { wrappedEmbeddableDiv, wrappedEmbeddableContext, authoredState, pluginContext } = this.props;
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
          logEvent={this.logEventMethod}
          sendCustomMessage={pluginContext && pluginContext.wrappedEmbeddable &&
            pluginContext.wrappedEmbeddable.sendCustomMessage
            ? pluginContext.wrappedEmbeddable.sendCustomMessage
            : undefined}
        />
      </div>
    );
  }

  public renderSidebarTip() {
    const { sideTip } = this.props.authoredState;
    const portalDom = document.createElement("div");
    return(
      ReactDOM.createPortal(
        <SideTip
          authoredState={sideTip as ISideTip}
          addSideBarMethod={PluginAPI.addSidebar}
          portalDom={portalDom}
          logEvent={this.logEventMethod}
        />
        ,
        portalDom)
    );
  }

}
