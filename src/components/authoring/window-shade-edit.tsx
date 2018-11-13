import * as React from "react";

import * as css from "./window-shade-edit.sass";
import { IWindowShade } from "../../types";
import ContentConfigurations from "../../config/ui-configurations";
import WindowShade from "../window-shade";
import WindowShadeForm from "./window-shade-form";
import WindowShadeJson from "./window-shade-json";

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
    return (
      <div className={css.editor}>
        <div className={css.preview}>
          <WindowShade authoredState={authoredState} />
        </div>
        <div className={css.form}>
          <WindowShadeForm authoredState={authoredState} onSave={this.update} />
        </div>
        <div className={css.json}>
          <WindowShadeJson authoredState={authoredState} onSave={this.update} />
        </div>
      </div>
    );
  }

}
