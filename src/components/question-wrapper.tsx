import * as React from "react";
import * as css from "./question-wrapper.sass";
import { IAuthoredQuestionWrapper } from "../types";

type TabName = "Correct" | "Distractors" | "TeacherTip" | "Exemplar";

const LARA_MULTIPLE_CHOICE = "Embeddable::MultipleChoice";

interface IProps {
  authoredState: IAuthoredQuestionWrapper;
  wrappedEmbeddableDiv: HTMLDivElement;
  wrappedEmbeddableContext: any;
}

interface IState {
  activeTab: TabName | null;
}

export default class QuestionWrapper extends React.Component<IProps, IState> {
  public state: IState = {
    activeTab: null
  };

  private wrappedEmbeddableDivContainer = React.createRef<HTMLDivElement>();
  private answerInputs: NodeListOf<HTMLInputElement>;

  public componentDidMount() {
    const { wrappedEmbeddableDiv, wrappedEmbeddableContext } = this.props;
    if (!wrappedEmbeddableDiv) {
      return;
    }
    const containerNode = this.wrappedEmbeddableDivContainer.current!;
    containerNode.appendChild(wrappedEmbeddableDiv);

    if (wrappedEmbeddableContext.type === LARA_MULTIPLE_CHOICE) {
      // Find multiple choice answer inputs. Used later to position icons.
      this.answerInputs = this.findInputsInWrappedQuestion();
    }
  }

  public render() {
    const { activeTab } = this.state;
    const { authoredState } = this.props;
    const { teacherTip, exemplar, correctExplanation, distractorsExplanation } = authoredState;

    let overlayClass = css.overlay;
    let footer = null;
    if (activeTab === "Correct") {
      overlayClass += " " + css.correctOverlay;
      footer = correctExplanation;
    } else if (activeTab === "Distractors") {
      overlayClass += " " + css.distractorsOverlay;
      footer = distractorsExplanation;
    } else if (activeTab === "TeacherTip") {
      overlayClass += " " + css.teacherTipOverlay;
      footer = teacherTip;
    } else if (activeTab === "Exemplar") {
      overlayClass += " " + css.exemplarOverlay;
      footer = exemplar;
    }

    return (
      <div className={css.questionWrapper}>
        <div className={css.headers}>
          {
            this.showCorrectTab &&
            <div className={css.correct} onClick={this.toggleCorrect}>Correct</div>
          }
          {
            this.showDistractorsTab &&
            <div className={css.distractors} onClick={this.toggleDistractors}>Distractors</div>
          }
          { teacherTip && <div className={css.teacherTip} onClick={this.toggleTeacherTip}>Teacher Tips</div> }
          { exemplar && <div className={css.exemplar} onClick={this.toggleExemplar}>Exemplar</div> }
        </div>
        <div className={css.wrappedContent}>
          <div ref={this.wrappedEmbeddableDivContainer} />
          <div className={overlayClass} />
          { activeTab === "Correct" && this.renderCorrectOverlay() }
          { activeTab === "Distractors" && this.renderDistractorsOverlay() }
          { footer && <div className={css.footer}>{ footer }</div> }
        </div>
      </div>
    );
  }

  private renderCorrectOverlay() {
    const { choices } = this.props.wrappedEmbeddableContext;
    return choices.map((choice: any, idx: number) =>
      choice.is_correct ?
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
    );
  }

  private renderDistractorsOverlay() {
    const { choices } = this.props.wrappedEmbeddableContext;
    return choices.map((choice: any, idx: number) =>
      !choice.is_correct ?
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
    );
  }

  private get showCorrectTab() {
    const question = this.props.wrappedEmbeddableContext;
    const { correctExplanation } = this.props.authoredState;
    if (question.type !== LARA_MULTIPLE_CHOICE) {
      return false;
    }
    // There's an explanation or at least one choice marked as correct.
    return correctExplanation || question.choices.filter((c: any) => c.is_correct === true).length > 0;
  }

  private get showDistractorsTab() {
    const question = this.props.wrappedEmbeddableContext;
    const { distractorsExplanation } = this.props.authoredState;
    if (question.type !== LARA_MULTIPLE_CHOICE) {
      return false;
    }
    // There's an explanation or at at least one choice marked as correct.
    return distractorsExplanation || question.choices.filter((c: any) => c.is_correct === true).length > 0;
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

  private toggleExemplar = () => {
    const { activeTab } = this.state;
    this.setState({ activeTab: activeTab === "Exemplar" ? null : "Exemplar" });
  }
}
