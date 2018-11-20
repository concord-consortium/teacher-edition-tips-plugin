import * as React from "react";

import * as css from "./window-shade.sass";
import { IWindowShade, MediaType } from "../types";
import { WindowShadeConfigurations } from "../config/ui-configurations";
import WindowShadeButton from "./window-shade-button";
import WindowShadeContent from "./window-shade-content";
import { Dot, sidePosition } from "./helpers/dot";

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

  public state: IState = {
    open: false
  };

  public render() {
    const { open } = this.state;
    const { windowShadeType, content, mediaType } = this.props.authoredState;
    const config = WindowShadeConfigurations[windowShadeType];
    const cssOpenState = open ? css.windowShadeShown : css.windowShadeHidden;
    const cssShadeType = css[config.styleClassName];

    return (
      <div className={`${css.windowShade} ${cssShadeType} ${cssOpenState}`} >
        <Dot config={config} side={sidePosition.left} />
        <Dot config={config} side={sidePosition.right} />
        <WindowShadeButton
          config={config}
          mediaType={mediaType ? mediaType : MediaType.None}
          onClick={this.toggle}
        />
        <div className={`${css.content} ${cssShadeType}`}>
          <WindowShadeContent content={content} config={config} />
        </div>
      </div>
    );
  }

  private toggle = () => {
    this.setState({open: !this.state.open});
  }
}
