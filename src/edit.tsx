import * as React from "react";
import * as ReactDOM from "react-dom";
import WindowShadeEdit from "./components/window-shade-edit";

import { IWindowShade, WindowShadeType } from "./types";

const windowShadeProps: IWindowShade = {
  windowShadeType: WindowShadeType.TheoryAndBackground,
  content: "## This is something"
};

ReactDOM.render(
  <div>
    <WindowShadeEdit initialProps={windowShadeProps} />
  </div>,
  document.getElementById("window-shade-editor")
);
