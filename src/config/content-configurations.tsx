import TeacherEditionA from "../icons/teacher_edition_A.svg";
import ExclamationA from "../icons/exclamation_A.svg";

export interface IConfiguration {
  Icon: SvgrComponent;
  label: string;
  styleClassName: string;
}

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
  }
};

export default ContentConfigurations;
