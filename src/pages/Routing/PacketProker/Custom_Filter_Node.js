import { useCallback } from "react";
import { Handle, Position, NodeToolbar } from "reactflow";
import { FaFlag, FaServer } from "react-icons/fa";
import { BsCheckCircle } from "react-icons/bs";
import { CgArrowLongRightL } from "react-icons/cg";
import "../PacketProker/App.css";
import newtworkTap from "../../../assets/images/nw-taps.png";

const leftHandleStyle = { left: -5, top: 60, backgroundColor: "#0ab39c" };
const rightHandleStyle = { right: -5, top: 60, backgroundColor: "#0ab39c" };

function CustomFilterNode({ data, isConnectable }) {
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
      <div className="border border-1 rounded-3 custom-node-background d-flex justify-content-between p-2">
        <div className="row" style={{ width: "10vw", height: "100px" }}>
          <div className="col d-flex flex-column justify-content-between align-items-center">
            {data?.mapId?.length > 0 ? (
              <>
                <span className="text-info fw-bold">
                  {data?.description?.length > 15
                    ? data?.description?.slice(0, 15) + "..."
                    : data?.mapId}
                </span>
                <img
                  src={newtworkTap}
                  style={{ width: "5vw", marginTop: "-0.30rem" }}
                  height={70}
                />
              </>
            ) : (
              <>
                <span className="pb-1 text-info fw-bold">Packet Broker</span>
                <img
                  src={newtworkTap}
                  style={{ width: "5vw", marginTop: "-0.30rem" }}
                  height={70}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomFilterNode;
