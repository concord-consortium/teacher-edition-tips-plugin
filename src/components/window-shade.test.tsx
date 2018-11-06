import * as React from "react";
import WindowShade from "./window-shade";
import { shallow } from "enzyme";

describe("WindowShade component", () => {
  it("renders Hello World", () => {
    const wrapper = shallow(<WindowShade authoredState={{content: "Hello World"}}/>);
    expect(wrapper.text()).toEqual(expect.stringContaining("Hello World"));
  });
});
