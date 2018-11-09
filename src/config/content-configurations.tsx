import TeacherEditionA from "../icons/teacher_edition_A.svg";
import ExclamationA from "../icons/exclamation_A.svg";
import LightBulbA from "../icons/lightbulb_A.svg";

import { WindowShadeType } from "../types";

export interface IConfiguration {
  Icon: SvgrComponent;
  label: string;
  styleClassName: string;
}

export const getContentConfiguration = (shadeType: WindowShadeType) => {
  switch (shadeType) {
    case WindowShadeType.TheoryAndBackground:
      return {
        Icon: TeacherEditionA,
        label: "Theory & Background",
        styleClassName: "theoryAndBackground"
      };
    case WindowShadeType.DiscussionPoints:
      return {
        Icon: LightBulbA,
        label: "Discussion Points",
        styleClassName: "theoryAndBackground"
      };
    case WindowShadeType.TeacherTip:
    default:
      return {
        Icon: ExclamationA,
        label: "Teacher Tip",
        styleClassName: "teacherTip"
      };
  }
};

export default getContentConfiguration;
