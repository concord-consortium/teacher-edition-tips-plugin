import * as React from "react";
import Markdown from "markdown-to-jsx";
import { IAuthoredQuestionWrapper } from "../types";
import CheckA from "../icons/check_A.svg";
import XA from "../icons/x_A.svg";
import ExclamationSmall from "../icons/exclamation_small_A.svg";
import Exclamation from "../icons/exclamation_A.svg";
import CheckMark from "../icons/check_mark.svg";
import XMark from "../icons/x_mark.svg";
import * as css from "./question-wrapper.sass";

type TabName = "Correct" | "Distractors" | "TeacherTip" | "Exemplar";

const LARA_MULTIPLE_CHOICE = "Embeddable::MultipleChoice";
const LARA_INTERACTIVE = "MwInteractive";

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
    const { wrappedEmbeddableDiv } = this.props;
    if (!wrappedEmbeddableDiv) {
      return;
    }
    const containerNode = this.wrappedEmbeddableDivContainer.current!;
    containerNode.appendChild(wrappedEmbeddableDiv);

    if (this.isMCQuestion) {
      // Find multiple choice answer inputs. Used later to position icons.
      this.answerInputs = this.findInputsInWrappedQuestion();
    }
  }

  public render() {
    const { activeTab } = this.state;
    const { authoredState } = this.props;
    const { teacherTip, exemplar, correctExplanation, distractorsExplanation } = authoredState;

    let overlayClass = css.overlay;
    let footerClass = css.footer;
    let footer = null;
    if (activeTab === "Correct") {
      overlayClass += " " + css.correctOverlay;
      footerClass += " " + css.correctFooter;
      footer = correctExplanation;
    } else if (activeTab === "Distractors") {
      overlayClass += " " + css.distractorsOverlay;
      footerClass += " " + css.distractorsFooter;
      footer = distractorsExplanation;
    } else if (activeTab === "TeacherTip") {
      overlayClass += " " + css.teacherTipOverlay;
      footer = teacherTip;
    } else if (activeTab === "Exemplar") {
      overlayClass += " " + css.exemplarOverlay;
      footer = exemplar;
    }

    let wrapperClass = css.questionWrapper;
    if (this.isInteractive) {
      wrapperClass += " " + css.interactiveWrapper;
    }

    let wrappedContentClass = css.wrappedContent;
    if (activeTab !== null) {
      wrappedContentClass += " " + css.open;
    }

    return (
      <div className={wrapperClass}>
        <div className={css.headers}>
          {
            this.showCorrectTab &&
            <div className={css.correct} onClick={this.toggleCorrect} data-cy="correct"><CheckA/>Correct</div>
          }
          {
            this.showDistractorsTab &&
            <div className={css.distractors} onClick={this.toggleDistractors} data-cy="distractors">
              <XA/>Distractors
            </div>
          }
          { teacherTip && this.renderTeacherTipToggle() }
          {
            exemplar &&
            <div className={css.exemplar} onClick={this.toggleExemplar} data-cy="exemplar"><CheckA/>Exemplar</div>
          }
        </div>
        <div className={wrappedContentClass}>
          <div className={css.dotLeft}/>
          <div className={css.dotRight}/>
          <div ref={this.wrappedEmbeddableDivContainer} />
          <div className={overlayClass} />
          { activeTab === "Correct" && this.renderCorrectOverlay() }
          { activeTab === "Distractors" && this.renderDistractorsOverlay() }
          { activeTab === "TeacherTip" && this.renderImageOverlay() }
          {
            footer &&
            <div className={footerClass}>
              <Markdown className={css.authorMarkdown}>
                { footer }
              </Markdown>
            </div>
          }
        </div>
      </div>
    );
  }

  private get isMCQuestion() {
    const { wrappedEmbeddableContext } = this.props;
    return wrappedEmbeddableContext.type === LARA_MULTIPLE_CHOICE;
  }

  private get isInteractive() {
    const { wrappedEmbeddableContext } = this.props;
    return wrappedEmbeddableContext.type === LARA_INTERACTIVE;
  }

  private renderTeacherTipToggle() {
    const Icon = this.isInteractive ? Exclamation : ExclamationSmall;
    return (
      <div className={css.teacherTip} onClick={this.toggleTeacherTip} data-cy="teacherTip">
        <span className={css.teacherTipIcon}><Icon/></span>
        <span className={css.teacherTipLabel}>Teacher Tips</span>
      </div>
    );
  }

  private renderCorrectOverlay() {
    const { choices } = this.props.wrappedEmbeddableContext;
    if (this.answerInputs.length === 0) {
      return null;
    }
    return choices.map((choice: any, idx: number) =>
      choice.is_correct ?
        <div
          className={css.correctTickMark}
          key={idx}
          style={{
            top: this.answerInputs[idx].offsetTop,
            left: this.answerInputs[idx].offsetLeft
          }}
        >
          <CheckMark/>
        </div>
        :
        null
    );
  }

  private renderDistractorsOverlay() {
    const { choices } = this.props.wrappedEmbeddableContext;
    if (this.answerInputs.length === 0) {
      return null;
    }
    return choices.map((choice: any, idx: number) =>
      !choice.is_correct ?
        <div
          className={css.distractorXMark}
          key={idx}
          style={{
            top: this.answerInputs[idx].offsetTop,
            left: this.answerInputs[idx].offsetLeft
          }}
        >
          <XMark/>
        </div>
        :
        null
    );
  }

  private renderImageOverlay() {
    const { authoredState } = this.props;
    const { teacherTipImageOverlay } = authoredState;
    if (!teacherTipImageOverlay) {
      return null;
    }
    return <img src={teacherTipImageOverlay} className={css.teacherTipImageOverlay} />;
  }

  private get showCorrectTab() {
    const question = this.props.wrappedEmbeddableContext;
    const { correctExplanation } = this.props.authoredState;
    if (!this.isMCQuestion) {
      return false;
    }
    // There's an explanation or at least one choice marked as correct.
    return correctExplanation || question.choices.filter((c: any) => c.is_correct === true).length > 0;
  }

  private get showDistractorsTab() {
    const { distractorsExplanation } = this.props.authoredState;
    return distractorsExplanation && this.isMCQuestion;
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
