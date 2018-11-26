import * as React from "react";
import sideBarIcon from "../side-bar-icon";
import Markdown from "markdown-to-jsx";
import TeacherTip from "../icons/teacher_edition_A.svg";
import * as css from "./side-tip.sass";
import { ISideTip } from "../types";

interface IProps {
  authoredState: ISideTip;
  addSideBarMethod: any;
  portalDom: HTMLElement;
}
interface IState {}

interface ISidebarController {
  open: () => void;
  close: () => void;
}

export default class SideTip extends React.Component<IProps, IState> {
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
      <div className={css.sideBar}>
        <div className={css.text}>
          <Markdown>
            {content}
          </Markdown>
        </div>
        {this.props.children}
      </div>
    );
  }

  private addSidebar() {
    const {addSideBarMethod, portalDom} = this.props;
    // This is important for sidebar UI. Max height enables scrolling of the definitions container.
    // Exact value is inherited from the container provided by LARA.
    // icon?: string | HTMLElement;
    portalDom.style.maxHeight = "inherit";
    this.sidebarController = addSideBarMethod({
      handle: "",
      titleBar: "Teacher Edition Help",
      icon: sideBarIcon,
      titleBarColor: "#FDA61C",
      handleColor: "#DC8008",
      width: 450,
      height: 500,
      padding: 0,
      content: portalDom
    });
  }
}
