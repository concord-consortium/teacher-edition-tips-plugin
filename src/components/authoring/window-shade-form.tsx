import * as React from "react";
import * as css from "./window-shade-form.sass";

import { IWindowShade, WindowShadeType, MediaType } from "../../types";
import { getContentConfiguration } from "../../config/ui-configurations";

const allConfigurationTypes = [
  WindowShadeType.TeacherTip,
  WindowShadeType.TheoryAndBackground,
  WindowShadeType.DiscussionPoints,
  WindowShadeType.DiggingDeeper
];

const allMediaTypes = [
  MediaType.None,
  MediaType.Image,
  MediaType.Video
];

interface IProps {
  onSave?: (newState: IWindowShade) => any;
  authoredState: IWindowShade;
}

interface IState {
  windowShadeType: WindowShadeType;
  content: string;
}

export default class WindowShadeForm extends React.Component<IProps, IState> {
  public state: IState = {
    windowShadeType: this.props.authoredState.windowShadeType,
    content: this.props.authoredState.content
  };

  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.authoredState !== this.props.authoredState) {
      this.setState({
        windowShadeType: this.props.authoredState.windowShadeType,
        content: this.props.authoredState.content
      });
    }
  }
  public render() {
    const { windowShadeType, content } = this.state;
    const options = allConfigurationTypes.map( (key: WindowShadeType) => {
      const config = getContentConfiguration(key);
      return(
        <option
          value={key}
          key={key}>
          {config.label}
        </option>
      );
    });

    return (
      <div className={css.container}>
        <div>
          <label> Type </label>
          <br/>
          <select onChange={this.updateType} value={windowShadeType}>
            {options}
          </select>
        </div>
        <div>
          <label> Content </label>
          <br/>
          <textarea
            value={content}
            onChange={this.updateContent}/>
        </div>
        <button onClick={this.sendChangeEvent}> Save </button>
      </div>
    );
  }

  private sendChangeEvent = () => {
    if (this.props.onSave) {
      this.props.onSave(this.state);
    }
  }

  private updateType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value as WindowShadeType;
    this.setState({windowShadeType: newValue}, () => this.sendChangeEvent());
  }

  private updateContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    this.setState({content: newValue}, () => this.sendChangeEvent());
  }

}
