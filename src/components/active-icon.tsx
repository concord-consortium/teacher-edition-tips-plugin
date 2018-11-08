import * as React from "react";

// import * as css from "./window-shade.sass";

import { IWindowShadeConfiguration } from "../config/ui-configurations";

interface IProps {
  config: IWindowShadeConfiguration;
}

export default class ActiveIcon extends React.Component<IProps, {}> {

  public render() {
    const { config: {Icon} } = this.props;
    const iconProps = {
      width: "50px",
      fill: "blue"
    };
    return (
      <Icon {...iconProps} />
    );
  }
}
