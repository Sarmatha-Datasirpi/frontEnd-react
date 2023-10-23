import React from "react";

//constants
import { layoutModeTypes } from "../../Components/constants/layout";
import { UncontrolledTooltip } from "reactstrap";
const LightDark = ({ layoutMode, onChangeLayoutMode }) => {
  const mode =
    layoutMode === layoutModeTypes["DARKMODE"]
      ? layoutModeTypes["LIGHTMODE"]
      : layoutModeTypes["DARKMODE"];

  return (
    <div className="ms-1 header-item d-none d-sm-flex">
      <button
        onClick={() => onChangeLayoutMode(mode)}
        type="button"
        className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle light-dark-mode"
        id="darkthememode"
      >
        <i className="bx bx-moon fs-22"></i>
        <UncontrolledTooltip placement="bottom" target="darkthememode">
          Dark Theme
        </UncontrolledTooltip>
      </button>
    </div>
  );
};

export default LightDark;
