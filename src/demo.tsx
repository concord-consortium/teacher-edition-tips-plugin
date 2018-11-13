import * as React from "react";
import * as ReactDOM from "react-dom";
import WindowShade from "./components/window-shade";

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
import { WindowShadeType, MediaType } from "./types";

/*
 * This plugin provides 5, stylistically and behaviorally related components
 * supporting, at least in this first incarnation, teacher-edition activities.
 * These components implement:
 *
 *  * a Banner,
 *  * the SlideOutLegend,
 *  * a WindowShade,
 *  * an Overlay, and
 *  * a QuestionOverlay.
 *
 * The demo presented in this file provides an easy way to observe the
 * rendering and behavior of these components.
 */

const contentText =
`
Welcome to the **Teacher Edition** of the _**GEODE: What will Earth look like
in 500 million years?**_ activity sequence. This interactive guide will
help you get acquainted with these activities from a student’s perspective
and also provide you with learning theory and learning objectives,
additional information on subject matter, classroom discussion points,
and tips on achieving learning goals.

# Getting Started

To begin, work through the lesson’s content page by page. The Teacher
Edition components — which you can **click** or **tap** to open and close —
will highlight additional information in several key areas:

* **Theory & Background** will provide you with the learning objectives
of the instructional model developed for this sequence of activities.

* **Teacher Tips** are instructional resources and methods that you may
find useful to help your students achieve their learning goals.

* **Discussion Points** highlight questions that may help prompt
classroom discourse with the goal of expanding students’ understanding.

* **Digging Deeper** components provide additional subject matter and
related topics that you may find helpful in furthering your students’
deeper understanding of the content.

This page is the first of a series of model and data-based case studies

---

### Tests of Markdown Syntax

#### 1 Text Styles

The basic, semantic, text markdown stiles area supported:

| Markdown                | Result               |
|:-----------------------:|:--------------------:|
| \`**bold**\`            |  **bold**            |
| \`_italic_\`            |  _italic_            |
| \`_**bold & italic**_\` |  _**bold & italic**_ |
| \` \`typewriter\` \`    | \`typewriter\`       |

#### 2 Bullet Lists

* This is a bullet item.
* And a second bullet item.
  * A nested bullet item.
    * A nested, nested bullet item.
  * A second nested bullet item.
  * A **third** nested bullet item.
* Finally, we finish up with - a third bullet item; and,
* a fourth bullet item.

#### 3 Numbered Lists

These work in a manner very similar to bullet lists, but use a
\`1.\`, instead of a \`*\`, to preface each list item. The \`1\` is
replaced with the correct number without the author having to count
the items.

1. This is a point.
1. This is another point.
  1. And some more stuff.
  1. And more, of course.
1. And the last one.

#### 4 Other Stuff

Other markdown facilities might also be available, but have not been tested.
Things like:

* Block quotes
* Unformated blocks (like "typewriter" but for a block of text)
* Hyphen and equal sign headers
`;

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

const authoredStateA = {
  windowShadeType: WindowShadeType.TheoryAndBackground,
  content: contentText
};

const authoredStateB = {
  windowShadeType: WindowShadeType.TeacherTip,
  content: contentText
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
  content: contentText,
  mediaType: MediaType.Image
};

const authoredStateF = {
  windowShadeType: WindowShadeType.TeacherTip,
  content: contentText,
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

// props = {authoredState: {type: 'dd', content:'xx'} }
ReactDOM.render(
  <div>
    <WindowShade authoredState={authoredStateA} />
    <WindowShade authoredState={authoredStateB} />
    <WindowShade authoredState={authoredStateC} />
    <WindowShade authoredState={authoredStateD} />
    <WindowShade authoredState={authoredStateE} />
    <WindowShade authoredState={authoredStateF} />
    <WindowShade authoredState={authoredStateG} />
    <WindowShade authoredState={authoredStateH} />
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
  </div>,
  document.getElementById("window-shade")
);
