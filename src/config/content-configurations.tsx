
export interface IConfiguration {
  icon: string;
  label: string;
  styleClassName: string;
}

export const ContentConfigurations: {[index: string]: IConfiguration} = {
  teacherTip: {
    icon: "explaination_A.svg",
    label: "Teacher Tip",
    styleClassName: "teacher-tip"
  },
  theoryAndBackground: {
    icon: "teacher_A.svg",
    label: "Theory & Background",
    styleClassName: "theory-and-background"
  }
};

export default ContentConfigurations;
