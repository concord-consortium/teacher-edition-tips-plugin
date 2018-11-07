import TeacherEditionA from "../icons/teacher_edition_A.svg";
import ExclamationA from "../icons/exclamation_A.svg";
import { TypeWindowShadeType } from "../types";

export interface IConfiguration {
  Icon: SvgrComponent;
  label: string;
  styleClassName: string;
}

export const getContentConfiguration = (shadeType: TypeWindowShadeType) => {
  switch (shadeType) {
    case "teacherTip":
      return {
        Icon: ExclamationA,
        label: "Teacher Tip",
        styleClassName: "teacherTip"
      };
    case "theoryAndBackground":
      return {
        Icon: TeacherEditionA,
        label: "Theory & Background",
        styleClassName: "theoryAndBackground"
      };
  }
};

export default getContentConfiguration;
