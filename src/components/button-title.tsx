import * as React from "react";

import css from "./button-title.sass";

import { IWindowShadeConfiguration } from "../config/ui-configurations";

interface IProps {
  title: string;
  config: IWindowShadeConfiguration;
}

export default class ButtonTitle extends React.Component<IProps, {}> {

  public render() {
    const styleClassName = this.props.config.styleClassName;
    return (
      <div className={`${css.buttonTitle} ${css[styleClassName]}`}>
        {this.props.title}
      </div>
    );
  }

}
