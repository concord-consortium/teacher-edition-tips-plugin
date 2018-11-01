import * as React from "react";
import * as ReactDOM from "react-dom";
import WindowShade from "./components/window-shade";

const contentTextInMarkdown =
  "Welcome to the **Teacher Edition** of the _**GEODE: What will Earth look like " +
  "in 500 million years?**_ activity sequence. This interactive guide will " +
  "help you get acquainted with these activities from a student’s perspective " +
  "and also provide you with learning theory and learning objectives, " +
  "additional information on subject matter, classroom discussion points, " +
  "and tips on achieving learning goals." +
  "\n\n" +
  "# Getting Started" +
  "\n\n" +
  "To begin, work through the lesson’s content page by page. The Teacher " +
  "Edition components — which you can **click** or **tap** to open and close — " +
  "will highlight additional information in several key areas:" +
  "\n\n" +
  "* **Theory & Background** will provide you with the learning objectives " +
  "of the instructional model developed for this sequence of activities. " +
  "\n\n" +
  "* **Teacher Tips** are instructional resources and methods that you may " +
  "find useful to help your students achieve their learning goals." +
  "\n\n" +
  "* **Discussion Points** highlight questions that may help prompt " +
  "classroom discourse with the goal of expanding students’ understanding." +
  "\n\n" +
  "* **Digging Deeper** components provide additional subject matter and " +
  "related topics that you may find helpful in furthering your students’ " +
  "deeper understanding of the content." +
  "\n\n" +
`
### Some Markdown Experiments:
const contentText = `This page is the first of a series of model and data-based case studies

#### Can we do Tables?

Yes, but, they are very primitive. The following is a simple example of a
table in markdown.

| PofL (Phase of Luna) | Wolfie Sightings |
|:--------------------:|-----------------:|
| Nu (-ish)            |                0 |
| 1 Quad               |                2 |
| Full                 |             3456 |
| Dark Side            |               31 |

#### Text Styles

| Markdown | Result |
|:---:|:---:|
| \`**bold**\` |  **bold** |
| \`_italic_\` |  _italic_ |
| \`_**bold & italic**_\` |  _**bold & italic**_ |

#### Bullet Lists

* This is a bullet item.
* And a second bullet item.
  * A nested bullet item.
    * A nested, nested bullet item.
  * A second nested bullet item.
  * A **third** nested bullet item.
* Finally, we finish up with - a third bullet item; and,
* a fourth bullet item.

#### Numbered Lists

These work in a manner very similar to bullet lists, but use a
\`1.\`, instead of a \`*\`, to preface each list item. The \`1\` is
replaced with the correct number without the author having to count
the items.

1. This is a point.
1. This is another point.
  1. And some more stuff.
  1. And more, of course.
1. And the last one.
`;

  content:
`This page is the first of a series of model and data-based case studies
  content: contentTextInMarkdown
};

After students have explored the data about the region, they are asked to set
up a model to explain how the region’s features were formed. Finally,
students are asked to make an argument about how well their model explains
the formation of the particular Earth features.
`

};
After students have explored the data about the region, they are asked to set
up a model to explain how the region’s features were formed. Finally,
students are asked to make an argument about how well their model explains
the formation of the particular Earth features.
`;

const authoredStateA = {
  type: "theoryAndBackground",
  windowShadeType: {label: "label", icon: "icon"},
  content: contentText
};

const authoredStateB = {
  type: "teacherTip",
  windowShadeType: {label: "label", icon: "icon"},
  content: contentText
};


ReactDOM.render(
  <div>
    <WindowShade {...authoredStateA} />
    <WindowShade {...authoredStateB} />
  </div>,
  document.getElementById("window-shade")
);
