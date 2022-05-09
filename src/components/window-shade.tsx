import * as React from "react";

import css from "./window-shade.sass";
import { IWindowShade, MediaType, Layout, TeacherTipType } from "../types";
import { WindowShadeConfigurations } from "../config/ui-configurations";
import WindowShadeButton from "./window-shade-button";
import WindowShadeContent from "./window-shade-content";
import { Dot, sidePosition } from "./helpers/dot";
import { ILogEvent, AnalyticsActionType } from "../utilities/analytics";

interface IProps {
  authoredState: IWindowShade;
  logEvent: (logData: ILogEvent) => void;
  className?: string;
}

interface IState {
  open: boolean;
}

// WindowShades render across the whole width of the page and are composed
// of a WindowShadeButton and a WindowShadeContent. When a WindowShadeButton
// is clicked, the Boolean state variable "open" is toggled. The value of this
// state variable controls the display state, visible or hidden, of the
// WindowShadeContents.

export default class WindowShade extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    const open = props.authoredState.initialOpenState;
    this.state = {open: open === undefined ? false : open };
  }

  public render() {
    const { open } = this.state;
    const { windowShadeType, tabNameOverride, content, content2, layout,
      mediaType, mediaURL, mediaCaption } = this.props.authoredState;
    const { className } = this.props;

    const config = WindowShadeConfigurations[windowShadeType];
    const cssOpenState = open ? css.windowShadeShown : css.windowShadeHidden;
    const cssShadeType = css[config.styleClassName];
    const additionalClassName = className ? css[className] : "";
    const label = tabNameOverride !== undefined ? tabNameOverride : config.label;

    return (
      <div className={`${css.windowShade} ${cssShadeType} ${cssOpenState} ${additionalClassName}`} >
        <Dot config={config} side={sidePosition.left} />
        <Dot config={config} side={sidePosition.right} />
        <WindowShadeButton
          config={config}
          buttonLabel={label}
          mediaType={mediaType ? mediaType : MediaType.None}
          onClick={this.toggle}
        />
        <div className={`${css.content} ${cssShadeType}`}>
          <WindowShadeContent
            config={config}
            content={content}
            content2={content2 ? content2 : ""}
            layout={layout ? layout : Layout.MediaLeft}
            mediaType={mediaType ? mediaType : MediaType.None}
            mediaURL={mediaURL ? mediaURL : ""}
            mediaCaption={mediaCaption ? mediaCaption : ""}
          />
        </div>
      </div>
    );
  }

  public componentDidMount() {
    this.logAction(AnalyticsActionType.loaded);
  }

  private toggle = () => {
    const action = nextOpen ? AnalyticsActionType.tabOpened : AnalyticsActionType.tabClosed;
    this.setState(prevState => ({open: !prevState.open + 1}));
    this.logAction(action);
  }

  private logAction = (action: AnalyticsActionType) => {
    const location = (action === AnalyticsActionType.loaded)
      ? window.location.toString()
      : undefined;
    this.props.logEvent({
      tipType: TeacherTipType.WindowShade,
      eventAction: action,
      tabName: this.props.authoredState.windowShadeType,
      location
    });
  }
}
