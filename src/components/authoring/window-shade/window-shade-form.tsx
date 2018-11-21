import * as React from "react";
import * as css from "./window-shade-form.sass";

import { IWindowShade, WindowShadeType, MediaType } from "../../../types";
import { getContentConfiguration } from "../../../config/ui-configurations";

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
  mediaType: MediaType;
  mediaURL: string;
  content: string;
}

export default class WindowShadeForm extends React.Component<IProps, IState> {
  public state: IState = {
    windowShadeType: this.props.authoredState.windowShadeType,
    content: this.props.authoredState.content,
    mediaType: MediaType.None,
    mediaURL: ""
  };

  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.authoredState !== this.props.authoredState) {
      this.setState({
        windowShadeType: this.props.authoredState.windowShadeType,
        content: this.props.authoredState.content,
        mediaType: this.props.authoredState.mediaType || MediaType.None
      });
    }
  }

  public render() {
    const { windowShadeType, content, mediaType, mediaURL } = this.state;
    const windowShadeTypeOptions = allConfigurationTypes.map( (key: WindowShadeType) => {
      const config = getContentConfiguration(key);
      return(
        <option
          value={key}
          key={key}>
          {config.label}
        </option>
      );
    });

    const mediaTypeOptions = allMediaTypes.map( (key: MediaType ) => {
      return(
        <option
          value={key}
          key={key}>
          {key}
        </option>
      );
    });

    return (
      <div className={css.container}>
        <div>
          <label> Tip Type </label>
          <br/>
          <select onChange={this.updateType} value={windowShadeType}>
            {windowShadeTypeOptions}
          </select>
        </div>
        <div>
          <label> Media Type </label>
          <br/>
          <select onChange={this.updateMediaType} value={mediaType}>
            {mediaTypeOptions}
          </select>
        </div>
        <div>
          <label> Media URL </label>
          <br/>
          <input type="text"
            value={mediaURL}
            onChange={this.updatemediaURL}/>
        </div>
        <div>
          <label> Content (Markdown) </label>
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

  private updateMediaType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value as MediaType;
    this.setState({mediaType: newValue}, () => this.sendChangeEvent());
  }

  private updateType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value as WindowShadeType;
    this.setState({windowShadeType: newValue}, () => this.sendChangeEvent());
  }

  private updateContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    this.setState({content: newValue}, () => this.sendChangeEvent());
  }
  private updatemediaURL = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    this.setState({mediaURL: newValue}, () => this.sendChangeEvent());
  }
}
