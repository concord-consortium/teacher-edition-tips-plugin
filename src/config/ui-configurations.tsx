import ExclamationA from "../icons/exclamation_A.svg";
import ExclamationB from "../icons/exclamation_B.svg";
import DiscussionA from "../icons/discussion_A.svg";
import DiscussionB from "../icons/discussion_B.svg";
import LightbulbA from "../icons/lightbulb_A.svg";
import LightbulbB from "../icons/lightbulb_B.svg";
import ShovelA from "../icons/shovel_A.svg";
import ShovelB from "../icons/shovel_B.svg";
import PointerA from "../icons/pointer_A.svg";
import PointerB from "../icons/pointer_B.svg";
import EyeA from "../icons/eye_A.svg";
import EyeB from "../icons/eye_B.svg";
import FrameA from "../icons/frame_A.svg";
import FrameB from "../icons/frame_B.svg";
import ToolsA from "../icons/tools_A.svg";
import ToolsB from "../icons/tools_B.svg";

export interface IWindowShadeConfiguration {
  FrontIcon: SvgrComponent;
  RearIcon: SvgrComponent;
  label: string;
  styleClassName: string;
}

export const WindowShadeConfigurations: {[index: string]: IWindowShadeConfiguration} = {
  teacherTip: {
    FrontIcon: ExclamationA,
    RearIcon: ExclamationB,
    label: "Teacher Tip",
    styleClassName: "teacherTip"
  },
  theoryAndBackground: {
    FrontIcon: LightbulbA,
    RearIcon: LightbulbB,
    label: "Theory & Background",
    styleClassName: "theoryAndBackground"
  },
  discussionPoints: {
    FrontIcon: DiscussionA,
    RearIcon: DiscussionB,
    label: "Discussion Points",
    styleClassName: "discussionPoints",
  },
  diggingDeeper: {
    FrontIcon: ShovelA,
    RearIcon: ShovelB,
    label: "Digging Deeper",
    styleClassName: "diggingDeeper",
  },
  howToUse: {
    FrontIcon: PointerA,
    RearIcon: PointerB,
    label: "How to Use This Interactive",
    styleClassName: "howToUse",
  },
  framing: {
    FrontIcon: FrameA,
    RearIcon: FrameB,
    label: "Framing The Activity",
    styleClassName: "framing",
  },
  demo: {
    FrontIcon: EyeA,
    RearIcon: EyeB,
    label: "Demo",
    styleClassName: "demo",
  },
  offline: {
    FrontIcon: ToolsA,
    RearIcon: ToolsB,
    label: "Offline Activity",
    styleClassName: "offline",
  }
};

export const getContentConfiguration = (key: string) => {
  return WindowShadeConfigurations[key];
};

export default WindowShadeConfigurations;
