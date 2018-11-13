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
        {this.getMediaIcon(mediaType, styleClassName)}
      </div>
    );
  }

  private getMediaIcon(mediaType: string, styleClassName: string) {
    const cssClassName = css.mediaIcon;
    switch (mediaType) {
      case "image":
        return <Image className={`${cssClassName} ${styleClassName}`} />;
      case "video":
        return <Video className={`${cssClassName} ${styleClassName}`} />;
      default:
        return "";
    }
  }

}
