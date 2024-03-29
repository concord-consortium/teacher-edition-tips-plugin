import * as React from "react";
import * as ReactDOM from "react-dom";
import PluginApp from "./components/plugin-app";
import * as PluginAPI from "@concord-consortium/lara-plugin-api";
import InlineAuthoringForm from "./components/authoring/inline-authoring-form";

const getAuthoredState = (context: PluginAPI.IPluginRuntimeContext | PluginAPI.IPluginAuthoringContext) => {
  if (!context.authoredState) {
    return {};
  }
  let authoredState;
  try {
    authoredState = JSON.parse(context.authoredState);
  } catch (error) {
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

export class TeacherEditionTipsRuntimePlugin {
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
      /* eslint-disable-next-line react/no-render-return-value */
      this.pluginAppComponent = ReactDOM.render(
        <PluginApp
          authoredState={authoredState}
          wrappedEmbeddableDiv={wrappedEmbeddable?.container || null}
          wrappedEmbeddableContext={wrappedEmbeddable?.laraJson || null}
          pluginContext={this.context}
        />,
        this.context.container);
    }
  }
}

export class TeacherEditionTipsAuthoringPlugin {
  public context: PluginAPI.IPluginAuthoringContext;
  public pluginAppComponent: any;

  constructor(context: PluginAPI.IPluginAuthoringContext) {
    this.context = context;
    this.renderPluginApp();
  }

  public renderPluginApp = () => {
    const authoredState = getAuthoredState(this.context);
    if (!authoredState.tipType) {
      authoredState.tipType = this.context.componentLabel;
    }
    const wrappedEmbeddable = this.context.wrappedEmbeddable;

    // eslint-disable-next-line react/no-render-return-value
    this.pluginAppComponent = ReactDOM.render(
      <InlineAuthoringForm
        initialAuthoredState={ authoredState }
        saveAuthoredPluginState={ this.context.saveAuthoredPluginState }
        closeAuthoredPluginForm={ this.context.closeAuthoredPluginForm }
        wrappedEmbeddableDiv={wrappedEmbeddable?.container}
        wrappedEmbeddableContext={wrappedEmbeddable?.laraJson}
    />,
      this.context.container);
  }
}

export const initPlugin = () => {
  if (!PluginAPI || !PluginAPI.registerPlugin) {
    console.warn("LARA Plugin API not available, TeacherEditionTipsPlugin terminating");
    return;
  }
  /* eslint-disable-next-line no-console */
  console.log("LARA Plugin API available, TeacherEditionTipsPlugin initialization");
  PluginAPI.registerPlugin({
    runtimeClass: TeacherEditionTipsRuntimePlugin,
    authoringClass: TeacherEditionTipsAuthoringPlugin
  });
};

initPlugin();
