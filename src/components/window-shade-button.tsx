import * as React from "react";

import * as css from "./window-shade-button.sass";
import { WindowShadeType } from "../types";
import { IWindowShadeConfiguration } from "../config/ui-configurations";
import LeftEndCap from "./left-end-cap";
import ButtonTitle from "./button-title";
import RightEndCap from "./right-end-cap";

interface IProps {
  onClick: () => void;
  mediaType: string;
  config: IWindowShadeConfiguration;
}

interface IState { }

// WindowShadeButton's are presentation-only components composed of 3 sub-
// components: a LeftEndCap, a ButtonLabel, and a RightEndCap. This component
// is responsible for aligning the 3 sub-components horizontally, the overall
// size and shape of the button (a rounded rectangle), and the border of the
// button.

export default class WindowShadeButton extends React.Component<IProps, IState> {
  public render() {
    const { onClick, mediaType, config } = this.props;
    const { label, styleClassName } = config;
    const cssClassNames = [ css.windowShadeButton, css[styleClassName] ];
    return (
      <div className={cssClassNames.join(" ")} onClick={onClick}>
        <LeftEndCap config={config} />
        <ButtonTitle title={label} config={config} />
        <RightEndCap mediaType={mediaType} config={config} />
      </div>
    );
  }
}
