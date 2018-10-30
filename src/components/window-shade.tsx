import * as React from "react";

import * as css from "./window-shade.sass";

interface IProps {}
interface IState {}

export default class WindowShade extends React.Component<IProps, IState> {

  public render() {
    return (
      <div className={css.windowShade}>
        Hello World
      </div>
    );
  }
}
