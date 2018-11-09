import * as React from "react";

import * as css from "./window-shade-edit.sass";
import { IWindowShade } from "../types";
import ContentConfigurations from "../config/content-configurations";
import WindowShade from "./window-shade";
import WindowShadeForm from "./window-shade-form";

interface IProps {
  initialProps: IWindowShade;
  updateFunction?: (nextState: IWindowShade) => void;
}

interface IState {
  authoredState: IWindowShade;
}

// Headless container that provides state to children.
export default class WindowShadeEditor extends React.Component<IProps, IState> {
  public state: IState = {
    authoredState: Object.assign({}, this.props.initialProps)
  };

  public update = (nextState: IWindowShade) => {
    const {updateFunction} = this.props;
    this.setState({authoredState: nextState}, () => {
      if (this.props.updateFunction) {
        this.props.updateFunction(nextState);
      }
    });
  }

  public render() {
    const {authoredState} = this.state;
    console.log(authoredState);
    return (
      <div className="editor">
        <div className="preview">
          <WindowShade authoredState={authoredState} />
        </div>
        <div className="form">
          <WindowShadeForm authoredState={authoredState} onSave={this.update} />
        </div>
      </div>
    );
  }

}
