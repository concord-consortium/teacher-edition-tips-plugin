import * as React from "react";
import * as ReactDOM from "react-dom";
import PluginApp from "./components/plugin-app";
import * as PluginAPI from "@concord-consortium/lara-plugin-api";

const getAuthoredState = (context: PluginAPI.IPluginRuntimeContext) => {
  if (!context.authoredState) {
    return {};
  }
  let authoredState;
  try {
    authoredState = JSON.parse(context.authoredState);
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.warn("Unexpected authoredState:", context.authoredState);
    return {};
  }
  return authoredState;
};

const isTeacherEdition = () => {
  // If we decide to do something more complex in the future,
  // the client's API won't change.
  return window.location.search.indexOf("mode=teacher-edition") > 0;
};

export class TeacherEditionTipsPlugin {
  public context: PluginAPI.IPluginRuntimeContext;
  public pluginAppComponent: any;

  constructor(context: PluginAPI.IPluginRuntimeContext) {
    this.context = context;
    this.renderPluginApp();
  }

  public renderPluginApp = () => {
    const authoredState = getAuthoredState(this.context);
    const wrappedEmbeddable = this.context.wrappedEmbeddable;
    if (isTeacherEdition()) {
      this.pluginAppComponent = ReactDOM.render(
        <PluginApp
          authoredState={authoredState}
          wrappedEmbeddableDiv={wrappedEmbeddable && wrappedEmbeddable.container}
          wrappedEmbeddableContext={wrappedEmbeddable && wrappedEmbeddable.laraJson}
        />,
        this.context.container);
    }
  }
}

export const initPlugin = () => {
  if (!PluginAPI || !PluginAPI.registerPlugin) {
    // tslint:disable-next-line:no-console
    console.warn("LARA Plugin API not available, TeacherEditionTipsPlugin terminating");
    return;
  }
  // tslint:disable-next-line:no-console
  console.log("LARA Plugin API available, TeacherEditionTipsPlugin initialization");
  PluginAPI.registerPlugin("teacherEditionTips", TeacherEditionTipsPlugin);
};

initPlugin();
