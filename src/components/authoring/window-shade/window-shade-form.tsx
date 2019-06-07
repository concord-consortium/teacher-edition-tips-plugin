import * as React from "react";
import * as css from "./window-shade-form.sass";

import { IWindowShade, WindowShadeType, MediaType, Layout } from "../../../types";
import { getContentConfiguration } from "../../../config/ui-configurations";

const allConfigurationTypes = [
  WindowShadeType.TeacherTip,
  WindowShadeType.TheoryAndBackground,
  WindowShadeType.DiscussionPoints,
  WindowShadeType.DiggingDeeper,
  WindowShadeType.HowToUse
];

const allMediaTypes = [
  MediaType.None,
  MediaType.Image,
  MediaType.Video
];

const allMediaLayouts = [
  Layout.MediaLeft,
  Layout.MediaCenter
];

interface IProps {
  onSave?: (newState: IWindowShade) => any;
  authoredState: IWindowShade;
}

interface IState {
  windowShadeType: WindowShadeType;
  layout: Layout;
  initialOpenState: boolean;
  mediaType: MediaType;
  mediaURL: string;
  mediaCaption: string;
  content: string;
  content2: string;
}

export default class WindowShadeForm extends React.Component<IProps, IState> {
  public state: IState = {
    windowShadeType: this.props.authoredState.windowShadeType,
    layout: this.props.authoredState.layout || Layout.MediaLeft,
    initialOpenState: false,
    content: this.props.authoredState.content,
    content2: this.props.authoredState.content2 || "",
    mediaType: MediaType.None,
    mediaCaption: this.props.authoredState.mediaCaption || "",
    mediaURL: ""
  };

  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.authoredState !== this.props.authoredState) {
      this.setState({
        windowShadeType: this.props.authoredState.windowShadeType,
        layout: this.props.authoredState.layout || Layout.MediaLeft,
        content: this.props.authoredState.content,
        content2: this.props.authoredState.content2 || "",
        mediaType: this.props.authoredState.mediaType || MediaType.None,
        mediaCaption: this.props.authoredState.mediaCaption || "",
        mediaURL: this.props.authoredState.mediaURL || ""
      });
    }
  }

  public render() {
    const { windowShadeType, content, content2, layout, initialOpenState, mediaType, mediaURL,
      mediaCaption } = this.state;
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
    const layoutTypeOptions = allMediaLayouts.map( (key: Layout ) => {
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
          <label> Layout -- for Media Containers </label>
          <br/>
          <select onChange={this.updateLayout} value={layout}>
            {layoutTypeOptions}
          </select>
        </div>
        <div>
          <label> Window shade starts out open </label>
          <input type="checkbox" onChange={this.updateInitialOpenState} checked={initialOpenState} />
        </div>
        <div>
          <label> Media URL </label>
          <br/>
          <input type="text"
            value={mediaURL}
            onChange={this.updateMediaURL}/>
        </div>
        <div>
          <label> Media Caption (Markdown) </label>
          <br/>
          <textarea
            className={css.caption}
            value={mediaCaption}
            onChange={this.updateMediaCaption}/>
        </div>
        <div>
          <label> Content (Markdown) </label>
          <br/>
          <textarea
            value={content}
            onChange={this.updateContent}/>
        </div>
        <div>
          <label> Content-2 (Markdown) </label>
          <br/>
          <textarea
            value={content2}
            onChange={this.updateContent2}/>
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

  private updateLayout = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value as Layout;
    this.setState({layout: newValue}, () => this.sendChangeEvent());
  }

  private updateInitialOpenState = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    this.setState({initialOpenState: value}, () => this.sendChangeEvent());
  }

  private updateType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value as WindowShadeType;
    this.setState({windowShadeType: newValue}, () => this.sendChangeEvent());
  }

  private updateContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    this.setState({content: newValue}, () => this.sendChangeEvent());
  }

  private updateContent2 = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    this.setState({content2: newValue}, () => this.sendChangeEvent());
  }

  private updateMediaURL = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    this.setState({mediaURL: newValue}, () => this.sendChangeEvent());
  }

  private updateMediaCaption = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    this.setState({mediaCaption: newValue}, () => this.sendChangeEvent());
  }

}
