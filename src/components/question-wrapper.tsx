import * as React from "react";
import Markdown from "markdown-to-jsx";
import { IAuthoredQuestionWrapper, TeacherTipType, QuestionWrapperLocation } from "../types";
import CheckA from "../icons/check_A.svg";
import XA from "../icons/x_A.svg";
import ExclamationSmall from "../icons/exclamation_small_A.svg";
import Exclamation from "../icons/exclamation_A.svg";
import CheckMark from "../icons/check_mark.svg";
import XMark from "../icons/x_mark.svg";
import css from "./question-wrapper.sass";
import { ILogEvent, AnalyticsActionType } from "../utilities/analytics";

type TabName = "Correct" | "Distractors" | "TeacherTip" | "Exemplar";
const SHOW_CORRECT_OVERLAY_MESSAGE = "teacher-edition:showCorrectOverlay";
const SHOW_DISTRACTOR_OVERLAY_MESSAGE = "teacher-edition:showDistractorOverlay";
const HIDE_OVERLAY_MESSAGE = "teacher-edition:hideOverlay";

const LARA_MULTIPLE_CHOICE = "Embeddable::MultipleChoice";
const LARA_INTERACTIVES = [ "MwInteractive", "ImageInteractive", "VideoInteractive" ];

export const isBuiltInMCQuestion = (wrappedEmbeddableContext: any) => {
  return wrappedEmbeddableContext.type === LARA_MULTIPLE_CHOICE;
};

export const isInteractive = (wrappedEmbeddableContext: any) => {
  if (!wrappedEmbeddableContext) {
    console.error("Question wrapper missing required wrappedEmbeddableContext");
    return false;
  }
  return LARA_INTERACTIVES.indexOf(wrappedEmbeddableContext.type) !== -1;
};

interface IProps {
  authoredState: IAuthoredQuestionWrapper;
  wrappedEmbeddableDiv: HTMLElement;
  wrappedEmbeddableContext: any;
  logEvent: (logData: ILogEvent) => void;
  sendCustomMessage?: (msg: any) => void;
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
    if (!wrappedEmbeddableDiv || !wrappedEmbeddableContext) {
      return;
    }
    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
    const containerNode = this.wrappedEmbeddableDivContainer.current!;
    containerNode.appendChild(wrappedEmbeddableDiv);

    if (isBuiltInMCQuestion(wrappedEmbeddableContext)) {
      // Find multiple choice answer inputs. Used later to position icons.
      this.answerInputs = this.findInputsInWrappedQuestion();
    }
    this.logAction(AnalyticsActionType.loaded);
  }

  // NP: 2022-06-02 - A bit hacky. Jest doesn't thing Markdown is a react
  // component, so without this guard, jest fails tests. I can't figure out
  // if there is something weird about how the Markdown component exports itself
  // or why jest module loading wouldn't be the same as typescript module loading.
  public renderMarkdown(visibleText: string, visibleTextClass: string) {
    if (Markdown !== undefined) {
      return (
        <div className={visibleTextClass}>
            <Markdown className={css.authorMarkdown}>
              { visibleText }
            </Markdown>
        </div>
      );
    }
    return (
      <div className={visibleTextClass}>
          <div className={css.authorMarkdown}>
            { visibleText }
          </div>
      </div>
    );
  }

  public render() {
    const { activeTab } = this.state;
    const { authoredState, wrappedEmbeddableContext } = this.props;
    const { teacherTip, exemplar, correctExplanation, distractorsExplanation, location } = authoredState;

    const _location = location ? location : QuestionWrapperLocation.Bottom;

    let wrapperClass = css.questionWrapper;
    if (isInteractive(wrappedEmbeddableContext)) {
      // Special style, different icons.
      wrapperClass += " " + css.interactiveWrapper;
    }

    let visibleText = null;
    let wrappedContentClass = css.wrappedContent;
    if (activeTab === "Correct") {
      visibleText = correctExplanation;
      wrappedContentClass += " " + css.correct;
    } else if (activeTab === "Distractors") {
      visibleText = distractorsExplanation;
      wrappedContentClass += " " + css.distractors;
    } else if (activeTab === "TeacherTip") {
      visibleText = teacherTip;
      wrappedContentClass += " " + css.teacherTip;
    } else if (activeTab === "Exemplar") {
      visibleText = exemplar;
      wrappedContentClass += " " + css.examplar;
    }
    if (activeTab !== null) {
      wrappedContentClass += " " + css.open;
    }

    let visibleTextClass = css.questionWrapperText;
    if (_location === QuestionWrapperLocation.StickyNote) {
      visibleTextClass += " " + css.stickyNote;
    } else if (_location === QuestionWrapperLocation.Top) {
      visibleTextClass += " " + css.header;
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
            this.renderDistractorToggle()
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
          <div className={css.originalContent} ref={this.wrappedEmbeddableDivContainer} />
          <div className={css.overlay} />
          { activeTab === "Correct" && this.renderCorrectOverlay() }
          { activeTab === "Distractors" && this.renderDistractorsOverlay() }
          { activeTab === "TeacherTip" && this.renderImageOverlay() }
          {
            visibleText && this.renderMarkdown(visibleText, visibleTextClass)
          }
        </div>
      </div>
    );
  }

  private renderTeacherTipToggle() {
    const Icon = isInteractive(this.props.wrappedEmbeddableContext) ? Exclamation : ExclamationSmall;
    return (
      <div className={css.teacherTip} onClick={this.toggleTeacherTip} data-cy="teacherTip">
        <span className={css.teacherTipIcon}><Icon/></span>
        <span className={css.teacherTipLabel}>Teacher Tip</span>
      </div>
    );
  }

  private renderDistractorToggle() {
    return (
      <div className={css.distractors} onClick={this.toggleDistractors} data-cy="distractors">
        <XA/>Distractors
      </div>
    );
  }

  private renderCorrectOverlay() {
    const { choices } = this.props.wrappedEmbeddableContext;
    if (this.answerInputs === undefined || this.answerInputs.length === 0) {
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
    if (this.answerInputs === undefined || this.answerInputs.length === 0) {
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
    const hasCorrectChoice = question.choices && question.choices.filter((c: any) => c.is_correct === true).length > 0;
    // There's an explanation or at least one choice marked as correct.
    return correctExplanation || hasCorrectChoice;
  }

  private get showDistractorsTab() {
    const { distractorsExplanation } = this.props.authoredState;
    return distractorsExplanation;
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
    const { sendCustomMessage } = this.props;
    const { activeTab } = this.state;
    const messageType = tabName === "Correct" && activeTab !== "Correct"
      ? SHOW_CORRECT_OVERLAY_MESSAGE
      : tabName === "Distractors" && activeTab !== "Distractors"
        ? SHOW_DISTRACTOR_OVERLAY_MESSAGE
        : HIDE_OVERLAY_MESSAGE;
    const customMessage = { type: messageType, content: [] };
    sendCustomMessage && sendCustomMessage(customMessage);
    const {tabOpened, tabClosed} = AnalyticsActionType;
    const action = (activeTab === tabName) ? tabClosed : tabOpened;
    const nextTab = (action === tabClosed) ? null : tabName;
    this.setState({activeTab: nextTab}, () => this.logAction(action, tabName));
  }

  private logAction = (action: AnalyticsActionType, tabName = "none") => {
    const location = (action === AnalyticsActionType.loaded)
      ? window.location.toString()
      : undefined;
    this.props.logEvent({
      tipType: TeacherTipType.QuestionWrapper,
      eventAction: action,
      tabName,
      location
    });
  }
}
