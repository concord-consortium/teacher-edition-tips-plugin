import * as React from "react";
import Markdown from "markdown-to-jsx";

import * as css from "./window-shade.sass";
import ContentConfigurations from "../config/content-configurations";
import WindowShadeButton from "./window-shade-button";

interface IProps {
  type: string;
  content?: string;
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
    const { type } = this.props;
    const { icon, label, styleClassName } = ContentConfigurations[type];
    const toggle = () => {
      this.setState({open: !open});
    };
    const mainClassName = open ? css.windowShadeContentShow : css.windowShadeContentHide;
    const cssClassNames = [mainClassName, css[styleClassName], css.content];

    return (
      <div className={css.windowShade}>
        <WindowShadeButton onClick={toggle} type={type} />
        <div className={cssClassNames.join(" ")}>
          <Markdown className={css.authorMarkdown}>
            {this.props.content}
          </Markdown>
        </div>
      </div>
    );
  }

}
