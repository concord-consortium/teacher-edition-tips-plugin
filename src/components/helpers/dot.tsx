import * as React from "react";

import * as css from "./dot.sass";
import { IWindowShadeConfiguration } from "../../config/ui-configurations";

export enum sidePosition {
  left,
  right
}

interface IProps {
  config: IWindowShadeConfiguration;
  side: sidePosition;
}

export class Dot extends React.Component<IProps, {}> {
  public render() {
    const { config: {styleClassName}, side } = this.props;
    const cssNames = [
      css.dot,
      side === sidePosition.left ? css.dotLeft : css.dotRight,
      css[styleClassName]
    ].join(" ");
    return (
      <div className={cssNames} />
    );
  }
}
