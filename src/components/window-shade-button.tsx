import * as React from "react";

import * as css from "./window-shade.sass";

import ContentConfigurations from "../config/content-configurations";

interface IProps {
  type: string;
  onClick: () => void;
}

interface IState { }

export default class WindowShade extends React.Component<IProps, IState> {

/*
 *
 * A teacher-edition plugin renders 5, top-level components:
 *   * Banners;
 *   * Slide-out Legends;
 *   * Window-Shades;
 *   * ContentOverlays; and,
 *   * QuestionOverlays.
 *
 * The banner is currently implmented in a partial view rendering in LARA. It
 * should be moved into this plug-in.
 *
 * Piotr has built a preliminary
 *
 * A window shade has two states, open and closed. When "open" its contents
 * are displayed; when closed, the button remains visible, but its contents
 * are collapsed with only its button and its ornamental horizontal line
 * displayed.
 *
 * Window-shades have a window-shade-button. A window-shade-button is composed
 * of 3 pieces:
 *   * a left-cap, containing an icon that is required;
 *   * a button-center, which contains the text label of the button; and
 *   * a right-cap, containing an optional "media" icon.
 */

  public render() {
    const { onClick, type } = this.props;
    const { Icon, label, styleClassName } = ContentConfigurations[type];
    const cssClassNames = [ css.windowShadeToggle, css[styleClassName] ];
    const iconProps = {
      width: "50px",
      fill: "red"
    };
    return (
      <div className={cssClassNames.join(" ")} onClick={onClick}>
        <span>
          <Icon {...iconProps} />
          {label}
        </span>
      </div>
    );
  }

}
