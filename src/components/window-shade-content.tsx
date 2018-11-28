import * as React from "react";
import Markdown from "markdown-to-jsx";

import * as css from "./window-shade-content.sass";
import { IWindowShadeConfiguration } from "../config/ui-configurations";
import { MediaType, Layout } from "../types";

interface IProps {
  config: IWindowShadeConfiguration;
  content: string;
  content2: string;
  layout: Layout;
  mediaType: MediaType;
  mediaURL: string;
  mediaCaption: string;
}

interface IState {
}

// The content may be rendered in one of three formats: with the media (either
// an image or a video) on the left, with the media centered, or without media.
// If media is present, a caption will be displayed under the media.

export default class WindowShadeContent extends React.Component<IProps, IState> {

  public render() {
    const { config, content, content2, layout, mediaCaption } = this.props;
    const cssClassNames = [
      css.authorMarkdown,
      css[config.styleClassName],
      css.windowShadeContent
    ];

    if (! this.hasMedia()) {
      // If we have no media, we display all the content in one block, while
      // ignoring the layout, and media related stuff.
      return (
        <div className={cssClassNames.join(" ")}>
          <Markdown>
            {content + "\n" + (content2 ? content2 : "")}
          </Markdown>
        </div>
      );
    } else {
      switch (layout) {
        case Layout.MediaLeft: {
          return (
            <div className={css.mediaContainerLeft}>
              <div className={css.mediaWrapper}>
                { this.renderMedia(mediaCaption, css[config.styleClassName]) }
              </div>
              <div className={`${cssClassNames.join(" ")} ${css.leftLayoutContentWrapper}`} >
                <Markdown>
                  {content + "\n" + (content2 ? content2 : "")}
                </Markdown>
              </div>
            </div>
          );
        }
        case Layout.MediaCenter: {
          return (
            <div className={css.mediaContainerRight}>
              <div className={css.centerLayoutContentWrapper} >
                {content + "\n"}
              </div>
              <div className={css.mediaWrapper}>
                { this.renderMedia(mediaCaption, css[config.styleClassName]) }
              </div>
              <div className={css.centerLayoutContentWrapper} >
                {(content2 ? content2 : "") + "\n"}
              </div>
            </div>
          );
        }
        default: {
          // tslint:disable-next-line:no-console
          console.log("Unknown Layout value: layout == " + layout);
          return null;
        }
      }
    }
  }

  private hasMedia() {
    const { mediaType, mediaURL } = this.props;
    return (mediaType && (mediaType !== MediaType.None) &&
      mediaURL && mediaURL.length > 4);
  }

  // Renders the media (either image or video) with a caption underneath.
  private renderMedia(caption: string, className: string) {
    const { mediaType, mediaURL } = this.props;
    if (this.hasMedia()) {
      return(
        <div className={css.mediaContainerLeft}>
          { mediaType === MediaType.Image ?
              <img src={mediaURL} className={className}/>
            :
              <video controls={true}>
                <source src={mediaURL} />
              </video>
          }
          <div className={css.mediaCaption}>
            <Markdown>
              {this.appendNewline(caption)}
            </Markdown>
          </div>
        </div>
      );
    }
  }

  // There is a subtle difference in the behavior of the Markdown react
  // component, depending on if the content contains one or more new-line
  // characters. To make the rendering/spacing behavior consistent, no
  // matter what the author might type in, we simply append an extra
  // new-line to the content.

  private appendNewline(content: string): string {
    return (content + "\n");
  }

}
