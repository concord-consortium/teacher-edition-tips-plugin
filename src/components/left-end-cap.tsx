import * as React from "react";

import * as css from "./left-end-cap.sass";

import { IWindowShadeConfiguration } from "../config/ui-configurations";

interface IProps {
  config: IWindowShadeConfiguration;
  hover: boolean;
}

export default class LeftEndCap extends React.Component<IProps, {}> {

  public render() {
    const { FrontIcon, RearIcon, styleClassName } = this.props.config;
    const cssShadeType = css[styleClassName];
    const hoverStyle = this.props.hover ?
      css.hover : "";

    return (
      <div className={`${css.leftEndCap} ${cssShadeType}`}>
        <RearIcon className={`${css.icon} ${cssShadeType} ${css.rearIcon} ${hoverStyle}`} />
        <FrontIcon className={`${css.icon} ${cssShadeType} ${css.frontIcon}`} />
      </div>
    );
  }

}
