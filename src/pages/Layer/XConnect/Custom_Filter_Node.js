import { useCallback } from "react";
import { Handle, Position, NodeToolbar } from "reactflow";
import { FaFlag, FaServer } from "react-icons/fa";
import { BsCheckCircle } from "react-icons/bs";
import { CgArrowLongRightL } from "react-icons/cg";
import "../XConnect/App.css";
import newtworkTap from "../../../assets/images/nw-taps.png";
import crossConnect from "../../../assets/images/x-connect-wb.png";
import cc from "../../../assets/images/cc.png";
import cchq from "../../../assets/images/cc-hq.png";
import ccorange from "../../../assets/images/cc-orange.png";
import cccolor from "../../../assets/images/cccolor.png";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

const leftHandleStyle = { left: -5, top: 40, backgroundColor: "#0ab39c" };
const rightHandleStyle = { right: -5, top: 40, backgroundColor: "#0ab39c" };

function CustomFilterNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <Handle
        type="target"
        id="a"
        className="backup"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        id="a"
        className="backup"
        position={Position.Right}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        id="b"
        className="primary"
        position={Position.Left}
        style={leftHandleStyle}
        isConnectable={isConnectable}
      />
      <Handle
        id="b"
        type="source"
        className="primary"
        style={rightHandleStyle}
        position={Position.Right}
        isConnectable={isConnectable}
      />
      <div className="border border-1 rounded-3 custom-node-background d-flex justify-content-between p-2">
        <div className="row" style={{ width: "10vw", height: "100px" }}>
          <div className="col d-flex align-items-center flex-column justify-content-between">
            {data?.mapName.length > 0 ? (
              <>
                <span className="text-dark">
                  {data?.mapName.length > 15
                    ? data?.mapName.slice(0, 15) + "..."
                    : data?.mapName}
                </span>
                <img
                  src={cchq}
                  style={{ width: "5vw", marginTop: "-0.30rem" }}
                  height={70}
                />
              </>
            ) : (
              <>
                <span className="pb-1 text-info">Cross Connect</span>
                <img
                  src={cchq}
                  style={{ width: "5vw", marginTop: "-0.30rem" }}
                  height={70}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <Tooltip anchorSelect=".primary" content="Primary" />
      <Tooltip anchorSelect=".backup" place="bottom" content="Backup" />
    </>
  );
}

export default CustomFilterNode;
