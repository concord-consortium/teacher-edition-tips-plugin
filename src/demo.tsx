import * as React from "react";
import * as ReactDOM from "react-dom";
import WindowShade from "./components/window-shade";

const authoredState = {
  content: `This page is the first of a series of model and data-based case studies
embedded in the GEODE module. Students will be asked to make explanations
for how particular features on Earth were formed. (In this case, they are
asked to explain how the Himalayan Mountains formed.) Students are provided
with three data sets (elevation/topography, earthquake location and magnitude
and volcano eruption data) to explore.

After students have explored the data about the region, they are asked to set
up a model to explain how the region’s features were formed. Finally,
students are asked to make an argument about how well their model explains
the formation of the particular Earth features.
`
};

ReactDOM.render(
  <WindowShade authoredState={authoredState} />,
  document.getElementById("window-shade")
);
