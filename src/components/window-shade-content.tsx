import * as React from "react";
import Markdown from "markdown-to-jsx";

import * as css from "./window-shade-content.sass";
import { IWindowShadeConfiguration } from "../config/ui-configurations";

interface IProps {
  content: string;
  config: IWindowShadeConfiguration;
}
interface IState {
}

export default class WindowShadeContent extends React.Component<IProps, IState> {

  public render() {
    const { content } = this.props;
//    const cssClassNames = [
//      open ? css.windowShadeContentShow : css.windowShadeContentHide,
//      css[config.styleClassName],
//      css.content
//    ].join(" ");

    return (
      <div>
        <Markdown>
          {content}
        </Markdown>
      </div>
    );
  }

}
