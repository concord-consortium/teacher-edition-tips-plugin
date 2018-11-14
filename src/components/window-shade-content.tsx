import * as React from "react";
import Markdown from "markdown-to-jsx";

import * as css from "./window-shade-content.sass";
import { IWindowShadeConfiguration } from "../config/ui-configurations";
import { MediaType } from "../types"

interface IProps {
  content: string;
  mediaType?: MediaType;
  mediaURL?: string;
  config: IWindowShadeConfiguration;
}
interface IState {
}

export default class WindowShadeContent extends React.Component<IProps, IState> {

  public render() {
    const { content, config } = this.props;
    const cssClassNames = [
      css.authorMarkdown,
      css[config.styleClassName],
      css.windowShadeContent
    ];
    if (this.hasMedia()) {
      cssClassNames.push(css.twoColumns);
    }

    return (
      <div className={cssClassNames.join(" ")}>
        { this.renderMedia() }
        <Markdown>
          {content}
        </Markdown>
      </div>
    );
  }
  private hasMedia() {
    const { mediaType, mediaURL } = this.props;
    return (mediaType && (mediaType !== MediaType.None) && mediaURL && mediaURL.length > 4);
  }
  private renderMedia() {
    const { mediaURL } = this.props;
    if (this.hasMedia) {
      return <img src={mediaURL} />;
    }
  }

}
