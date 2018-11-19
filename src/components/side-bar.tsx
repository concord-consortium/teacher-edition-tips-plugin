import * as React from "react";
import Markdown from "markdown-to-jsx";

import * as css from "./side-bar.sass";
import { ISideTip } from "../types";

interface IProps {
  authoredState: ISideTip;
  addSideBarMethod: any;
}
interface IState {}

interface ISidebarController {
  open: () => void;
  close: () => void;
}

export default class SideBar extends React.Component<IProps, IState> {
  public state: IState = {};
  private sidebarContainer: HTMLElement;
  private sidebarController: ISidebarController;

  constructor(props: IProps) {
    super(props);
    this.addSidebar();
  }

  public render() {
    const { content } = this.props.authoredState;
    return (
      <div>
         <Markdown className={css.authorMarkdown}>
            {content}
          </Markdown>
        {this.props.children}
      </div>
    );
  }

  private addSidebar() {
    const {addSideBarMethod} = this.props;
    this.sidebarContainer = document.createElement("div");
    // This is important for sidebar UI. Max height enables scrolling of the definitions container.
    // Exact value is inherited from the container provided by LARA.
    this.sidebarContainer.style.maxHeight = "inherit";
    this.sidebarController = addSideBarMethod({
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
