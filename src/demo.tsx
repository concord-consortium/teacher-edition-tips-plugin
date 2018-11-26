import * as React from "react";
import * as ReactDOM from "react-dom";

import WindowShade from "./components/window-shade";
// import SideTip from "./components/side-tip";
import { WindowShadeType, MediaType } from "./types";
import { DemoMarkdown } from "./demo-content-markdown";

const authoredStateA = {
  windowShadeType: WindowShadeType.TheoryAndBackground,
  content: DemoMarkdown
};

const authoredStateB = {
  windowShadeType: WindowShadeType.TeacherTip,
  content: DemoMarkdown
};

const authoredStateC = {
  windowShadeType: WindowShadeType.DiscussionPoints,
  content: "Well now, folks, here we go! With an image!"
};

const authoredStateD = {
  windowShadeType: WindowShadeType.DiggingDeeper,
  content: "Well now, folks, here we go! With a video!"
};

const authoredStateE = {
  windowShadeType: WindowShadeType.TheoryAndBackground,
  content: DemoMarkdown,
  mediaType: MediaType.Image
};

const authoredStateF = {
  windowShadeType: WindowShadeType.TeacherTip,
  content: DemoMarkdown,
  mediaType: MediaType.Video
};

const authoredStateG = {
  windowShadeType: WindowShadeType.DiscussionPoints,
  content: "Well now, folks, here we go!\n\n# With an image!",
  mediaType: MediaType.Image
};

const authoredStateH = {
  windowShadeType: WindowShadeType.DiggingDeeper,
  content: "Well now, **folks**, here we go! With a video!",
  mediaType: MediaType.Video
};

const windowShadeContainerDivStyle = {
  marginTop: "23px",
  marginBottom: "73px"
};

ReactDOM.render(
  <div>
    <div style={windowShadeContainerDivStyle}>
      <WindowShade authoredState={authoredStateA} />
    </div>
    <div style={windowShadeContainerDivStyle}>
      <WindowShade authoredState={authoredStateB} />
    </div>
    <div style={windowShadeContainerDivStyle}>
      <WindowShade authoredState={authoredStateC} />
    </div>
    <div style={windowShadeContainerDivStyle}>
      <WindowShade authoredState={authoredStateD} />
    </div>
    <div style={windowShadeContainerDivStyle}>
      <WindowShade authoredState={authoredStateE} />
    </div>
    <div style={windowShadeContainerDivStyle}>
      <WindowShade authoredState={authoredStateF} />
    </div>
    <div style={windowShadeContainerDivStyle}>
      <WindowShade authoredState={authoredStateG} />
    </div>
    <div style={windowShadeContainerDivStyle}>
      <WindowShade authoredState={authoredStateH} />
    </div>
  </div>,
  document.getElementById("window-shade")
);
