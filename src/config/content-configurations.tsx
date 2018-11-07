import TeacherEditionA from "../icons/teacher_edition_A.svg";
import ExclamationA from "../icons/exclamation_A.svg";
import DiscussionA from "../icons/discussion_A.svg";
import MediaImage from "../icons/image.svg";

export interface IConfiguration {
  Icon: SvgrComponent;
  label: string;
  styleClassName: string;
  MediaIcon?: SvgrComponent;
}

// A ContentConfiguration defines the particulars needed to render
// an expanding window-shade element that spans the activity
// horizontally. The teacher-edition ornamentations of questions,
// like a multiple-choice question item, are handled elsewhere.

export const ContentConfigurations: {[index: string]: IConfiguration} = {
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
    MediaIcon: MediaImage
  }
};

export default ContentConfigurations;
