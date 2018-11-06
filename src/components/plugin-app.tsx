import * as React from "react";
import * as ReactDOM from "react-dom";
import WindowShade from "./window-shade";
import QuestionWrapper from "./question-wrapper";

interface IProps {
  PluginAPI: any;
  type: string;
  content?: string;
  label?: string;
  icon?: string;
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
    const { type } = this.props;
    if (type === "sideTip") {
      this.addSidebar();
    }
  }

  public render() {
    const { type } = this.props;
    switch (type) {
      case "windowShade": return this.renderWindowShade();
      case "questionWrapper": return this.renderQuestionWrapper();
      case "sideTip": return this.renderSidebarTip();
    }
  }

  public renderWindowShade() {
    return (
      <div>
        <WindowShade content={this.props.content} />
      </div>
    );
  }

  public renderQuestionWrapper() {
    const { wrappedEmbeddableDiv, wrappedEmbeddableContext } = this.props;
    if (!wrappedEmbeddableDiv || !wrappedEmbeddableContext) {
      // tslint:disable-next-line:no-console
      console.warn("Cannot render question wrapper - missing wrapped question reference");
      return null;
    }
    return (
      <div>
        <QuestionWrapper
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
