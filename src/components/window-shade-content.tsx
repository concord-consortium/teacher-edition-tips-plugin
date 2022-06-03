import * as React from "react";
import Markdown from "markdown-to-jsx";

import css from "./window-shade-content.sass";
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
            <div className={css.mediaContainerLeftWrapper}>
              <div className={css.mediaContainerLeftPadding} />
              <div className={css.mediaContainerLeft}>
                <div className={css.mediaWrapper}>
                  { this.renderMedia(layout, mediaCaption, css[config.styleClassName]) }
                </div>
                <div className={`${cssClassNames.join(" ")} ${css.leftLayoutContent}`} >
                  <Markdown>
                    {content + "\n" + (content2 ? content2 : "")}
                  </Markdown>
                </div>
              </div>
            </div>
          );
        }
        case Layout.MediaCenter: {
          return (
            <div className={css.mediaContainerCenter}>
              <div className={`${cssClassNames.join(" ")} ${css.centerLayoutContent}`}>
                <Markdown>
                  {content + "\n"}
                </Markdown>
              </div>
              <div className={css.mediaWrapper}>
                { this.renderMedia(layout, mediaCaption, css[config.styleClassName]) }
              </div>
              <div className={`${cssClassNames.join(" ")} ${css.centerLayoutContent}`}>
                <Markdown>
                  {(content2 ? content2 : "") + "\n"}
                </Markdown>
              </div>
            </div>
          );
        }
        default: {
          console.warn("Unknown Layout value: layout == " + layout);
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
  private renderMedia(layout: Layout, caption: string, className: string) {
    const { mediaType, mediaURL } = this.props;
    if (this.hasMedia()) {
      return(
        <div className={layout === Layout.MediaLeft ? css.mediaContainerLeft : css.mediaContainerCenter}>
          { mediaType === MediaType.Image ?
              <img src={mediaURL} className={className}/>
            :
              <video controls={true} className={className}>
                <source src={mediaURL}/>
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
