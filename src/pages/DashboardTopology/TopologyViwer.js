import React, { Fragment, useState, useEffect, useRef, Component } from "react";
import { useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import Graph from "react-graph-vis";
import "vis-network/styles/vis-network.css";
import "./TopologyViewer.css";
import { getNodesData, getEdgesData } from "../../store/TopologyViewer/action";
import RightContext from "../Routing/PacketProker/RightContext";
import Loader from "../../Components/Common/Loader";
const Topologydata = ({ globalState }) => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const selectedNodeId = useRef(null);
  const [node, setNode] = useState([]);
  const [open, setOpen] = useState(false);
  const [contextMenuOption, setContextMenuOption] = useState([]);
  const [context, setContext] = useState(false);
  const [xYPosistion, setXyPosistion] = React.useState({ x: 0, y: 0 });

  useEffect(() => {
    let interval = setInterval(() => {
      dispatch(getEdgesData());
      dispatch(getNodesData());
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  const nodesData = useSelector(
    (state) => state.TopologyViewerData?.getNodesData
  );
  const edgesData = useSelector(
    (state) => state.TopologyViewerData?.getEdgesData
  );

  // const graph = {edges: [], nodes: []};

  // if (nodesData.length > 0 && edgesData.length > 0) {
  //   graph.edges = edgesData
  //   graph.nodes = nodesData
  // }

  const graph = {
    nodes:
      nodesData.length > 0 && typeof nodesData != "string" ? nodesData : [],
    edges: Object.keys(edgesData).length > 0 ? edgesData : [],
  };

  const options = {
    layout: {
      hierarchical: true,
    },
    edges: {
      color: "green",
      font: "12px arial #ff0000",
      scaling: {
        label: true,
      },
      smooth: {
        enabled: true,
        type: "curvedCW",
        roundness: 0.65,
      },
    },
    interaction: {
      hover: true,
      tooltipDelay: 300,
      hoverConnectedEdges: true,
      navigationButtons: false,
      keyboard: true,
      zoomView: false,
    },
    height: "650",
    minZoomLevel: 0,
    maxZoomLevel: 0
  };

  var selectedNode = {};
  const event = {
    click: function (event) {
      if (!this.getNodeAt(event.pointer.DOM)) {
        setContext(false);
      }
      // var { nodes, edges } = event;

      // const nodeid = nodes[0].split("/");


      // Object.entries(nodesData).map((item) => {
      //   Object.values(item).map((values) => {
      //     if (values["id"] == nodes) {
      //       setNode({ values });
      //       setOpen(true);
      //     }
      //   });
      // });

      //setNode(nodeid[1])
    },
    oncontext: function (event) {
      event.event.preventDefault();
      const positionChange = {
        x: event.event.pageX,
        y: event.event.pageY,
      };
      selectedNodeId.current = this.getNodeAt(event.pointer.DOM);
      if (this.getNodeAt(event.pointer.DOM)) {
        setXyPosistion(positionChange);
        setContext(true);
        setContextMenuOption([
          "Configure Interface",
          "Configure DPB",
          "Configure xConnect",
        ]);
      } else {
        setContext(false);
      }
    },
  };
  var vertices = [];
  var vervalue = [];
  var result = [];
  if (Object.keys(node).length > 0) {
    vertices = [];
    vervalue = [];
    result = [];
    Object.keys(node).map((item) => {
      result.push(Object.entries(node[item]));
      Object.entries(node[item]).map((key, value) => {
        vertices.push(key[0]);
        vervalue.push(key[1]);
      });
    });
  }
  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (n) => {
    setContext(false);
    switch (n.target.textContent) {
      case "Configure DPB":
        history("/routing/packetproker");
        break;
      case "Configure Interface":
        history("/routing/interface");
        break;
      case "Configure xConnect":
        history("/layer/xConnect");
        break;

      default:
        break;
    }
    // history("/routing/packetproker");
    // history("/routing/packetproker" + selectedNodeId.current);
  };
  try {
    return (
      <Fragment>
        <RightContext
          context={context}
          setContext={setContext}
          xYPosistion={xYPosistion}
          setXyPosistion={setXyPosistion}
          handleClick={handleClick}
          contextMenuOption={contextMenuOption}
        />

        {nodesData?.length > 0 || edgesData?.length > 0 ? (
          <Graph
            graph={graph}
            options={options}
            events={event}
            getNetwork={(network) => {
            }}
          />
        ) : (
          <div><Loader /></div>
        )}
      </Fragment>
    );
  } catch (error) {
    console.error("Error occurred in Topologydata component:", error);
    return <div>Error: Something went wrong while rendering the topology.</div>;
  }



};

function mapStateToProps(state) {
  return { globalState: state };
}
export default connect(mapStateToProps)(Topologydata);
