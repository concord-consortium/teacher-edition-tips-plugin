import * as React from "react";
import * as ReactDOM from "react-dom";

import WindowShade from "./components/window-shade";
import { WindowShadeType, MediaType, Layout } from "./types";
import { DemoMarkdown } from "./demo-content-markdown";
import { ILogEvent } from "./utilities/analytics";

const authoredStateA = {
  windowShadeType: WindowShadeType.TheoryAndBackground,
  content: DemoMarkdown
};

const authoredStateB = {
  windowShadeType: WindowShadeType.TeacherTip,
  content: "This has some initial content (`content`)",
  content2: "And, we have some additional content (`content2`)."
};

const authoredStateC = {
  windowShadeType: WindowShadeType.DiscussionPoints,
  content: `
## Examples of Numbered Lists

### Single Spaced

  1. This is the first item.
  1. This is the second.
  1. And, finally, a third one!

### Double Spaced

1. This is the first item.

1. This is the second.

1. And, finally, a third one!
`
};

const authoredStateD = {
  windowShadeType: WindowShadeType.DiggingDeeper,
  content: `
## Examples of Bullet Lists

### Single Spaced

* This is the first item.
* This is the second.
* And, finally, a third one!

### Double Spaced

* This is the first item.

* This is the second.

* And, finally, a third one!
`
};

const authoredStateE = {
  windowShadeType: WindowShadeType.TheoryAndBackground,
  content: `
### Image Data

**Nikon D600 w/ ISO 800, 1120mm, f/11 @ 1/250**  
**TC-14B, PK-11A, TC-301 and Nikkor 400mm f/3.5**  

### Image Description

This image was captured, in late April 2013, when the moon was in the waxing
gibbous phase.  On this night, it was about 4 days before the full moon.  This
is my favorite time to moon gaze as the oblique lighting reveals captivating
crater textures along the terminator.

This was shot from my deck which required a fast shutter to eliminate the
camera shake.  I used a remote shutter release to help reduce any mirror
vibration.

The weather was mixed with bands of clouds and a bit of mist.  In between the
bands there were moments of relative clear.  I waited for a break and was
lucky enough to get one.
`,

  content2: `
### Challenges

For this image I doubled up my teleconverters with a 400mm prime.  The
resulting focal length is about 1120mm.  Using a full-frame camera, this setup
fills about half the frame with the moon.

Unlike terrestrial images, this situation pushes the very limits of any lens.
A super-sharp, high contrast edge – that is, the right side of the moon which
is pure white next to the pure black of space – tends to reveal chromatic
aberrations.  By converting the image to B&W I was able to effectively hide
these artifacts.

The biggest challenge to getting a good lunar image is managing the dynamic
range of the subject.  In the end, the photographer chooses where to use
the camera’s limited dynamic range to best effect.  For this image I chose to
emphasize the area around the terminator at the expense of the rest of the
moon’s detail.
`,
  mediaType: MediaType.Image,
  layout: Layout.MediaCenter,
  mediaURL: "https://66.media.tumblr.com/61d3e6fcde6f0a79c0ac0257c8cfef1b/tumblr_mll78qOHRo1qfwb89o2_r1_1280.jpg",
  mediaCaption: `Love, Dave. "Luna Minus 4". 2013. [Ragnar's Rock](http://ragnarsrock.dal1025.com/LunaMinu_details)`
};

const authoredStateF = {
  windowShadeType: WindowShadeType.HowToUse,
  content: `
This is an example of a video window shade using the "mediaLeft" layout.
`,
  layout: Layout.MediaLeft,
  mediaType: MediaType.Video,
  mediaURL: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
  mediaCaption: "A CC0 video of a flower opening"
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
  content2: `
- - -

Here is some **\`content2\`**  
text.  This bit of text has  
forced line-breaks.  
`,
  // tslint:enable:no-trailing-whitespace
  mediaType: MediaType.Image,
  layout: Layout.MediaLeft,
  mediaURL: "https://66.media.tumblr.com/c25a40a48a5ddee29c780fda1bc73f60/tumblr_mx0fhueQV31qfwb89o1_1280.jpg",
  mediaCaption: "Love, Dave. \"Milky Way w/ Andromeda\", November, 2013. " +
    "http://ragnarsrock.dal1025.com/image/68436904594"
};

const authoredStateH = {
  windowShadeType: WindowShadeType.DiggingDeeper,
  content2: `
You just gotta love a **time-lapse** view of the night sky!

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et
dolore magnam aliquam quaerat voluptatem.
`,

  content: `
## A Poem

There once was a writer from Nantucket,
Who wanted some prose in a bucket.
"No problem," you say,
"Markdown is the way!"
And it took them, no time, to compose it.

## A Poem, Indented

> There once was a writer from Nantucket,
Who wanted some prose in a bucket.  
"No problem," you say,  
"Markdown is the way!"  
And it took them, no time, to compose it.  

`,

  mediaType: MediaType.Video,
  layout: Layout.MediaCenter,
  mediaURL: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
  mediaCaption: "A CC0 video of a flower opening"
};

