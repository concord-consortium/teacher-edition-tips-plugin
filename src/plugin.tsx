import * as React from "react";
import * as ReactDOM from "react-dom";
import PluginApp from "./components/plugin-app";

interface IExternalScriptContext {
  div: any;
  authoredState: string;
  learnerState: string;
  pluginId: string;
}

let PluginAPI: any;

const getAuthoredState = (context: IExternalScriptContext) => {
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

export class TeacherEditionTipsPlugin {
  public context: IExternalScriptContext;
  public pluginAppComponent: any;

  constructor(context: IExternalScriptContext) {
    this.context = context;
    this.renderPluginApp();
  }

  public renderPluginApp = () => {
    PluginAPI = (window as any).LARA;
    const authoredState = getAuthoredState(this.context);
    if (PluginAPI.isTeacherEdition()) {
      this.pluginAppComponent = ReactDOM.render(
        <PluginApp
          type={authoredState.type || "windowShade"}
          PluginAPI={PluginAPI}
        />,
        this.context.div);
    }
  }
}

export const initPlugin = () => {
  PluginAPI = (window as any).LARA;
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
