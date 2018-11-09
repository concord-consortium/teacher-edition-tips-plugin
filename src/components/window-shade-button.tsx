import * as React from "react";

import * as css from "./window-shade.sass";
import { WindowShadeType } from "../types";
import ContentConfigurations from "../config/content-configurations";

interface IProps {
  windowShadeType: WindowShadeType;
  tabNameOverride?: string;
  onClick: () => void;
}

interface IState { }

export default class WindowShade extends React.Component<IProps, IState> {

  public render() {
    const { onClick, windowShadeType, tabNameOverride } = this.props;
    const { Icon, label, styleClassName } = ContentConfigurations(windowShadeType);
    const cssClassNames = [ css.windowShadeToggle, css[styleClassName] ];
    const iconProps = {
      width: "50px",
      fill: "red"
    };
    return (
      <div className={cssClassNames.join(" ")} onClick={onClick}>
        <span>
          <Icon {...iconProps} />
          {tabNameOverride ? tabNameOverride : label}
        </span>
      </div>
    );
  }

}
