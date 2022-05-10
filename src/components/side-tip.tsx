import * as React from "react";
import sideBarIcon from "../side-bar-icon";
import * as Markdown from "markdown-to-jsx";
import css from "./side-tip.sass";
import { ISideTip, TeacherTipType } from "../types";
import * as PluginAPI from "@concord-consortium/lara-plugin-api";
import {
  ILogEvent, AnalyticsActionType
} from "../utilities/analytics";

interface IProps {
  authoredState: ISideTip;
  addSideBarMethod: (options: PluginAPI.ISidebarOptions) => PluginAPI.ISidebarController;
  portalDom?: HTMLElement;
  logEvent: (logData: ILogEvent) => void;
}
interface IState {}

export default class SideTip extends React.Component<IProps, IState> {
  public state: IState = {};
  private sidebarController: PluginAPI.ISidebarController;

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
    const { addSideBarMethod, portalDom } = this.props;
    if (portalDom) {
      // This is important for sidebar UI. Max height enables scrolling of the definitions container.
      // Exact value is inherited from the container provided by LARA.
      // icon?: string | HTMLElement;
      portalDom.style.maxHeight = "inherit";
      this.sidebarController = addSideBarMethod({
        handle: "",
        titleBar: "Teacher Edition",
        icon: sideBarIcon,
        titleBarColor: "#FDA61C",
        handleColor: "#DC8008",
        width: 450,
        padding: 0,
        content: portalDom,
        onOpen: this.onOpen,
        onClose: this.onClose
      });
    }
    this.logAction(AnalyticsActionType.loaded);
  }

  private onOpen = () => {
    this.logAction(AnalyticsActionType.tabOpened);
  }

  private onClose = () => {
    this.logAction(AnalyticsActionType.tabClosed);
  }

  private logAction = (action: AnalyticsActionType) => {
    const location = (action === AnalyticsActionType.loaded)
      ? window.location.toString()
      : undefined;
    this.props.logEvent({
      tipType: TeacherTipType.SideTip,
      eventAction: action,
      tabName: "SideTip",
      location
    });
  }
}
