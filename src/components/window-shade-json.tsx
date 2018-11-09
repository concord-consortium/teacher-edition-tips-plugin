import * as React from "react";
import * as css from "./window-shade-form.sass";

import { IWindowShade, WindowShadeType, MediaType } from "../types";

interface IProps {
  onSave?: (newState: IWindowShade) => any;
  authoredState: IWindowShade;
}
interface IState {}

export default class WindowShadeJSON extends React.Component<IProps, IState> {

  public render() {
    const {authoredState} = this.props;
    const asString = JSON.stringify(authoredState, null, 2);
    return (
          <textarea
            value={asString}
            onChange={this.updateContent}/>
    );
  }
  private updateContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(event.target.value);
  }

}
