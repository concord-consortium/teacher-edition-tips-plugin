import * as React from "react";

import * as css from "./window-shade.sass";
import { IWindowShade, MediaType } from "../types";
import { WindowShadeConfigurations } from "../config/ui-configurations";
import WindowShadeButton from "./window-shade-button";
import WindowShadeContent from "./window-shade-content";
import { Dot, sidePosition } from "./helpers/dot";
import { TeacherTipType } from "../types";
import {
  logAnalyticsEvent, ILogEvent, AnalyiticsActionType
} from "../utilities/analytics";

interface IProps {
  authoredState: IWindowShade;
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
    const { windowShadeType, tabNameOverride, content, mediaType, mediaURL } =
      this.props.authoredState;
    const config = WindowShadeConfigurations[windowShadeType];
    const cssOpenState = open ? css.windowShadeShown : css.windowShadeHidden;
    const cssShadeType = css[config.styleClassName];
    const label = tabNameOverride !== undefined ? tabNameOverride : config.label;

    return (
      <div className={`${css.windowShade} ${cssShadeType} ${cssOpenState}`} >
        <Dot config={config} side={sidePosition.left} />
        <Dot config={config} side={sidePosition.right} />
        <WindowShadeButton
          config={config}
          buttonLabel={label}
          mediaType={mediaType ? mediaType : MediaType.None}
          onClick={this.toggle}
        />
        <div className={`${css.content} ${cssShadeType}`}>
          <WindowShadeContent content={content} mediaType={mediaType}
            mediaURL={mediaURL} config={config} />
        </div>
      </div>
    );
  }

  public componentDidMount() {
    this.logAction(AnalyiticsActionType.loaded);
  }

  private toggle = () => {
    const nextOpen = !this.state.open;
    const action = nextOpen ? AnalyiticsActionType.tabOpened : AnalyiticsActionType.tabClosed;
    this.setState({open: nextOpen});
    this.logAction(action);
  }

  private logAction = (action: AnalyiticsActionType) => {
    const location = (action === AnalyiticsActionType.loaded)
      ? window.location.toString()
      : undefined;

    logAnalyticsEvent({
      tipType: TeacherTipType.WindowShade,
      eventAction: action,
      tabName: this.props.authoredState.windowShadeType,
      location
    });
  }
}
