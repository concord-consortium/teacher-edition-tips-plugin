import ExclamationA from "../icons/exclamation_A.svg";
import ExclamationB from "../icons/exclamation_B.svg";
import DiscussionA from "../icons/discussion_A.svg";
import DiscussionB from "../icons/discussion_B.svg";
import LightbulbA from "../icons/lightbulb_A.svg";
import LightbulbB from "../icons/lightbulb_B.svg";
import ShovelA from "../icons/shovel_A.svg";
import ShovelB from "../icons/shovel_B.svg";

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
  }
};

export const getContentConfiguration = (key: string) => {
  return WindowShadeConfigurations[key];
};

export default WindowShadeConfigurations;
