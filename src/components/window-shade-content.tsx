import * as React from "react";
import Markdown from "markdown-to-jsx";

import * as css from "./window-shade-content.sass";
import { IWindowShadeConfiguration } from "../config/ui-configurations";
import { MediaType } from "../types";

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
          {this.appendNewline(content)}
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
    if (this.hasMedia()) {
      return <img src={mediaURL} />;
    }
  }

  // There is a subtle difference in the behavior of the Markdown react
  // component, depending on if the content contains one or more new-line
  // characters. To make the rendering/spacing behavior consistent, no
  // matter what the author might type in, we simply append an extra
  // new-line to the content.

  private appendNewline(content: string): string {
    return (content + "\n")
  }

}
