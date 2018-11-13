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
    const { content, config } = this.props;
    const cssClassNames = [
      css[config.styleClassName],
      css.windowShadeContent
    ].join(" ");

    return (
      <div className={cssClassNames}>
        <Markdown>
          {content}
        </Markdown>
      </div>
    );
  }

}
