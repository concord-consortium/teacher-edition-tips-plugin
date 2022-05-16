import * as React from "react";
import css from "./side-tip-form.sass";

import { ISideTip, MediaType } from "../../../types";

const allMediaTypes = [
  MediaType.None,
  MediaType.Image,
  MediaType.Video
];

interface IProps {
  onSave?: (newState: ISideTip) => any;
  authoredState: ISideTip;
  hideSaveButton?: boolean;
}

interface IState {
  mediaType: MediaType;
  mediaURL: string;
  content: string;
}

export default class SideTipForm extends React.Component<IProps, IState> {
  public state: IState = {
    content: this.props.authoredState.content,
    mediaType: MediaType.None,
    mediaURL: ""
  };

  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.authoredState !== this.props.authoredState) {
      this.setState({
        content: this.props.authoredState.content,
        mediaType: this.props.authoredState.mediaType || MediaType.None
      });
    }
  }

  public render() {
    const { content, mediaType, mediaURL } = this.state;
    const { hideSaveButton } = this.props;

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
        <div className={css.section}>
          <label> Media Type </label>
          <br/>
          <select onChange={this.updateMediaType} value={mediaType}>
            {mediaTypeOptions}
          </select>
        </div>
        <div className={css.section}>
          <label> Media URL </label>
          <br/>
          <input type="text"
            value={mediaURL}
            onChange={this.updatemediaURL}/>
        </div>
        <div className={css.section}>
          <label> Content (Markdown) </label>
          <br/>
          <textarea
            value={content}
            onChange={this.updateContent}/>
        </div>
        { !hideSaveButton &&
          <button onClick={this.sendChangeEvent}> Save </button>
        }
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

  private updateContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    this.setState({content: newValue}, () => this.sendChangeEvent());
  }
  private updatemediaURL = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    this.setState({mediaURL: newValue}, () => this.sendChangeEvent());
  }
}
