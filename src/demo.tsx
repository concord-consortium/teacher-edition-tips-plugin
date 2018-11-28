import * as React from "react";
import * as ReactDOM from "react-dom";

import WindowShade from "./components/window-shade";
// import SideTip from "./components/side-tip";
import { WindowShadeType, MediaType, Layout } from "./types";
import { DemoMarkdown } from "./demo-content-markdown";

const authoredStateA = {
  windowShadeType: WindowShadeType.TheoryAndBackground,
  content: DemoMarkdown
};

const authoredStateB = {
  windowShadeType: WindowShadeType.TeacherTip,
  content: "This has some initial content.",
  contentPart2: "And, we have some additional content."
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
  content: `
This is a late fall image of the _Milky Way_ galaxy, shot from
my patio in Whitefield, New Hampshire.\n\nJust above the tree-tops, on the
left, there is a little smudge. If you look **very** close, you can just
make it out as a spiral galaxy. This is our nearest galactic neighbor,
Andromeda.

Oh, watch out, it's coming our WAY!!!! Brace for impact in 4,000,000,000 years.
Give or take.

  `,
  mediaType: MediaType.Image,
  layout: Layout.MediaLeft,
  mediaURL: "https://66.media.tumblr.com/c25a40a48a5ddee29c780fda1bc73f60/tumblr_mx0fhueQV31qfwb89o1_1280.jpg",
  mediaCaption: "Love, Dave. \"Milky w/ Andromeda\", November, 2013. " +
    "http://ragnarsrock.dal1025.com/image/68436904594"
};

const authoredStateH = {
  windowShadeType: WindowShadeType.DiggingDeeper,
  content: "Well now, **folks**, here we go! With a video!",
  content2: "Blah blah blah.",
  mediaType: MediaType.Video,
  layout: Layout.MediaCenter,
  mediaURL: "https://www.videvo.net/videvo_files/converted/2014_12/preview/mlky_6.mp453110.webm",
  mediaCaption: "Timelaps of the Milky Way. https://www.videvo.net/video/milky-way-timelapse/2974/"
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
