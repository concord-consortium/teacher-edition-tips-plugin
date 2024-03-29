
/**************************************************************
 * This file exports a few interfaces and a single function
 * `logAnalyticsEvent` which is a small wrapper around
 * Google Analytics service custom event logging.
 *************************************************************/

import { TeacherTipType } from "../types";
import { IPluginRuntimeContext } from "@concord-consortium/lara-plugin-api";

export enum AnalyticsActionType {
  loaded = "TeacherTip Loaded",
  tabOpened = "TeacherTip TabOpened",
  tabClosed = "TeacherTip TabClosed"
}

export interface ILogEvent {
  readonly tipType: TeacherTipType | "";
  readonly eventAction: AnalyticsActionType;
  readonly tabName: string;
  readonly location?: string;
}

// See Google Documentation on event logging and `fieldsObject` here:
// https://developers.google.com/analytics/devguides/collection/analyticsjs/events
interface IGAData {
  readonly eventCategory: string;
  readonly eventAction: string;
  readonly eventLabel: string;
}

interface IAnalyticsService {
  ga?: (send: "send", type: "event", data: IGAData) => void;
}

// We create a service that looks like Google's `window.ga` interface
// but merely logs to the console.
// TSLint doesn't like console messages.
const mockGa = {
  /* eslint-disable no-console */
  ga: (send: "send", type: "event", data: IGAData) => {
    console.group("Mock analytics send payload:");
    console.debug(send);
    console.debug(JSON.stringify(data, null, 2));
    console.groupEnd();
  }
  /* eslint-enable no-console */
};

export const logEvent = (runtimeContext: IPluginRuntimeContext, event: ILogEvent) => {
  logAnalyticsEvent(event);
  logPluginEvent(runtimeContext, event);
};

const logPluginEvent = (context: IPluginRuntimeContext, event: ILogEvent) => {
  const eventTypeName = `TeacherEdition-${event.tipType}-${event.eventAction}`;
  // The location is set for loaded events,
  // and the tabName is set for tab switching events
  const eventValue = event.location ? event.location : event.tabName;
  context.log({ event: eventTypeName, event_value: eventValue });
};

const logAnalyticsEvent = (event: ILogEvent) => {
  const windowWithPossibleGa = (window as IAnalyticsService);

  const payload: IGAData = {
    eventCategory: event.tipType,
    eventAction: event.eventAction,
    eventLabel: event.location ? event.location : event.tabName
  };

  // Above all do no harm:
  try {
    if (windowWithPossibleGa.ga instanceof Function) {
      windowWithPossibleGa.ga("send", "event", payload);
    } else {
      mockGa.ga("send", "event", payload);
    }
  } catch (e) {
    // eslint-disable no-console
    console.error("Unable to send Google Analytics");
    console.error(e);
    // tslint:enable no-console
  }

};
