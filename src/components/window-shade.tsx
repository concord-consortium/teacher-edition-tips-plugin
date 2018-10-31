import * as React from "react";

import * as css from "./window-shade.sass";

interface IWindowShadeType {
  label: string;
  icon: string;
}

interface IProps {
  label?: string;
  icon?: string;
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
    const toggle = () => {
      this.setState({open: !open});
    };
    return (
      <div className={css.windowShade}>
        <div className={css.windowShadeToggle} onClick={toggle}>
          Theory &amp; Background
        </div>
        <div className={open ? css.windowShadeContentShow : css.windowShadeContentHide }>
          {this.props.content}
        </div>
      </div>
    );
  }

}
