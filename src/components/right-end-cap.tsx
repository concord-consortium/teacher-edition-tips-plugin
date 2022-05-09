import * as React from "react";

import css from "./right-end-cap.sass";

import { IWindowShadeConfiguration } from "../config/ui-configurations";

import Image from "../icons/image.svg";
import Video from "../icons/video.svg";

interface IProps {
  config: IWindowShadeConfiguration;
  mediaType: string;
}

export default class RightEndCap extends React.Component<IProps, {}> {

  public render() {
    const { config: {styleClassName}, mediaType } = this.props;
    return (
      <div className={`${css.rightEndCap} ${css[styleClassName]}`}>
        {this.getMediaIcon(mediaType)}
      </div>
    );
  }

  private getMediaIcon(mediaType: string) {
    switch (mediaType) {
      case "image":
        return <Image className={css.mediaIcon} />;
      case "video":
        return <Video className={css.mediaIcon} />;
      default:
        return "";
    }
  }

}
