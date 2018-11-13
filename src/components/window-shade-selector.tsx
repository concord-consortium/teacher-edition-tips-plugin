import * as React from "react";

// import * as css from "./window-shade.sass";
// import { IWindowShade, MediaType } from "../types";
// import { WindowShadeConfigurations } from "../config/ui-configurations";
// import WindowShadeButton from "./window-shade-button";
// import WindowShadeSelector from "./window-shade-selector";

interface IProps {
  shadyType: string;
}

interface IState {
}

export default class WindowShadeSelector extends React.Component<IProps, IState> {
  public render() {
    return (
      <div>
        <br />
        <span>{this.props.shadyType}</span>
        <br />
        {this.props.children}
      </div>
    );
  }
}
// A WindowShade is one of the top-level React components implemented in the
// "Teacher Edition Tips Plugin". These are full-width components that can be
// closed or open based on the "open" state flag. When open, the contents are
// displayed; otherwise the contents are hidden. The WindowShadeButton is
// always shown. When the WindowShadeButton is clicked, the WindowShade's
// open state is toggled.
//
// A WindowShade is composed of two components, a WindowShadeButton and a
// WindowShadeContent.

// export default class WindowShade extends React.Component<IProps, IState> {

//   public state: IState = {
//     open: false
//   };

//   public render() {
//     const { open } = this.state;
//     const { windowShadeType, content, mediaType } = this.props.authoredState;
//     const config = WindowShadeConfigurations[windowShadeType];
//     // const cssClassNames = [
//     //   open ? css.windowShadeContentShow : css.windowShadeContentHide,
//     //   css[config.styleClassName],
//     //   css.content
//     // ].join(" ");

//     const cssClassNames = [
//       open ? css.windowShadeContentShow : css.windowShadeContentHide

//     ].join(" ");

//     const toggle = () => {
//       this.setState({open: !open});
//     };

//     return (
//       <div className={css.windowShade}>
//         <WindowShadeConfiguration shadyType="foo">
//           <WindowShadeButton
//             onClick={toggle}
//             mediaType={mediaType ? mediaType : MediaType.None}
//             config={config}
//           />
//           <div className={cssClassNames}>
//             <WindowShadeContent content={content} config={config} />
//           </div>
//         </WindowShadeConfiguration>
//       </div>
//     );
//   }

// }
