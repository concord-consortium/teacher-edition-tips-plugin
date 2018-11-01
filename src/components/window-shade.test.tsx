import * as React from "react";
import WindowShade from "./window-shade";
import { shallow } from "enzyme";

describe("WindowShade component", () => {
  it("renders Hello World", () => {
    const wrapper = shallow(<WindowShade type="teacherTip"/>);
    expect(wrapper.text()).toEqual("Hello World");
  });
});
