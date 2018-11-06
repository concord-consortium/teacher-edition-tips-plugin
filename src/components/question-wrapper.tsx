import * as React from "react";
import * as css from "./question-wrapper.sass";

type tab = "Correct" | "Distractors" | "TeacherTip";

interface IProps {
  wrappedEmbeddableDiv: HTMLDivElement;
  wrappedEmbeddableContext: any;
}
interface IState {
  activeTab: tab | null;
}

export default class QuestionWrapper extends React.Component<IProps, IState> {
  public state: IState = {
    activeTab: null
  };

  private wrappedEmbeddableDivContainer = React.createRef<HTMLDivElement>();
  private answerInputs: NodeListOf<HTMLInputElement>;

  public componentDidMount() {
    const { wrappedEmbeddableDiv } = this.props;
    if (!wrappedEmbeddableDiv) {
      return;
    }
    const containerNode = this.wrappedEmbeddableDivContainer.current!;
    containerNode.appendChild(wrappedEmbeddableDiv);

    // Find answer inputs. Used later.
    this.answerInputs = this.findInputsInWrappedQuestion();
  }

  public render() {
    const { activeTab } = this.state;
    const { wrappedEmbeddableContext } = this.props;
    const choices = wrappedEmbeddableContext.choices;

    let overlayClass = css.overlay;
    if (activeTab === "Correct") {
      overlayClass += " " + css.correctOverlay;
    } else if (activeTab === "Distractors") {
      overlayClass += " " + css.distractorsOverlay;
    } else if (activeTab === "TeacherTip") {
      overlayClass += " " + css.teacherTipOverlay;
    }
    return (
      <div className={css.questionWrapper}>
        <div className={css.headers}>
          <div className={css.correct} onClick={this.toggleCorrect}>Correct</div>
          <div className={css.distractors} onClick={this.toggleDistractors}>Distractors</div>
          <div className={css.teacherTip} onClick={this.toggleTeacherTip}>Teacher Tip</div>
        </div>
        <div className={css.wrappedContent}>
          <div ref={this.wrappedEmbeddableDivContainer} />
          <div className={overlayClass} />
          {
            activeTab === "Correct" && choices.map((c: any, idx: number) =>
              c.is_correct ?
                <div
                  key={idx}
                  style={{
                    position: "absolute",
                    top: this.answerInputs[idx].offsetTop,
                    left: this.answerInputs[idx].offsetLeft}}
                >
                  ✔
                </div>
                :
                null
            )
          }
          {
            activeTab === "Distractors" && choices.map((c: any, idx: number) =>
              !c.is_correct ?
                <div
                  key={idx}
                  style={{
                    position: "absolute",
                    top: this.answerInputs[idx].offsetTop,
                    left: this.answerInputs[idx].offsetLeft}}
                >
                  X
                </div>
                :
                null
            )
          }
          {
            activeTab !== null &&
            <div className={css.footer}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eleifend finibus lorem, commodo mollis
              mauris rutrum id. Curabitur maximus libero ut volutpat fermentum. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos. Cras in nunc accumsan, efficitur ligula sed, commodo
              velit. Sed pellentesque euismod arcu eget ultrices. Curabitur blandit consectetur interdum. Proin nec
              neque quam congue suscipit in ut augue. Sed venenatis ac dui eu mollis. Phasellus vitae augue at tortor
              porttitor sodales sit amet sit amet velit. Nulla vel turpis iaculis, vestibulum quam nec, mollis diam.
            </div>
          }
        </div>
      </div>
    );
  }

  private findInputsInWrappedQuestion() {
    const { wrappedEmbeddableContext, wrappedEmbeddableDiv } = this.props;
    const inputType = wrappedEmbeddableContext.multi_answer ? "checkbox" : "radio";
    // There's one assumption about LARA Multiple Choice question.
    return wrappedEmbeddableDiv.querySelectorAll(`input[type="${inputType}"]`) as NodeListOf<HTMLInputElement>;
  }

  private toggleCorrect = () => {
    const { activeTab } = this.state;
    this.setState({ activeTab: activeTab === "Correct" ? null : "Correct" });
  }

  private toggleDistractors = () => {
    const { activeTab } = this.state;
    this.setState({ activeTab: activeTab === "Distractors" ? null : "Distractors" });
  }

  private toggleTeacherTip = () => {
    const { activeTab } = this.state;
    this.setState({ activeTab: activeTab === "TeacherTip" ? null : "TeacherTip" });
  }
}
