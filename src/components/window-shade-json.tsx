import * as React from "react";
import * as css from "./window-shade-form.sass";

import { IWindowShade, WindowShadeType, MediaType } from "../types";

interface IProps {
  onSave?: (newState: IWindowShade) => any;
  validate?: (jsObject: object) => { valid: boolean; error: string; };
  authoredState: IWindowShade;
}
interface IState {
  workingState: string;
}
export default class WindowShadeJSON extends React.Component<IProps, IState> {
  public state: IState = {
    workingState: this.getAuthoredJson()
  };

  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.authoredState !== this.props.authoredState) {
      this.setState({workingState: this.getAuthoredJson() });
    }
  }
  public render() {
    const {workingState} = this.state;
    return (
          <textarea
            value={workingState}
            onChange={this.updateContent}
            onBlur={this.updateContent}/>
    );
  }
  private updateContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    this.setState({workingState: newValue}, () => {
      if (this.props.onSave) {
        try{
          const newProps = JSON.parse(newValue);
          this.props.onSave(newProps);
        }
        catch (error) {
          console.log(error);
          this.setState({workingState: this.getAuthoredJson()});
        }
      }
    });
  }
  private getAuthoredJson() {
    const {authoredState} = this.props;
    return JSON.stringify(authoredState, null, 2);
  }
}
