import * as React from "react";
import WindowShade from "./window-shade";
import { shallow } from "enzyme";

const windowShadeProps = {
  type: "teacherTip",
  content: "Hello there, you beautiful, wonderful world!"
};

describe("WindowShade component", () => {
  it("renders Hello World", () => {
    const wrapper = shallow(<WindowShade authoredState={windowShadeProps}/>);
    expect(wrapper.text()).toEqual("<WindowShade /><Markdown />");
  });
});
