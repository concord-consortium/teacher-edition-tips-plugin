import * as React from "react";

import * as css from "./window-shade-button.sass";
import { IWindowShadeConfiguration } from "../config/ui-configurations";
import LeftEndCap from "./left-end-cap";
import ButtonTitle from "./button-title";
import RightEndCap from "./right-end-cap";

interface IProps {
  config: IWindowShadeConfiguration;
  mediaType: string;
  buttonLabel: string;
  onClick: () => void;
}

interface IState {
  hovering: boolean;
}

// WindowShadeButton's are components composed of 3 sub-components: a LeftEndCap,
// a ButtonLabel, and a RightEndCap. This component is responsible for aligning
// the 3 sub-components horizontally, the overall size and shape of the button
// (a rounded rectangle). Since the LeftEndCap component can be used, isolated
// from a WindowShadeButton, the responsibility for rendering the borders are
// delegated to the there sub-components.
//
// The "hovering" state is used to propagate the UI's mouse-hover event to the
// LeftEndCap so the icon can "light up".

export default class WindowShadeButton extends React.Component<IProps, IState> {

  public state: IState = {
    hovering: false
  };

  public render() {
    const { onClick, mediaType, config, buttonLabel } = this.props;
    const { styleClassName } = config;
    const cssClassNames = [ css.windowShadeButton, css[styleClassName] ];
    return (
      <div className={cssClassNames.join(" ")} onClick={onClick}
        onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
        <LeftEndCap config={config} hover={this.state.hovering} />
        <ButtonTitle config={config} title={buttonLabel} />
        <RightEndCap config={config} mediaType={mediaType} />
      </div>
    );
  }

  private mouseEnter = () => {
    this.setState({hovering: true});
  }

  private mouseLeave = () =>  {
    this.setState({hovering: false});
  }

}
