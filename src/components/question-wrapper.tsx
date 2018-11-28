import * as React from "react";
import Markdown from "markdown-to-jsx";
import { IAuthoredQuestionWrapper, TeacherTipType } from "../types";
import CheckA from "../icons/check_A.svg";
import XA from "../icons/x_A.svg";
import ExclamationSmall from "../icons/exclamation_small_A.svg";
import Exclamation from "../icons/exclamation_A.svg";
import CheckMark from "../icons/check_mark.svg";
import XMark from "../icons/x_mark.svg";
import * as css from "./question-wrapper.sass";
import {
  logAnalyticsEvent, ILogEvent, AnalyticsActionType
} from "../utilities/analytics";

type TabName = "Correct" | "Distractors" | "TeacherTip" | "Exemplar";

const LARA_MULTIPLE_CHOICE = "Embeddable::MultipleChoice";
const LARA_INTERACTIVES = [ "MwInteractive", "ImageInteractive", "VideoInteractive" ];

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
    this.logAction(AnalyticsActionType.loaded);
  }

  public render() {
    const { activeTab } = this.state;
    const { authoredState } = this.props;
    const { teacherTip, exemplar, correctExplanation, distractorsExplanation } = authoredState;

    let wrapperClass = css.questionWrapper;
    if (this.isInteractive) {
      // Special style, different icons.
      wrapperClass += " " + css.interactiveWrapper;
    }

    let footer = null;
    let wrappedContentClass = css.wrappedContent;
    if (activeTab === "Correct") {
      footer = correctExplanation;
      wrappedContentClass += " " + css.correct;
    } else if (activeTab === "Distractors") {
      footer = distractorsExplanation;
      wrappedContentClass += " " + css.distractors;
    } else if (activeTab === "TeacherTip") {
      footer = teacherTip;
      wrappedContentClass += " " + css.teacherTip;
    } else if (activeTab === "Exemplar") {
      footer = exemplar;
      wrappedContentClass += " " + css.examplar;
    }
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
          {
            this.showTeacherTipTab &&
            this.renderTeacherTipToggle()
          }
          {
            exemplar &&
            <div className={css.exemplar} onClick={this.toggleExemplar} data-cy="exemplar"><CheckA/>Exemplar</div>
          }
        </div>
        <div className={wrappedContentClass}>
          <div className={css.dotLeft}/>
          <div className={css.dotRight}/>
          <div ref={this.wrappedEmbeddableDivContainer} />
          <div className={css.overlay} />
          { activeTab === "Correct" && this.renderCorrectOverlay() }
          { activeTab === "Distractors" && this.renderDistractorsOverlay() }
          { activeTab === "TeacherTip" && this.renderImageOverlay() }
          {
            footer &&
            <div className={css.footer}>
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
    return LARA_INTERACTIVES.indexOf(wrappedEmbeddableContext.type) !== -1;
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

  private get showTeacherTipTab() {
    const { teacherTip, teacherTipImageOverlay } = this.props.authoredState;
    return teacherTip || teacherTipImageOverlay;
  }

  private findInputsInWrappedQuestion() {
    const { wrappedEmbeddableContext, wrappedEmbeddableDiv } = this.props;
    const inputType = wrappedEmbeddableContext.multi_answer ? "checkbox" : "radio";
    // There's one assumption about LARA Multiple Choice question.
    return wrappedEmbeddableDiv.querySelectorAll(`input[type="${inputType}"]`) as NodeListOf<HTMLInputElement>;
  }

  private toggleCorrect = () => this.toggleTab("Correct");
  private toggleDistractors = () => this.toggleTab("Distractors");
  private toggleTeacherTip = () => this.toggleTab("TeacherTip");
  private toggleExemplar = () => this.toggleTab("Exemplar");

  private toggleTab = (tabName: TabName) => {
    const { activeTab } = this.state;
    const {tabOpened, tabClosed} = AnalyticsActionType;
    const action = (activeTab === tabName) ? tabClosed : tabOpened;
    const nextTab = (action === tabClosed) ? null : tabName;
    this.setState({activeTab: nextTab}, () => this.logAction(action, tabName));
  }

  private logAction = (action: AnalyticsActionType, tabName = "none") => {
    const location = (action === AnalyticsActionType.loaded)
      ? window.location.toString()
      : undefined;

    logAnalyticsEvent({
      tipType: TeacherTipType.QuestionWrapper,
      eventAction: action,
      tabName,
      location
    });
  }
}
