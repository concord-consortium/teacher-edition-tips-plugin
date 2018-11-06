import * as React from "react";

import * as css from "./window-shade.sass";
import { IAuthoredWindowShade } from "../types";

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
    const { content } = this.props.authoredState;

    const toggle = () => {
      this.setState({open: !open});
    };
    return (
      <div className={css.windowShade}>
        <div className={css.windowShadeToggle} onClick={toggle}>
          Theory &amp; Background
        </div>
        <div className={open ? css.windowShadeContentShow : css.windowShadeContentHide }>
          {content}
        </div>
      </div>
    );
  }

}
