import { useCallback } from "react";
import { Handle, Position, NodeToolbar } from "reactflow";
import { FaFlag, FaServer } from "react-icons/fa";
import { BsCheckCircle } from "react-icons/bs";
import { CgArrowLongRightL } from "react-icons/cg";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

import "../XConnect/App.css";
import newtworkTap from "../../../assets/images/nw-taps.png";

const leftHandleStyle = { left: -5, top: 20, backgroundColor: "#6c7473" };
const rightHandleStyle = { right: -5, top: 20, backgroundColor: "#6c7473" };

function CustomInterfaceNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={leftHandleStyle}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={rightHandleStyle}
        isConnectable={isConnectable}
      />
      <div className="container border border-dark rounded-3 custom-node-background d-flex align-items-center justify-content-between p-2">
        <div>
          {data?.operationStatus?.toString().toLowerCase() === "up" ? (
            <AiFillCaretUp
              className="fs-2"
              style={{ color: "green" }}
            />
          ) : (
            <AiFillCaretDown
              className="fs-2"
              style={{ color: "red" }}
            />
          )}
        </div>
        <span htmlFor="text" className="ps-2 text-dark">
          {data.label}
        </span>
      </div>
    </>
  );
}

export default CustomInterfaceNode;
