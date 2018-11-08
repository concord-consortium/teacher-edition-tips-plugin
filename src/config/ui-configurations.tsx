import TeacherEditionA from "../icons/teacher_edition_A.svg";
import ExclamationA from "../icons/exclamation_A.svg";
import DiscussionA from "../icons/discussion_A.svg";

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
    Icon: TeacherEditionA,
    label: "Theory & Background",
    styleClassName: "theoryAndBackground"
  },
  discussionPoints: {
    Icon: DiscussionA,
    label: "Discussion Points",
    styleClassName: "discussionPoints",
  }
};

export default WindowShadeConfigurations;
