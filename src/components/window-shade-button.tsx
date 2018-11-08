import * as React from "react";

import * as css from "./window-shade.sass";

import { IWindowShadeConfiguration } from "../config/ui-configurations";
import ActiveIcon from "./active-icon";

import Image from "../icons/image.svg";
import Video from "../icons/video.svg";

interface IProps {
  onClick: () => void;
  mediaType: string;
  config: IWindowShadeConfiguration;
}

interface IState { }

export default class WindowShade extends React.Component<IProps, IState> {

  public render() {
    const { onClick, mediaType, config } = this.props;
    const { label, styleClassName } = config;
    const cssClassNames = [ css.windowShadeToggle, css[styleClassName] ];
    return (
      <div className={cssClassNames.join(" ")} onClick={onClick}>
        <span>
          <ActiveIcon config={config} />
          {label}
          {this.getMediaIcon(mediaType)}
        </span>
      </div>
    );
  }

  private getMediaIcon(mediaType: string) {
    const mediaIconStyle = {
      width: "35px",
      fill: "green"
    };
    switch (mediaType) {
      case "image":
        return <Image {...mediaIconStyle} />;
      case "video":
        return <Video {...mediaIconStyle} />;
      default:
        return "";
    }
  }

}
