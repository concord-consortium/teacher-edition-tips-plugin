import ExclamationA from "../icons/exclamation_A.svg";
import DiscussionA from "../icons/discussion_A.svg";
import LightbulbA from "../icons/lightbulb_A.svg";
import ShovelA from "../icons/shovel_A.svg";

export interface IWindowShadeConfiguration {
  Icon: SvgrComponent;
  BackingIcon?: SvgrComponent;
  label: string;
  styleClassName: string;
}

export const WindowShadeConfigurations: {[index: string]: IWindowShadeConfiguration} = {
  teacherTip: {
    Icon: ExclamationA,
    label: "Teacher Tip",
    styleClassName: "teacherTip"
  },
  theoryAndBackground: {
    Icon: LightbulbA,
    label: "Theory & Background",
    styleClassName: "theoryAndBackground"
  },
  discussionPoints: {
    Icon: DiscussionA,
    label: "Discussion Points",
    styleClassName: "discussionPoints",
  },
  diggingDeeper: {
    Icon: ShovelA,
    label: "Digging Deeper",
    styleClassName: "diggingDeeper",
  }
};
export const getContentConfiguration = (key: string) => {
  return WindowShadeConfigurations[key];
};

export default WindowShadeConfigurations;
