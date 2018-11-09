import * as React from "react";
import Markdown from "markdown-to-jsx";

import * as css from "./window-shade.sass";
import { IWindowShade } from "../types";
import ContentConfigurations from "../config/content-configurations";
import WindowShadeButton from "./window-shade-button";

interface IProps {
  authoredState: IWindowShade;
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
    const { windowShadeType, content } = this.props.authoredState;
    const { styleClassName } = ContentConfigurations(windowShadeType);
    const toggle = () => {
      this.setState({open: !open});
    };
    const mainClassName = open ? css.windowShadeContentShow : css.windowShadeContentHide;
    const cssClassNames = [mainClassName, css[styleClassName], css.content];

    return (
      <div className={css.windowShade}>
        <WindowShadeButton {...this.props.authoredState} onClick={toggle}/>
        <div className={cssClassNames.join(" ")}>
          <Markdown className={css.authorMarkdown}>
            {content}
          </Markdown>
          { this.props.children }
        </div>
      </div>
    );
  }

}