const authoredStateI = {
  windowShadeType: WindowShadeType.Framing,
  mediaType: MediaType.Image,
  layout: Layout.MediaLeft,
  mediaURL: "https://66.media.tumblr.com/c25a40a48a5ddee29c780fda1bc73f60/tumblr_mx0fhueQV31qfwb89o1_1280.jpg",
  content: `## A Poem

There once was a writer from Nantucket,
Who wanted some prose in a bucket.
"No problem," you say,
"Markdown is the way!"
And it took them, no time, to compose it.
`
};

const authoredStateJ = {
  windowShadeType: WindowShadeType.Demo,
  mediaType: MediaType.Image,
  layout: Layout.MediaLeft,
  mediaURL: "https://66.media.tumblr.com/c25a40a48a5ddee29c780fda1bc73f60/tumblr_mx0fhueQV31qfwb89o1_1280.jpg",
  content: `## A Poem

There once was a writer from Nantucket,
Who wanted some prose in a bucket.
"No problem," you say,
"Markdown is the way!"
And it took them, no time, to compose it.
`
};

const authoredStateK = {
  windowShadeType: WindowShadeType.Offline,
  mediaType: MediaType.Image,
  layout: Layout.MediaLeft,
  mediaURL: "https://66.media.tumblr.com/c25a40a48a5ddee29c780fda1bc73f60/tumblr_mx0fhueQV31qfwb89o1_1280.jpg",
  content: `## A Poem

There once was a writer from Nantucket,
Who wanted some prose in a bucket.
"No problem," you say,
"Markdown is the way!"
And it took them, no time, to compose it.
`
};

const windowShadeContainerDivStyle = {
  marginTop: "23px",
  marginBottom: "73px"
};

const logEventMethod = (logData: ILogEvent) => {
  /* eslint-disable-next-line no-console */
  console.log(`WindowShade Log Event: ${JSON.stringify(logData)}`);
};

function toggleWidth() {
  const elm = document.getElementById("window-shade");
  if(elm) {
    elm.classList.toggle("narrow");
  }
}

ReactDOM.render(
  <div>
    <h2>Teacher Edition Demo</h2>
    <p>
      This page demonstrates some of the Teacher-Edition Tips Plug-in
      features.
    </p>
    <button onClick={toggleWidth}>Toggle narrow width</button>
    <p>Basic contents, featuring Markdown styling:</p>
    <div style={windowShadeContainerDivStyle}>
      <WindowShade authoredState={authoredStateA} logEvent={logEventMethod} />
    </div>
    <p>Simple concatenation of the "content" and "content2" JSON fields:</p>
    <div style={windowShadeContainerDivStyle}>
      <WindowShade authoredState={authoredStateB} logEvent={logEventMethod} />
    </div>
    <p>Numbered Lists:</p>
    <div style={windowShadeContainerDivStyle}>
      <WindowShade authoredState={authoredStateC} logEvent={logEventMethod} />
    </div>
    <p>Bullet Lists:</p>
    <div style={windowShadeContainerDivStyle}>
      <WindowShade authoredState={authoredStateD} logEvent={logEventMethod} />
    </div>
    <p>Image w/ "center" layout:</p>
    <div style={windowShadeContainerDivStyle}>
      <WindowShade authoredState={authoredStateE} logEvent={logEventMethod} />
    </div>
    <p>Video w/ "left" layout:</p>
    <div style={windowShadeContainerDivStyle}>
      <WindowShade authoredState={authoredStateF} logEvent={logEventMethod} />
    </div>
    <p>Image w/ "left" layout:</p>
    <div style={windowShadeContainerDivStyle}>
      <WindowShade authoredState={authoredStateG} logEvent={logEventMethod} />
    </div>
    <p>Video w/ "center" layout:</p>
    <div style={windowShadeContainerDivStyle}>
      <WindowShade authoredState={authoredStateH} logEvent={logEventMethod} />
    </div>

    <p>Framing The Activity:</p>
    <div style={windowShadeContainerDivStyle}>
      <WindowShade authoredState={authoredStateI} logEvent={logEventMethod} />
    </div>

    <p>Demo Demo:</p>
    <div style={windowShadeContainerDivStyle}>
      <WindowShade authoredState={authoredStateJ} logEvent={logEventMethod} />
    </div>

    <p>Offline Activitiy:</p>
    <div style={windowShadeContainerDivStyle}>
      <WindowShade authoredState={authoredStateK} logEvent={logEventMethod} />
    </div>
  </div>,
  document.getElementById("window-shade")
);
