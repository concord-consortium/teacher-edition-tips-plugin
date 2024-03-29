/**
 * @jest-environment jsdom
 */

import * as React from "react";
import WindowShade from "./window-shade";
import { shallow } from "enzyme";
import { WindowShadeType } from "../types";

const windowShadeProps = {
  windowShadeType: WindowShadeType.TeacherTip,
  content: "Hello there, you beautiful, wonderful world!"
};

describe("WindowShade component", () => {
  it("renders Hello World", () => {
    const wrapper = shallow(
      <WindowShade
        authoredState={windowShadeProps}
        logEvent={jest.fn()}
      />
    );
    expect(wrapper.text()).toEqual("<Dot /><Dot /><WindowShadeButton /><WindowShadeContent />");
  });
});
