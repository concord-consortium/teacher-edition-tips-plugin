import * as React from "react";

import css from "./left-end-cap.sass";

import { IWindowShadeConfiguration } from "../config/ui-configurations";

interface IProps {
  config: IWindowShadeConfiguration;
  hover: boolean;
}
interface IState {}
export default class LeftEndCap extends React.Component<IProps, IState> {

  public render() {
    const { FrontIcon, RearIcon, styleClassName } = this.props.config;
    const cssShadeType = css[styleClassName];
    const cssHoverStyle = this.props.hover ? css.hover : "";
    return (
      <div className={`${css.leftEndCap} ${cssShadeType}`}>
        <RearIcon className={`${css.icon} ${cssShadeType} ${css.rearIcon} ${cssHoverStyle}`} />
        <FrontIcon className={`${css.icon} ${cssShadeType} ${css.frontIcon}`} />
      </div>
    );
  }

}
