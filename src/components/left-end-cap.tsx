import * as React from "react";

import * as css from "./left-end-cap.sass";

import { IWindowShadeConfiguration } from "../config/ui-configurations";

interface IProps {
  config: IWindowShadeConfiguration;
}

export default class LeftEndCap extends React.Component<IProps, {}> {

  public render() {
    const { Icon, styleClassName } = this.props.config;
    return (
      <Icon className={`${css.leftEndCap} ${css[styleClassName]}`} />
    );
  }
}
