import * as React from "react";

import * as css from "./right-end-cap.sass";

import { IWindowShadeConfiguration } from "../config/ui-configurations";

import Image from "../icons/image.svg";
import Video from "../icons/video.svg";

interface IProps {
  mediaType: string;
  config: IWindowShadeConfiguration;
}

export default class RightEndCap extends React.Component<IProps, {}> {

  public render() {
    const { mediaType, config: {styleClassName} } = this.props;
    return (
      <div className={`${css.rightEndCap} ${css[styleClassName]}`}>
        {this.getMediaIcon(mediaType)}
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
