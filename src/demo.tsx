import * as React from "react";
import * as ReactDOM from "react-dom";
import WindowShade from "./components/window-shade";
import SideBar from "./components/side-bar";

import CheckA from "./icons/check_A.svg";
import CheckB from "./icons/check_B.svg";
import CheckMark from "./icons/check_mark.svg";
import CloseA from "./icons/close_A.svg";
import CloseB from "./icons/close_B.svg";
import DiscussionA from "./icons/discussion_A.svg";
import DiscussionB from "./icons/discussion_B.svg";
import ExclamationA from "./icons/exclamation_A.svg";
import ExclamationB from "./icons/exclamation_B.svg";
import ExclamationSmallA from "./icons/exclamation_small_A.svg";
import ExclamationSmallB from "./icons/exclamation_small_B.svg";
import Image from "./icons/image.svg";
import LightbulbA from "./icons/lightbulb_A.svg";
import LightbulbB from "./icons/lightbulb_B.svg";
import Overlay from "./icons/overlay.svg";
import ShovelA from "./icons/shovel_A.svg";
import ShovelB from "./icons/shovel_B.svg";
import TeacherEditionA from "./icons/teacher_edition_A.svg";
import TeacherEditionB from "./icons/teacher_edition_B.svg";
import Video from "./icons/image.svg";
import XA from "./icons/x_A.svg";
import XB from "./icons/x_B.svg";
import XMark from "./icons/x_mark.svg";
import LightbulbA_NoArtboard from "./icons/lightbulbA_NOartboard.svg";
import LightbulbA_WITHArtboard from "./icons/lightbulbA_WITHartboard.svg";
import LightbulbB_NoArtboard from "./icons/lightbulbA_NOartboard.svg";
import LightbulbB_WITHArtboard from "./icons/lightbulbA_WITHartboard.svg";
import { IWindowShade, WindowShadeType } from "./types";

import DemoMarkdown from "./demo-content-markdown";

const iconSpanStyle = {
  padding: 0,
  margin: 0,
  border: "solid 1px black"
};

const largeIconStyle = {
  width: "50px",
  fill: "purple"
};

const smallIconStyle = {
  width: "30px",
  fill: "purple"
};

const authoredStateA: IWindowShade = {
    windowShadeType: WindowShadeType.TheoryAndBackground,
    content: DemoMarkdown
};

const authoredStateB: IWindowShade = {
    windowShadeType: WindowShadeType.TeacherTip,
    content: DemoMarkdown
};

const authoredStateDVgSection: IWindowShade = {
  windowShadeType: WindowShadeType.TeacherTip,
  content: "",
  tabNameOverride: "SVG Icons"
};

const authoredStateSideBar = {
  content: "Side BarContent"
};

const addSideBarMethod = () => {
  return document.createElement("div");
};

// props = {authoredState: {type: 'dd', content:'xx'} }
ReactDOM.render(
  <div>
    <WindowShade authoredState={authoredStateA} />
    <WindowShade authoredState={authoredStateB} />
    <WindowShade authoredState={authoredStateDVgSection}>
      <div>
        <br />
        <span>Display of all icons:</span>
        <br />
        <br />
        <span style={iconSpanStyle}>
          <CheckA {...smallIconStyle} />
        </span>
        <span style={iconSpanStyle}>
          <CheckB {...smallIconStyle} />
        </span>
        <span style={iconSpanStyle}>
          <CheckMark {...smallIconStyle} />
        </span>
        <span style={iconSpanStyle}>
          <CloseA {...smallIconStyle} />
        </span>
        <span style={iconSpanStyle}>
          <CloseB {...smallIconStyle} />
        </span>
        <span style={iconSpanStyle}>
          <DiscussionA {...largeIconStyle} />
        </span>
        <span style={iconSpanStyle}>
          <DiscussionB {...largeIconStyle} />
        </span>
        <span style={iconSpanStyle}>
          <ExclamationA {...largeIconStyle} />
        </span>
        <span style={iconSpanStyle}>
          <ExclamationB {...largeIconStyle} />
        </span>
        <span style={iconSpanStyle}>
          <ExclamationSmallA {...smallIconStyle} />
        </span>
        <span style={iconSpanStyle}>
          <ExclamationSmallB {...smallIconStyle} />
        </span>
        <span style={iconSpanStyle}>
          <Image {...largeIconStyle} />
        </span>
        <span style={iconSpanStyle}>
          <LightbulbA {...largeIconStyle} />
        </span>
        <span style={iconSpanStyle}>
          <LightbulbB {...largeIconStyle} />
        </span>
        <span style={iconSpanStyle}>
          <Overlay {...largeIconStyle} />
        </span>
        <span style={iconSpanStyle}>
          <ShovelA {...largeIconStyle} />
        </span>
        <span style={iconSpanStyle}>
          <ShovelB {...largeIconStyle} />
        </span>
        <span style={iconSpanStyle}>
          <TeacherEditionA {...largeIconStyle} />
        </span>
        <span style={iconSpanStyle}>
          <TeacherEditionA {...largeIconStyle} />
        </span>
        <span style={iconSpanStyle}>
          <TeacherEditionB {...largeIconStyle} />
        </span>
        <span style={iconSpanStyle}>
          <Video {...largeIconStyle} />
        </span>
        <span style={iconSpanStyle}>
          <XA {...largeIconStyle} />
        </span>
        <span style={iconSpanStyle}>
          <XB {...largeIconStyle} />
        </span>
        <span style={iconSpanStyle}>
          <XMark {...largeIconStyle} />
        </span>
        <br />
        <br />
        <span>Test for M.T.:</span>
        <br />
        <span style={iconSpanStyle}>
          <LightbulbA_NoArtboard {...largeIconStyle} />
        </span>
        <span style={iconSpanStyle}>
          <LightbulbA_WITHArtboard {...largeIconStyle} />
        </span>
        <span style={iconSpanStyle}>
          <LightbulbB_NoArtboard {...largeIconStyle} />
        </span>
        <span style={iconSpanStyle}>
          <LightbulbB_WITHArtboard {...largeIconStyle} />
        </span>
      </div>
    </WindowShade>
    <SideBar
      authoredState={authoredStateSideBar}
      addSideBarMethod={addSideBarMethod}
    />
  </div>,
  document.getElementById("window-shade")
);
