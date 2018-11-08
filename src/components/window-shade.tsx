import * as React from "react";
import Markdown from "markdown-to-jsx";

import * as css from "./window-shade.sass";
import { IAuthoredWindowShade } from "../types";
import ContentConfigurations from "../config/ui-configurations";
import WindowShadeButton from "./window-shade-button";

interface IProps {
  authoredState: IAuthoredWindowShade;
}
interface IState {
  open: boolean;
}

export default class WindowShade extends React.Component<IProps, IState> {

  public state: IState = {
    open: false
  };

  public render() {
    const { open } = this.state;
    const { type, content, mediaType } = this.props.authoredState;
    const config = ContentConfigurations[type];
    const cssClassNames = [
      open ? css.windowShadeContentShow : css.windowShadeContentHide,
      css[config.styleClassName],
      css.content
    ].join(" ");

    const toggle = () => {
      this.setState({open: !open});
    };

    return (
      <div className={css.windowShade}>
        <WindowShadeButton
          onClick={toggle}
          mediaType={mediaType ? mediaType : "none"}
          config={config}
        />
        <div className={cssClassNames}>
          <Markdown className={css.authorMarkdown}>
            {content}
          </Markdown>
        </div>
      </div>
    );
  }

}
