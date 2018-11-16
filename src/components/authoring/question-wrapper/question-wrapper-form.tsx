import * as React from "react";
import * as css from "./window-shade-form.sass";

import {
  IAuthoredState,
  IWindowShade,
  WindowShadeType, MediaType
} from "../../../types";
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
  authoredState: IAuthoredState;
}

interface IState {
  windowShadeType: WindowShadeType;
  content: string;
  mediaType?: MediaType;
  mediaURL?: string;
}

export default class WindowShadeForm extends React.Component<IProps, IState> {
  public state: IState = this.windowShadeProps(this.props);

  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.authoredState !== this.props.authoredState) {
      this.updateStateFromProps(this.props);
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
      const nextState = Object.assign({}, this.props.authoredState, this.state);
      this.props.onSave(nextState);
    }
  }

  private windowShadeProps(theProps: IProps) {
    const { windowShade } = theProps.authoredState;
    const defaultProps = {
      windowShadeType: WindowShadeType.TeacherTip,
      content: "",
      mediaURL: "",
      mediaType: MediaType.None
    };
    return windowShade || defaultProps;
  }

  private updateStateFromProps(theProps: IProps) {
    this.setState(this.windowShadeProps(theProps));
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
