import TeacherEditionA from "../icons/teacher_edition_A.svg";
import ExclamationA from "../icons/exclamation_A.svg";

export interface IConfiguration {
  icon: SvgrComponent;
  label: string;
  styleClassName: string;
}

export const ContentConfigurations: {[index: string]: IConfiguration} = {
  teacherTip: {
    icon: ExclamationA,
    label: "Teacher Tip",
    styleClassName: "teacher-tip"
  },
  theoryAndBackground: {
    icon: TeacherEditionA,
    label: "Theory & Background",
    styleClassName: "theory-and-background"
  }
};

export default ContentConfigurations;
