import * as React from "react";

import * as css from "./window-shade.sass";
import { TypeWindowShadeType } from "../types";
import ContentConfigurations from "../config/content-configurations";

interface IProps {
  type: TypeWindowShadeType;
  tabNameOverride?: string;
  onClick: () => void;
}

interface IState { }

export default class WindowShade extends React.Component<IProps, IState> {

  public render() {
    const { onClick, type, tabNameOverride } = this.props;
    const { Icon, label, styleClassName } = ContentConfigurations(type);
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
