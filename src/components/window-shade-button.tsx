import * as React from "react";

import * as css from "./window-shade-button.sass";
import { IWindowShadeConfiguration } from "../config/ui-configurations";
import LeftEndCap from "./left-end-cap";
import ButtonTitle from "./button-title";
import RightEndCap from "./right-end-cap";

interface IProps {
  config: IWindowShadeConfiguration;
  mediaType: string;
  onClick: () => void;
}

// WindowShadeButton's are presentation-only components composed of 3 sub-
// components: a LeftEndCap, a ButtonLabel, and a RightEndCap. This component
// is responsible for aligning the 3 sub-components horizontally, the overall
// size and shape of the button (a rounded rectangle). Since the LeftEndCap
// component can be used, isolated from a WindowShadeButton, the responsibility
// for rendering the borders are delegated to the there sub-components.

export default class WindowShadeButton extends React.Component<IProps, {}> {
  public render() {
    const { onClick, mediaType, config } = this.props;
    const { label, styleClassName } = config;
    const cssClassNames = [ css.windowShadeButton, css[styleClassName] ];
    return (
      <div className={cssClassNames.join(" ")} onClick={onClick}>
        <LeftEndCap config={config} />
        <ButtonTitle config={config} title={label} />
        <RightEndCap config={config} mediaType={mediaType} />
      </div>
    );
  }
}
