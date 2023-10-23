import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { GoChevronRight } from "react-icons/go";

function RightContext({
  context,
  setContext,
  xYPosistion,
  setXyPosistion,
  handleClick,
  contextMenuOption,
}) {
  const hideContext = (event) => {
    setContext(false);
  };
  const [chosen, setChosen] = React.useState();
  const initMenu = (chosen) => {
    setChosen(chosen);
  };
  return (
    <>
      {context && (
        <Dropdown.Menu
          show
          style={{
            top: `${xYPosistion.y - 100}px`,
            left: `${xYPosistion.x - 200}px`,
            width: "16%",
          }}
        >
          {contextMenuOption.map((opt) => (
            <Dropdown.Item
              key={opt}
              onClick={(event) => handleClick(event)}
              className="fw-bold fs-6 d-flex align-items-center"
            >
              <GoChevronRight className="me-2" />
              {opt}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      )}
    </>
  );
}
export default RightContext;
