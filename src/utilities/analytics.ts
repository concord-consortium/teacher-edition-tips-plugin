
import { TeacherTipType } from "../types";

export enum AnalyiticsActionType {
  loaded = "TeacherTip Loaded",
  tabOpened = "TeacherTip TabOpened",
  tabClosed = "TeacherTip TabClosed"
}

export interface ILogEvent {
  readonly tipType: TeacherTipType | "";
  readonly eventAction: AnalyiticsActionType;
  readonly tabName: string;
  readonly location?: string;
}

interface IGAData {
  readonly hitType: "event";
  readonly eventCategory: string;
  readonly eventAction?: string;
  readonly eventLabel?: string;
}

interface IAnalyticsService {
  ga?: (send: "send", data: IGAData) => void;
}

const mockGa = {
  // tslint:disable no-console
  ga: (send: "send", data: IGAData) => {
    console.group("Mock analytics send payload:");
    console.debug(send);
    console.debug(JSON.stringify(data, null, 2));
    console.groupEnd();
  }
  // tslint:enable no-console
};

export const logAnalyticsEvent = (event: ILogEvent) => {
  const windowWithPossibleGa = (window as IAnalyticsService);

  const payload: IGAData = {
    hitType: "event",
    eventCategory: event.tipType,
    eventAction: event.eventAction,
    eventLabel: event.location ? event.location : event.tabName
  };

  try {
    if (windowWithPossibleGa.ga instanceof Function) {
      windowWithPossibleGa.ga("send", payload);
    } else {
      mockGa.ga("send", payload);
    }
  } catch (e) {
    // tslint:disable no-console
    console.error("Unable to send Google Analytics");
    console.error(e);
    // tslint:enable no-console
  }

};
