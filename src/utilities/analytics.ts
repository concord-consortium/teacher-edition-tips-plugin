
import { TeacherTipType } from "../types";

export enum AnalyiticsActionType {
  loaded = "tip Loaded",
  tabOpened = "tip TabOpened",
  tabClosed = "tip TabClosed"
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
  ga: (send: "send", data: IGAData) => {
    console.group("mock analytics send payload:");
    console.log(send);
    console.log(JSON.stringify(data, null, 2));
    console.groupEnd();
  }
};

export const logAnalyticsEvent = (event: ILogEvent) => {
  const windowWithPossibleGa = (window as IAnalyticsService);

  const payload: IGAData = {
    hitType: "event",
    eventCategory: event.tipType,
    eventAction: event.eventAction,
    eventLabel: event.location ? event.location : event.tabName
  };

  if (windowWithPossibleGa.ga instanceof Function) {
    windowWithPossibleGa.ga("send", payload);
  } else {
    mockGa.ga("send", payload);
  }

};
