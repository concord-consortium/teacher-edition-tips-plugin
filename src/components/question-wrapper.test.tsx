import * as React from "react";
import QuestionWrapper from "./question-wrapper";
import { mount } from "enzyme";

describe("QuestionWrapper component", () => {
  const getProps = (customProps: any = {}) => ({wrappedEmbeddableDiv: document.createElement("div"),
    wrappedEmbeddableContext: {},
    authoredState: {},
    logEvent: jest.fn(), ...customProps});

  it("wraps provided HTML element", () => {
    const props = getProps();
    props.wrappedEmbeddableDiv.setAttribute("id", "wrapped-div");
    // Shallow rendering is not enough in this case.
    const wrapper = mount(<QuestionWrapper {...props}/>);
    // wrapper.find and .contains doesn't seem to work. Probably because of the way how we the wrapped div is inserted
    // (manual insert in componentDidMount).
    expect(wrapper.html()).toEqual(expect.stringContaining('<div id="wrapped-div">'));
  });

  describe("when teacher tip is provided", () => {
    const authoredState = {
      teacherTip: "teacher tip test"
    };
    it("renders teacher tip tab", () => {
      const props = getProps({ authoredState });
      const wrapper = mount(<QuestionWrapper {...props}/>);
      expect(wrapper.text()).toEqual(expect.stringContaining("Teacher Tip"));
    });

    it("renders teacher tip once the tab is clicked", () => {
      const props = getProps({ authoredState });
      const wrapper = mount(<QuestionWrapper {...props}/>);
      const tab = wrapper.find('[data-cy="teacherTip"]');
      expect(tab.length).toEqual(1);
      expect(wrapper.text()).not.toEqual(expect.stringMatching("teacher tip test"));
      tab.simulate("click");
      expect(wrapper.text()).toEqual(expect.stringMatching("teacher tip test"));
    });
  });

  describe("when exemplar is provided", () => {
    const authoredState = {
      exemplar: "exemplar test"
    };
    it("renders teacher tip tab", () => {
      const props = getProps({ authoredState });
      const wrapper = mount(<QuestionWrapper {...props}/>);
      expect(wrapper.text()).toEqual(expect.stringContaining("Exemplar"));
    });

    it("renders teacher tip once the tab is clicked", () => {
      const props = getProps({ authoredState });
      const wrapper = mount(<QuestionWrapper {...props}/>);
      const tab = wrapper.find('[data-cy="exemplar"]');
      expect(tab.length).toEqual(1);
      expect(wrapper.text()).not.toEqual(expect.stringMatching("exemplar test"));
      tab.simulate("click");
      expect(wrapper.text()).toEqual(expect.stringMatching("exemplar test"));
    });
  });

  describe("when wrapped element is a multiple choice question", () => {
    describe("and some choices are marked as correct", () => {
      const wrappedEmbeddableContext = {
        type: "Embeddable::MultipleChoice",
          choices: [
          {
            choice: "a",
            is_correct: true
          },
          {
            choice: "b",
            is_correct: false
          }
        ]
      };

      it("renders Correct tab", () => {
        const props = getProps({ wrappedEmbeddableContext });
        const wrapper = mount(<QuestionWrapper {...props}/>);
        expect(wrapper.text()).toEqual(expect.stringContaining("Correct"));
      });

      it("doesn't render Distractors tab if no distractors explanation is provided", () => {
        const props = getProps({ wrappedEmbeddableContext });
        const wrapper = mount(<QuestionWrapper {...props}/>);
        expect(wrapper.text()).not.toEqual(expect.stringContaining("Distractors"));
      });

      it("renders Distractors tab if the distractors explanation is provided", () => {
        const props = getProps({
          wrappedEmbeddableContext,
          authoredState: {
            distractorsExplanation: "test"
          }
        });
        const wrapper = mount(<QuestionWrapper {...props}/>);
        expect(wrapper.text()).toEqual(expect.stringContaining("Distractors"));
      });

      it("renders correct explanation if it's provided and the tab is clicked", () => {
        const props = getProps({
          wrappedEmbeddableContext,
          authoredState: {
            correctExplanation: "correct test"
          }
        });
        const wrapper = mount(<QuestionWrapper {...props}/>);
        const tab = wrapper.find('[data-cy="correct"]');
        expect(tab.length).toEqual(1);
        expect(wrapper.text()).not.toEqual(expect.stringMatching("correct test"));
        tab.simulate("click");
        expect(wrapper.text()).toEqual(expect.stringMatching("correct test"));
      });

      it("renders distractors explanation if it's provided and the tab is clicked", () => {
        const props = getProps({
          wrappedEmbeddableContext,
          authoredState: {
            distractorsExplanation: "distractors test"
          }
        });
        const wrapper = mount(<QuestionWrapper {...props}/>);
        const tab = wrapper.find('[data-cy="distractors"]');
        expect(tab.length).toEqual(1);
        expect(wrapper.text()).not.toEqual(expect.stringMatching("distractors test"));
        tab.simulate("click");
        expect(wrapper.text()).toEqual(expect.stringMatching("distractors test"));
      });
    });

    describe("and no choices are marked as correct", () => {
      const wrappedEmbeddableContext = {
        type: "Embeddable::MultipleChoice",
        choices: [
          {
            choice: "a",
          },
          {
            choice: "b"
          }
        ]
      };

      it("doesn't render Correct tab if no correct explanation is provided", () => {
        const props = getProps({ wrappedEmbeddableContext });
        const wrapper = mount(<QuestionWrapper {...props}/>);
        expect(wrapper.text()).not.toEqual(expect.stringContaining("Correct"));
      });

      it("doesn't render Distractors tab if no distractors explanation is provided", () => {
        const props = getProps({ wrappedEmbeddableContext });
        const wrapper = mount(<QuestionWrapper {...props}/>);
        expect(wrapper.text()).not.toEqual(expect.stringContaining("Distractors"));
      });

      it("renders Correct tab if the correct explanation is provided", () => {
        const props = getProps({
          wrappedEmbeddableContext,
          authoredState: {
            correctExplanation: "test"
          }
        });
        const wrapper = mount(<QuestionWrapper {...props}/>);
        expect(wrapper.text()).toEqual(expect.stringContaining("Correct"));
      });

      it("renders Distractors tab if the distractors explanation is provided", () => {
        const props = getProps({
          wrappedEmbeddableContext,
          authoredState: {
            distractorsExplanation: "test"
          }
        });
        const wrapper = mount(<QuestionWrapper {...props}/>);
        expect(wrapper.text()).toEqual(expect.stringContaining("Distractors"));
      });
    });
  });
});
