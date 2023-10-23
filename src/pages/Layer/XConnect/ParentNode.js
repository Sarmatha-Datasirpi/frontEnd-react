import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { FaFlag, FaServer } from 'react-icons/fa';
import { BsCheckCircle } from "react-icons/bs";
import { CgArrowLongRightL } from "react-icons/cg";
import "../XConnect/App.css";
import newtworkTap from '../../../assets/images/nw-taps.png'

const leftHandleStyle = { left: -5, top: 50, backgroundColor: '#b911e3' };
const rightHandleStyle = { right: -5, top: 30, backgroundColor: '#b911e3'  };


function ParentChildGroupNode({ data, position, isConnectable }) {
    console.log(position, data);
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    return (
<>
      <Handle
        type="target"
        position={Position.Left}
        id="a"
        style={leftHandleStyle}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={rightHandleStyle}
        id="a"
        isConnectable={isConnectable}
      />
       <Handle
        type="target"
        position={Position.Left}
        style={leftHandleStyle}
        id="b"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={rightHandleStyle}
        id="b"
        isConnectable={isConnectable}
      />
      <div className="border border-dark w-100 rounded custom-node-background d-flex justify-content-around p-3">
        <div className="row">
          {/* <div className="col d-flex flex-column justify-content-around">
            <FaFlag />
            <FaServer />
          </div> */}
          {/* <div className="col d-flex align-items-center">
            <span htmlFor="text">{data.label}</span>
          </div> */}
          <div className="col d-flex align-items-center flex-column justify-content-start">
            <BsCheckCircle />
            <span htmlFor="text">{data.label}</span>
            <img src={newtworkTap} width={90} height={50} />
          </div>
          {/* <div className="col d-flex flex-column align-items-center">
            <CgArrowLongRightL />
            {data.size}
          </div> */}
        </div>
      </div>
    </>
    );
}

export default ParentChildGroupNode;
