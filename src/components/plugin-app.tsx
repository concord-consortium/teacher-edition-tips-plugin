import * as React from "react";
import * as ReactDOM from "react-dom";
import WindowShade from "./window-shade";
import QuestionWrapper from "./question-wrapper";
import { IAuthoredState } from "../types";

interface IProps {
  PluginAPI: any;
  authoredState: IAuthoredState;
  wrappedEmbeddableDiv?: HTMLDivElement;
  wrappedEmbeddableContext?: object;
}

interface IState {}

interface ISidebarController {
  open: () => void;
  close: () => void;
}

export default class PluginApp extends React.Component<IProps, IState> {
  private sidebarContainer: HTMLElement;
  private sidebarController: ISidebarController;

  constructor(props: IProps) {
    super(props);
    const { type } = this.props.authoredState;
    if (type === "sideTip") {
      this.addSidebar();
    }
  }

  public render() {
    const { type } = this.props.authoredState;
    switch (type) {
      case "questionWrapper": return this.renderQuestionWrapper();
      case "windowShade":
      case "teacherTip":
      case "theoryAndBackground":
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
    return ReactDOM.createPortal(
      <div>TE Sidebar Content</div>,
      this.sidebarContainer
    );
  }

  private addSidebar() {
    const {PluginAPI} = this.props;
    this.sidebarContainer = document.createElement("div");
    // This is important for sidebar UI. Max height enables scrolling of the definitions container.
    // Exact value is inherited from the container provided by LARA.
    this.sidebarContainer.style.maxHeight = "inherit";
    this.sidebarController = PluginAPI.addSidebar({
      handle: "Teacher Help",
      titleBar: "Teacher Edition Help",
      titleBarColor: "#bbb",
      handleColor: "#777",
      width: 450,
      height: 500,
      padding: 20,
      content: this.sidebarContainer
    });
  }
}
