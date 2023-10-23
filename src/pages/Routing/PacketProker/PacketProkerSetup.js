import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  Fragment,
} from "react";

//redux
import { useSelector, useDispatch } from "react-redux";

// actions
import {
  getMapConfigData,
  setMapConfigData,
  getInterfacesData,
  setInterfacesData,
  getMapData,
  setMapData,
  setRuleData,
  getRuleData,
  deleteRuleData,
  deleteMapData,
  setPortchannelData,
  putPortchannelData,
  deletePortchannelData,
  deletePortchannelAllMembersData,
  deletePortchannelParticularMembersData,
  getPortchannelData,
} from "../../../store/PacketProker/action";
import ReactFlow, {
  Background,
  useReactFlow,
  useNodesState,
  useEdgesState,
  updateEdge,
  addEdge,
  Panel,
  ReactFlowProvider,
  Position,
  useOnSelectionChange,
  PanOnScrollMode,
  MarkerType,
} from "reactflow";
import { Button, Badge, Col, Row, UncontrolledTooltip } from "reactstrap";
// import { Row, Button, Col } from "react-bootstrap";
import { Modals } from "../PacketProker/Modal";
import RightContext from "../PacketProker/RightContext";
import PortGroup from "../PacketProker/PortGroup";
import "reactflow/dist/style.css";
import "../PacketProker/style.css";
import CustomInterfaceNode from "./Custom_Interface_Node";
import CustomFilterNode from "../PacketProker/Custom_Filter_Node";
import ParentChildGroupNode from "../PacketProker/ParentNode";
import InterfaceJson from "../PacketProker/interfaces.json";
import Devices from "../../DeviceList/Devices";
import { getInterfaceData } from "../../../store/Interfaces/action";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import notfound from "../../../assets/images/modals/notfound.PNG";
import { GoPlus } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";
import { GoGear } from "react-icons/go";
import Sidebar from "../../Layer/XConnect/Sidebar";
import styles from "../../Layer/XConnect/dnd.module.css";

const nodeTypes = {
  customInterfaceNode: CustomInterfaceNode,
  customFilterNode: CustomFilterNode,
  parentChildGroupNode: ParentChildGroupNode,
};
let id = 1;
const getId = () => `f${id++}`;

const getParentNodeId = () => `p${id++}`;

const DeviceManagentSetupFlow = (props) => {
  const deviceIpAddress = useParams().id;
  const deviceName = useParams().osVersion;
  const connectingNodeId = useRef(null);
  const connectedNodeId = useRef(null);
  const selectingEdgeId = useRef(null);
  const draggedNodeId = useRef(null);
  const reactFlowWrapper = useRef(null);
  const deletingMapNodeId = useRef(null);

  const dispatch = useDispatch();
  const history = useNavigate();

  const { mapDataList } = useSelector((state) => ({
    mapDataList: state.PacketProker_reducer.mapDataList,
  }));

  const [currentMapId, setCurrentMapId] = useState(0);

  const onConnect = useCallback(async (params) => {
    setEdges((eds) =>
      addEdge(
        {
          ...params,
          markerEnd: {
            type: "arrow",
            height: "50",
            width: "30",
            color: "blue",
          },
        },
        eds
      )
    );
    if (params.source.startsWith("f") && params.target.startsWith("E")) {
      const sourceNode = await nodes.filter(
        (node) => node.id === params.target
      )[0];
      nodes.map((node) => {
        if (node.id === params.source) {
          node.data.mappedPorts.to.push(sourceNode.name);
          node.data.deviceId = deviceIpAddress;
          setPorts((current) => [...current, node]);
          const port2Id = `reactflow__edge-${params.source}-${params.target}`;
          const updatedEdges = [
            ...edges,
            {
              source: params.source,
              sourceHandle: params.sourceHandle,
              target: params.target,
              targetHandle: params.targetHandle,
              markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
                color: "#808080",
              },
              style: {
                strokeWidth: 1,
                stroke: "#808080",
              },
              markerStart: {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
                color: "#808080",
              },
              style: {
                strokeWidth: 1,
                stroke: "#808080",
              },
              id: port2Id,
            },
          ];
          updateCoOrdinates(nodes, updatedEdges);
          if (
            node.data.mappedPorts.from.length > 0 &&
            node.data.mappedPorts.to.length > 0
          ) {
            setShowFilterCriteria(node?.data?.isCreated);
            connectingNodeId.current = node?.id;
            console.log(node);
            localStorage.setItem("mapId", node?.id?.split("f")[1]);
            localStorage.setItem("mapIsCreated", node?.data?.isCreated);

            setMapGeneralData({
              mapId: node?.id?.split("f")[1],
              networkPorts: node?.data?.mappedPorts?.from?.toString(),
              toolPorts: node?.data?.mappedPorts?.to?.toString(),
              pushVlan: node?.data?.pushVlan,
              description: node?.data?.description
                ? node?.data?.description
                : "",
              isUpdate: node?.data?.isUpdate,
              isCreated: node?.data?.isCreated,
            });
            setMapRuleData({ mapId: node.id.split("f")[1] });
            setMapId(node.id.split("f")[1]);
            setShowModal(true);
          }
        }
      });
    } else if (params.source.startsWith("E")) {
      const sourceNode = await nodes.filter(
        (node) => node.id === params.source
      )[0];
      nodes.map((node) => {
        if (node.id === params.target) {
          if (node.data && node.data.mappedPorts) {
            if (!node.data.mappedPorts.from) {
              node.data.mappedPorts.from = []; // Initialize 'from' property if it doesn't exist
            }
            node.data.mappedPorts.from.push(sourceNode.name);
          } else {
            // Handle the case when 'node.data' or 'node.data.mappedPorts' is undefined
            console.error("Invalid data or mappedPorts property.");
          }
          node.data.deviceId = deviceIpAddress;
          setPorts((current) => [...current, node]);
          console.log(node);
          const port1Id = `reactflow__edge-${params.source}-${params.target}`;
          const updatedEdges = [
            ...edges,
            {
              source: params.source,
              sourceHandle: params.sourceHandle,
              target: params.target,
              targetHandle: params.targetHandle,
              markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
                color: "#808080",
              },
              style: {
                strokeWidth: 1,
                stroke: "#808080",
              },
              markerStart: {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
                color: "#808080",
              },
              style: {
                strokeWidth: 1,
                stroke: "#808080",
              },
              id: port1Id,
            },
          ];
          updateCoOrdinates(nodes, updatedEdges);
          if (
            node.data.mappedPorts.from.length > 0 &&
            node.data.mappedPorts.to.length > 0
          ) {
            setShowFilterCriteria(node?.data?.isCreated);

            connectingNodeId.current = node?.id;
            console.log(node);
            localStorage.setItem("mapId", node?.id?.split("f")[1]);
            localStorage.setItem("mapIsCreated", node?.data?.isCreated);
            setMapGeneralData({
              mapId: node?.id?.split("f")[1],
              networkPorts: node?.data?.mappedPorts?.from?.toString(),
              toolPorts: node?.data?.mappedPorts?.to?.toString(),
              pushVlan: node?.data?.pushVlan,
              description: node?.data?.description
                ? node?.data?.description
                : "",
              isUpdate: node?.data?.isUpdate,
              isCreated: node?.data?.isCreated,
            });
            setMapRuleData({ mapId: node.id.split("f")[1] });
            setMapId(node.id.split("f")[1]);
            setShowModal(true);
          }
        }
      });
    } else if (params.source.startsWith("f") && params.target.startsWith("p")) {
      const sourceNode = await nodes.filter(
        (node) => node.id === params.target
      );
      nodes.map((node) => {
        console.log(sourceNode);
        if (node.id === params.source) {
          node.data.mappedPorts.to.push(
            nodes.find((node) => node.id === params.target)?.data.label
          );
          if (sourceNode && sourceNode.data) {
            node.data.deviceId = deviceIpAddress;
          }
          setPorts((current) => [...current, node]);
          console.log(node);
          const port1Id = `reactflow__edge-${params.source}-${params.target}`;
          const updatedEdges = [
            ...edges,
            {
              source: params.source,
              sourceHandle: params.sourceHandle,
              target: params.target,
              targetHandle: params.targetHandle,
              markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
                color: "#808080",
              },
              style: {
                strokeWidth: 1,
                stroke: "#808080",
              },
              markerStart: {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
                color: "#808080",
              },
              style: {
                strokeWidth: 1,
                stroke: "#808080",
              },
              id: port1Id,
            },
          ];
          let formData = {
            deviceId: deviceIpAddress,
            nodes: nodes,
            links: updatedEdges,
          };
          console.log(formData);
          dispatch(setInterfacesData(formData));
          if (
            node.data.mappedPorts.from.length > 0 &&
            node.data.mappedPorts.to.length > 0
          ) {
            setShowFilterCriteria(node?.data?.isCreated);

            connectingNodeId.current = node?.id;
            console.log(node);
            localStorage.setItem("mapId", node?.id?.split("f")[1]);
            localStorage.setItem("mapIsCreated", node?.data?.isCreated);
            setMapGeneralData({
              mapId: node?.id?.split("f")[1],
              networkPorts: node?.data?.mappedPorts?.from?.toString(),
              toolPorts: node?.data?.mappedPorts?.to?.toString(),
              pushVlan: node?.data?.pushVlan,
              description: node?.data?.description
                ? node?.data?.description
                : "",
              isUpdate: node?.data?.isUpdate,
              isCreated: node?.data?.isCreated,
            });
            setMapRuleData({ mapId: node.id.split("f")[1] });
            setMapId(node.id.split("f")[1]);
            setShowModal(true);
          }
        }
      });
    }
    //console.log(nodes);
  });

  const id = getId();
  const newFilterNode = {
    id,
    position: { x: 0, y: 0 },
    data: {
      label: `Filter Map Id : ${id}`,
      mappedPorts: { from: [], to: [] },
      mapId: "",
      deviceId: "",
      pushVlan: "",
      description: "",
      isUpdate: false,
      isCreated: false,
    },
    type: "customFilterNode",
    connectable: true,
  };
  const id1 = getParentNodeId();
  const newParentNode = {
    id: getParentNodeId(),
    position: { x: 0, y: 0 },
    type: "output",
    targetPosition: Position.Left,
    data: {
      label: "",
      childNodes: [],
      childNodesId: [],
      childNodesName: [],
      deviceId: "",
    },
  };

  const onConnectStart = useCallback((event, params) => {
    // console.log(
    //   "🚀 ~ file: PacketProkerSetup.js:638 ~ onConnectStart ~ params:",
    //   params
    // );
    //console.log(event, params);
    //console.log(connectingNodeId.current);
    connectingNodeId.current = params.nodeId;
  }, []);

  const onConnectEnd = useCallback((event) => {});

  const [showModal, setShowModal] = useState(false);
  const [mapRuleData, setMapRuleData] = useState({});
  const [mapGeneralData, setMapGeneralData] = useState({});
  const [portChannelData, setPortChannelData] = useState({});
  const [portGroup, setPortGroup] = useState(false);
  const [context, setContext] = useState(false);
  const [xYPosistion, setXyPosistion] = React.useState({ x: 0, y: 0 });
  const [parentXYPosistion, setParentXYPosistion] = React.useState({
    x: 0,
    y: 0,
  });
  const [ports, setPorts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [groupOperation, setgroupOperation] = useState("");
  const [contextMenuOption, setContextMenuOption] = useState([]);
  const [mappedPorts, setMappedPorts] = useState({ from: [], to: [] });
  const [showDeviceSelection, setShowDeviceSelection] = useState(true);
  const [filterDevice, setFilterDevice] = useState("sonic");
  const [deviceInfo, setDeviceInfo] = useState({});
  const [mapId, setMapId] = useState(0);
  const [showFilterCriteria, setShowFilterCriteria] = useState(false);

  const [removingNode, setRemovingNode] = useState({});
  const [plottingNode, setPlottingNode] = useState([]);
  const [eventInstance, setEventInstance] = useState({});

  const onNodeClick = useCallback((event, node) => {
    //console.log(event, node);
    connectingNodeId.current = node.id;
    //.log(connectingNodeId.current)
    setCurrentMapId(0);
    setCurrentMapId(parseInt(connectingNodeId.current.split("f")[1]));
    //console.log(currentMapId)
    if (
      node.id.startsWith("f") &&
      node.data.mappedPorts.from.length > 0 &&
      node.data.mappedPorts.to.length > 0
    ) {
      setShowFilterCriteria(node?.data?.isCreated);

      console.log("push-vlan", node.data.pushVlan, node);
      localStorage.setItem("mapId", node?.id?.split("f")[1]);
      localStorage.setItem("mapIsCreated", node?.data?.isCreated);
      setMapGeneralData({
        mapId: node?.id?.split("f")[1],
        networkPorts: node?.data?.mappedPorts?.from?.toString(),
        toolPorts: node?.data?.mappedPorts?.to?.toString(),
        pushVlan: node?.data?.pushVlan,
        description: node?.data?.description ? node?.data?.description : "",
        isUpdate: node?.data?.isUpdate,
        isCreated: node?.data?.isCreated,
      });
      setMapRuleData({ mapId: node.id.split("f")[1] });
      setMapId(node.id.split("f")[1]);
      setShowModal(true);
      dispatch(
        getRuleData({
          mapId: localStorage.getItem("mapId"),
          deviceId: deviceIpAddress,
        })
      );
      // dispatch(getMapData(node.id));
    }
  });

  const onEdgeContextMenu = useCallback((event, edge) => {
    selectingEdgeId.current = edge.id;
    //console.log(selectingEdgeId.current);
    event.preventDefault();
    setContext(false);
    const positionChange = {
      x: event.clientX + 130,
      y: event.clientY - 200,
    };
    setXyPosistion(positionChange);
    setContextMenuOption(["Delete"]);
    setContext(true);
  });

  const onPaneClick = useCallback((event) => {
    setContext(false);
    //console.log(event);
  });

  const handleClick = (n) => {
    console.log(n);
    switch (n.target.textContent) {
      case "Create Map": {
        eventInstance.preventDefault();
        const targetIsPane =
          eventInstance.target.classList.contains("react-flow__pane");
        if (targetIsPane) {
          // we need to remove the wrapper bounds, in order to get the correct position
          const { top, left } =
            reactFlowWrapper.current.getBoundingClientRect();
          newFilterNode.position = project({
            x: eventInstance.clientX - left - 75,
            y: eventInstance.clientY - top,
          });
          setNodes((nds) => [...nds, newFilterNode]);
          const updatedNodes = [...nodes, newFilterNode];
          let formData = {
            deviceId: deviceIpAddress,
            nodes: updatedNodes,
            links: edges,
          };
          dispatch(setInterfacesData(formData));
        }
        setContext(false);
        break;
      }

      case "Remove": {
        setRemovingNode(deletingMapNodeId.current);
        setPlottingNode((nodes) =>
          nodes?.filter((node) => node.id != deletingMapNodeId.current.id)
        );
        setNodes((nodes) =>
          nodes?.filter((node) => node.id != deletingMapNodeId.current.id)
        );
        const updatedNodes = nodes?.filter(
          (node) => node.id != deletingMapNodeId.current.id
        );
        updateCoOrdinates(updatedNodes, edges);
        setContext(false);
        break;
      }

      case "Delete Map": {
        setContext(false);
        setNodes((nds) =>
          nds.filter((e) => e.id !== connectedNodeId.current.id)
        );
        deleteMapDataByMapId(connectedNodeId.current);
        const updatedNodes = nodes.filter(
          (node) => node.id !== connectedNodeId.current.id
        );
        updateCoOrdinates(updatedNodes, nodes);
        dispatch(getInterfacesData(deviceIpAddress));
        break;
      }

      case "group":
        setContext(false);
        setgroupOperation(n.target.textContent);
        setPortChannelData();
        setPortGroup(true);
        break;

      case "ungroup":
        setContext(false);
        setgroupOperation(n.target.textContent);
        setPortChannelData(deletingMapNodeId.current);
        setPortGroup(true);
        break;

      case "Delete": {
        setContext(false);
        console.log(selectingEdgeId.current);
        const regex = /E\d+/;
        const regex1 = /f\d+/;

        // Extracting Filter Node Id
        let filterNodeId = selectingEdgeId.current.match(regex1)[0];

        // Finding Removed Ethernet Name by Extracted Filter Node Id
        let ethernetName = nodes?.find(
          (node) => node.id === selectingEdgeId.current.match(regex)[0]
        ).name;

        const updatedNodes = nodes?.forEach((node) => {
          console.log(node.id === filterNodeId);
          if (node.id === filterNodeId) {
            console.log("Inside");
            node.data.mappedPorts.from = node?.data?.mappedPorts?.from?.filter(
              (str) => str !== ethernetName
            );
            node.data.mappedPorts.to = node?.data?.mappedPorts?.to?.filter(
              (str) => str !== ethernetName
            );
            console.log(node);
          }
        });
        console.log(
          "🚀 ~ file: PacketProkerSetup.js:527 ~ updatedNodes ~ updatedNodes:",
          updatedNodes
        );
        setEdges((eds) => eds.filter((e) => e.id !== selectingEdgeId.current));
        const updatedEdges = edges.filter(
          (edge) => edge.id !== selectingEdgeId.current
        );
        updateCoOrdinates(updatedNodes, updatedEdges);

        // Updating Map

        const impactingNode = nodes.find((node) => node.id === filterNodeId);
        console.log(
          "🚀 ~ file: PacketProkerSetup.js:543 ~ handleClick ~ impactingNode:",
          impactingNode
        );
        let mapData = {
          description: impactingNode?.data?.description,
          deviceId: deviceIpAddress,
          from: impactingNode?.data?.mappedPorts?.from?.toString(),
          isUpdate: !impactingNode?.data?.isUpdate,
          mapId: impactingNode?.data?.mapId,
          pushVlan: impactingNode.data.pushVlan,
          to: impactingNode?.data?.mappedPorts?.to?.toString(),
        };
        console.log(mapData);
        dispatch(setMapData(mapData));
        connectingNodeId.current = filterNodeId;
        break;
      }

      default:
        break;
    }
  };

  const onSelectionContextMenu = (event, nodes) => {
    setPorts([]);
    //console.log(nodes[0].position);
    setParentXYPosistion({
      x: nodes[0].position?.x,
      y: nodes[0].position?.y,
    });
    setXyPosistion({
      x: event.clientX + 130,
      y: event.clientY - 200,
    });
    //console.log(event, nodes);
    event.preventDefault();
    nodes.map((node) => {
      setPorts((current) => [...current, node]);
    });
    //console.log(setPorts);
    if (nodes.length > 0) {
      setContextMenuOption(["group"]);
      setContext(true);
    }
  };

  const createGroup = (num, g) => {
    let i = 1;

    num.map((element, i) => {
      newParentNode.data.childNodes = [
        ...newParentNode.data.childNodes,
        element,
      ];
      newParentNode.data.childNodesId = [
        ...newParentNode.data.childNodesId,
        element.id,
      ];
      newParentNode.data.childNodesName = [
        ...newParentNode.data.childNodesName,
        element.name,
      ];
      newParentNode.data.deviceId = nodes[0].data.deviceId;
    });

    setNodes((nds) => {
      return nds.map((n) => {
        if ([...new Set(newParentNode.data.childNodesId)].includes(n.id)) {
          n.data.oldPosition = {
            x: n.position.x,
            y: n.position.y,
          };
          n.position = {
            x: 10,
            y: i * 50 - 10,
          };
          n.parentNode = newParentNode.id;
          n.extent = "parent";
          n.expandParent = true;
          i++;
        }
        return n;
      });
    });

    newParentNode.position = parentXYPosistion;
    // newParentNode.data.label = g.target.value;
    newParentNode.data.label = `PortChannel${g}`;
    let h = [...new Set(newParentNode.data.childNodesId)].length * 50 + 40;
    let w = 143;
    newParentNode.style = {
      backgroundColor: "transparent", // Light gray background color for white background
      width: `${w}px`,
      height: `${h}px`,
      zIndex: 0,
      color: "#17a2b8",
      border: "1px solid grey",
    };

    setNodes((nds) => [...nds, newParentNode]);
    // const updatedNodes = [...nodes, newParentNode];
    // updateCoOrdinates(updatedNodes, edges);
    const memberPorts = num.map((element) => element.name).join(",");
    const formData = {
      admin_status: "up",
      // member_ports: memberPorts,
      ethernet: memberPorts,
      deviceId: deviceIpAddress,
      portId: g,
      isUpdate: false,
    };

    console.log(g);
    dispatch(setPortchannelData(formData));
    setPortGroup(false);
  };

  const portChannelRes = useSelector(
    (state) => state.PacketProker_reducer.setPortChannel
  );
  useEffect(() => {
    if (portChannelRes && portChannelRes.statusCode === 200) {
      updateCoOrdinates(nodes, edges);
    } else {
      dispatch(getInterfacesData(deviceIpAddress));
      return;
    }
  }, [portChannelRes]);

  const onNodeContextMenu = async (event, node) => {
    deletingMapNodeId.current = node;
    //console.log(node);
    setPorts([]);
    node.data?.childNodes?.map((node) => {
      setPorts((current) => [...current, node]);
    });
    connectedNodeId.current = node;
    //console.log(event, node);

    event.preventDefault();
    const positionChange = {
      x: event.clientX + 130,
      y: event.clientY - 200,
    };
    setXyPosistion(positionChange);
    if (node.id.startsWith("p")) {
      setContextMenuOption(["ungroup"]);
      setContext(true);
    }
    if (node.id.startsWith("f")) {
      //console.log("into f");
      setContextMenuOption(["Delete Map"]);
      setContext(true);
    } else if (node.id.startsWith("E")) {
      const updatedEdges = await edges.filter((edge) => {
        return [edge.source, edge.target].includes(node.id);
      });
      if ((updatedEdges || []).length == 0) {
        event.preventDefault();
        setContext(false);
        setContextMenuOption(["Remove"]);
        setContext(true);
      }
    }
  };

  const removeGroup = async (port, groupname) => {
    setNodes(
      (nds) => {
        return nds.filter((data) => data.id != connectedNodeId.current.id);
      },
      [setNodes]
    );
    setNodes(
      (nds) => {
        let i = 1;
        return nds.map((n) => {
          if (
            [...new Set(connectedNodeId.current.data.childNodesId)].includes(
              n.id
            )
          ) {
            n.parentNode = null;
            n.expandParent = false;
            n.extent = null;
            n.position = {
              x: n.data.oldPosition.x,
              y: n.data.oldPosition.y,
            };
            i++;
          }
          return n;
        });
      },
      [setNodes]
    );
    console.log(groupname, port, "delete portchannel");
    let portData = {
      deviceId: deviceIpAddress,
      portId: groupname,
    };
    await dispatch(deletePortchannelAllMembersData(portData));
    dispatch(deletePortchannelData(portData));
    console.log("after delete");
    setPorts([]);
    setPortGroup(false);
  };

  const onNodeDragStart = (event, node) => {
    draggedNodeId.current = node;
  };

  const onNodeDragStop = (event, node) => {
    updateCoOrdinates(nodes, edges);
    setXyPosistion({ x: event.pageX, y: event.pageY });
    //console.log(event, node);
    if (node.position.x > 900) {
      //console.log("Entering");
      setNodes(
        (nds) => {
          return nds.map((data, index) => {
            if (
              data.id === draggedNodeId.current.id &&
              draggedNodeId.current.position.x === 50
            ) {
              if (draggedNodeId.current.id.startsWith("p")) {
                index = nds.findIndex((object) => {
                  return (
                    object.id ===
                    draggedNodeId.current.data.childNodes[
                      draggedNodeId.current.data.childNodes.length - 1
                    ].id
                  );
                });
              }
              for (let i = index + 1; i < nds.length; i++) {
                if (
                  draggedNodeId.current.id.startsWith("p") &&
                  nds[i].id != draggedNodeId.current.id &&
                  nds[i].position.x === 50
                ) {
                  nds[i].position.y =
                    nds[i].position.y -
                    draggedNodeId.current.data.childNodesId.length * 100;
                } else if (
                  nds[i].id != draggedNodeId.current.id &&
                  nds[i].position.x === 50
                ) {
                  nds[i].position.y = nds[i].position.y - 100;
                }
              }
            }
            return data;
          });
        },
        [setNodes]
      );
    } else {
      setNodes(
        (nds) => {
          return nds.map((data, index) => {
            if (
              data.id === draggedNodeId.current.id &&
              draggedNodeId.current.position.x === 50
            ) {
              data.position = draggedNodeId.current.position;
            }
            return data;
          });
        },

        [setNodes]
      );
    }
  };

  const configuringMap = async (e, operation) => {
    let mappingNode = await nodes.find(
      (node) => node.id === connectingNodeId.current
    );
    if (operation != "" && operation === "create") {
      mappingNode.data.mapId = e.mapId;
      mappingNode.data.pushVlan = e.pushvlan;
      mappingNode.data.description = e.description;
      let mapData = {
        description: e.description,
        deviceId: deviceIpAddress,
        from: mappingNode?.data?.mappedPorts?.from?.toString(),
        isUpdate: mappingNode?.data?.isUpdate,
        mapId: e.mapId,
        pushVlan: e.pushvlan,
        to: mappingNode?.data?.mappedPorts?.to?.toString(),
      };
      dispatch(setMapData(mapData));
    } else {
      console.log(e);
      mappingNode.data.mapId = e.mapId;
      mappingNode.data.pushVlan =
        e.pushvlan != "" ? e.pushvlan : mappingNode.data.pushVlan;
      mappingNode.data.description =
        e.description != "" ? e.description : mappingNode?.data?.description;
      let mapData = {
        description:
          e.description != "" ? e.description : mappingNode?.data?.description,
        deviceId: deviceIpAddress,
        from: mappingNode?.data?.mappedPorts?.from?.toString(),
        isUpdate: !mappingNode?.data?.isUpdate,
        mapId: e.mapId,
        pushVlan: e.pushvlan != "" ? e.pushvlan : mappingNode.data.pushVlan,
        to: mappingNode?.data?.mappedPorts?.to?.toString(),
      };
      console.log(mapData);
      dispatch(setMapData(mapData));
    }

    const updatedNodes = await nodes.forEach((node) => {
      if (node.id === mappingNode.id) {
        return mappingNode;
      }
    });
    updateCoOrdinates(updatedNodes, edges);
    setShowModal(!showModal);
  };

  const deleteMapDataByMapId = async (e) => {
    console.table(e);
    console.log(connectedNodeId.current); // Check the value of connectedNodeId.current
    console.log(typeof connectedNodeId.current); // Check the type of connectedNodeId.current

    if (connectedNodeId.current) {
      const nodeIdString = JSON.stringify(connectedNodeId.current);
      console.log(nodeIdString);
      console.log(typeof nodeIdString);
      console.log(e);
      console.log(window.document.title);
      let mapData = {
        deviceId: deviceIpAddress,
        mapId: connectedNodeId?.current?.id?.split("f")[1],
      };
      dispatch(deleteMapData(mapData));
    }
  };

  const deleteRule = (delmapid, ruleid) => {
    console.log(id, ruleid);
    let formData = {
      mapId: localStorage.getItem("mapId"),
      ruleId: ruleid.toString(),
      deviceId: deviceIpAddress,
    };
    console.log("deleting rule it ");
    dispatch(deleteRuleData(formData));
    setTimeout(() => {
      dispatch(
        getRuleData({
          mapId: localStorage.getItem("mapId"),
          deviceId: deviceIpAddress,
        })
      );
    }, 2000);
  };

  const editRule = (e) => {
    //console.log(e);
  };

  const updateCoOrdinates = (node = nodes, edge = edges) => {
    let formData = {
      deviceId: deviceIpAddress,
      nodes: node,
      links: edge,
    };
    dispatch(setInterfacesData(formData));
  };

  const configuringRule = (e) => {
    const mapRuleVal = { ...e };
    e.isUpdate = false;
    e.deviceId = deviceIpAddress;
    e.mapId = localStorage.getItem("mapId");
    const ruleObj = e;
    // const mapId = mapId;
    // const mapId = mapRuleVal.mapId;
    const ruleId = mapRuleVal.ruleId;
    // Object.keys(ruleObj).forEach((key) => {
    //   if (
    //     ruleObj[key].trim().length === 0 ||
    //     key === "mapId" ||
    //     key === "ruleId"
    //   ) {
    //     delete ruleObj[key];
    //   }
    // });
    setRuleData(localStorage.getItem("mapId"), e.ruleId);
    // dispatch(setRuleData(parseInt(mapId), ruleId, ruleObj));
    dispatch(setRuleData(ruleObj));
    setTimeout(() => {
      dispatch(
        getRuleData({
          mapId: localStorage.getItem("mapId"),
          deviceId: deviceIpAddress,
        })
      );
    }, 2000);
  };

  const ruleRes = useSelector(
    (state) => state.PacketProker_reducer.setRule_red
  );

  useEffect(() => {
    if (ruleRes && ruleRes.statusCode === 200) {
      dispatch(
        getRuleData({
          mapId: localStorage.getItem("mapId"),
          deviceId: deviceIpAddress,
        })
      );
    }
  }, [ruleRes]);

  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) =>
      setEdges((els) => updateEdge(oldEdge, newConnection, els)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = (event, node) => {
    event.preventDefault();
    const type = JSON.parse(
      event.dataTransfer.getData("application/reactflow")
    );
    const targetIsPane = event.target.classList.contains("react-flow__pane");
    if (targetIsPane) {
      const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
      type.position = project({
        x: event.clientX - left - 75,
        y: event.clientY - top,
      });
      type.draggable = true;
      setNodes((nds) => (Array.isArray(nds) ? nds.concat(type) : [type]));
      const updatedNodes = [...(nodes || []), type];
      updateCoOrdinates(updatedNodes, edges);
    }
  };

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const instance = useReactFlow();

  const interfaceCoOrdinateDataSet = useSelector(
    (state) => state.PacketProker_reducer.coOrdinateDataSet
  );

  const interfaceDataSet = useSelector(
    (state) => state.Interface_reducer.interfaceData
  );

  const coOrdinateDataSetRes = useSelector(
    (state) => state.PacketProker_reducer.addMapData
  );

  const addDynamicFilterNode = (e) => {
    //console.log(e);
    newFilterNode.position.x = e.screenX - 250;
    newFilterNode.position.y = e.screenY - 250;
    newFilterNode.data.deviceId = deviceIpAddress;
    // newFilterNode.data.mapId = deviceIpAddress
    setNodes((nds) => (nds ? nds.concat(newFilterNode) : [newFilterNode]));
    const updatedNodes = Array.isArray(nodes)
      ? [...nodes, newFilterNode]
      : [newFilterNode];
    let formData = {
      deviceId: deviceIpAddress,
      nodes: updatedNodes,
      links: edges,
    };
    dispatch(setInterfacesData(formData));
  };

  useEffect(() => {
    console.log(deviceIpAddress);
    dispatch(getInterfacesData(deviceIpAddress));
  }, [deviceIpAddress]);

  useEffect(() => {
    let key = "statusCode";

    if (
      Object.prototype.hasOwnProperty.call(interfaceCoOrdinateDataSet, key) &&
      interfaceCoOrdinateDataSet.statusCode === 400
    ) {
      setNodes([]);
      setEdges([]);
    } else {
      setNodes([]);
      setEdges([]);
      let cliMapsHighestPosition = { x: 500, y: 150 };

      if (interfaceCoOrdinateDataSet?.packetBrokerCoordinates?.nodes === null) {
        interfaceCoOrdinateDataSet.packetBrokerCoordinates.nodes = [];
      }
      if (interfaceCoOrdinateDataSet?.packetBrokerCoordinates?.links === null) {
        interfaceCoOrdinateDataSet.packetBrokerCoordinates.links = [];
      }

      interfaceCoOrdinateDataSet?.packetBrokerCoordinates?.nodes?.filter(
        (obj) => !obj.cliBased
      );

      (interfaceCoOrdinateDataSet?.mapEntityList || []).forEach(
        (cliMaps, index) => {
          console.log(cliMaps);

          // Links Generation - From
          cliMaps?.from.split(",").map((element) => {
            interfaceCoOrdinateDataSet?.packetBrokerCoordinates?.links?.push({
              source: element.replace("thernet", ""),
              sourceHandle: null,
              target: `f${cliMaps.mapId}`,
              targetHandle: null,
              markerEnd: {
                type: "arrowclosed",
                width: 20,
                height: 20,
                color: "#808080",
              },
              style: {
                strokeWidth: 1,
                stroke: "#808080",
              },
              markerStart: {
                type: "arrowclosed",
                width: 20,
                height: 20,
                color: "#808080",
              },
              id: `reactflow__edge-${element?.replace("thernet", "")}-f${
                cliMaps.mapId
              }`,
            });
          });

          // Links Generation - To
          cliMaps?.to.split(",").map((element) => {
            interfaceCoOrdinateDataSet?.packetBrokerCoordinates?.links?.push({
              source: `f${cliMaps.mapId}`,
              sourceHandle: null,
              target: element.replace("thernet", ""),
              targetHandle: null,
              markerEnd: {
                type: "arrowclosed",
                width: 20,
                height: 20,
                color: "#808080",
              },
              style: {
                strokeWidth: 1,
                stroke: "#808080",
              },
              markerStart: {
                type: "arrowclosed",
                width: 20,
                height: 20,
                color: "#808080",
              },
              id: `reactflow__edge-f${cliMaps.mapId}-${element?.replace(
                "thernet",
                ""
              )}`,
            });
          });

          // Nodes Generation
          let newFilterNode = {
            id: `f${cliMaps.mapId}`,
            cliBased: true,
            position: {
              x: 500,
              y: (index + 1) * 150,
            },
            data: {
              label: `Filter Map Id : ${cliMaps.mapId}`,
              mappedPorts: { from: [cliMaps.from], to: [cliMaps.to] },
              mapId: cliMaps.mapId,
              deviceId: deviceIpAddress,
              pushVlan: cliMaps.pushVlan,
              description: cliMaps.description,
              isUpdate: false,
              isCreated: true,
            },
            type: "customFilterNode",
            connectable: true,
            width: 179,
          };

          cliMapsHighestPosition = newFilterNode?.position;

          interfaceCoOrdinateDataSet?.packetBrokerCoordinates?.nodes?.push(
            newFilterNode
          );

          // Nodes Re-arranging between sidebar and panel with from/to ports positioning

          let yPosition = newFilterNode?.position?.y;
          let i = 0;
          let j = 0;
          console.log(
            "🚀 ~ file: PacketProkerSetup.js:1193 ~ useEffect ~ yPosition:",
            yPosition
          );
          let mappedNodesFrom = (interfaceDataSet?.interfaceList || []).forEach(
            (node, index) => {
              console.log(
                "🚀 ~ file: PacketProkerSetup.js:1196 ~ useEffect ~ index:",
                index
              );

              if (cliMaps?.from.split(",").includes(node.name)) {
                console.log(node.name);
                node.draggable = true;
                if (node && Object.keys(node).length > 0 && node?.position) {
                  console.log(node);
                  node.position.x = 150;
                  node.position.y =
                    i > 0
                      ? newFilterNode.position.y + 50 + i * 60
                      : newFilterNode.position.y + 50;
                  i++;
                } else {
                  node.position = { x: 300, y: newFilterNode.position.y };
                }
                interfaceCoOrdinateDataSet?.packetBrokerCoordinates?.nodes?.push(
                  node
                );
                // setPlottingNode(node);
              }

              if (cliMaps?.to.split(",").includes(node.name)) {
                node.draggable = true;
                if (node && Object.keys(node).length > 0 && node?.position) {
                  console.log(node);
                  node.position.x = 900;
                  node.position.y =
                    j > 0
                      ? newFilterNode.position.y + 50 + j * 60
                      : newFilterNode.position.y + 50;
                  j++;
                } else {
                  node.position = { x: 800, y: yPosition + 50 };
                }
                interfaceCoOrdinateDataSet?.packetBrokerCoordinates?.nodes?.push(
                  node
                );
                // setPlottingNode(node);
              }
            }
          );

          setPlottingNode(
            interfaceCoOrdinateDataSet?.packetBrokerCoordinates?.nodes
          );
        }
      );

      // Positioning of System based map nodes
      // interfaceCoOrdinateDataSet?.packetBrokerCoordinates?.nodes?.forEach(
      //   (node, index) => {
      //     if (node?.id?.startsWith("f") && !node.cliBased) {
      //       console.log(node);
      //       node.position = {
      //         x: 500,
      //         y: cliMapsHighestPosition.y + index + 150,
      //       };
      //     }
      //   }
      // );

      setNodes(
        interfaceCoOrdinateDataSet?.packetBrokerCoordinates?.nodes &&
          interfaceCoOrdinateDataSet?.packetBrokerCoordinates?.nodes?.length > 0
          ? [
              ...new Map(
                interfaceCoOrdinateDataSet?.packetBrokerCoordinates?.nodes?.map(
                  (v) => [v.id, v]
                )
              ).values(),
            ]
          : []
      );
      setEdges(
        interfaceCoOrdinateDataSet?.packetBrokerCoordinates?.links
          ? [
              ...new Map(
                interfaceCoOrdinateDataSet?.packetBrokerCoordinates?.links.map(
                  (v) => [v.id, v]
                )
              ).values(),
            ]
          : []
      );
      setLoading(!loading);
    }
  }, [interfaceCoOrdinateDataSet]);

  const onPaneScroll = (event) => {
    // console.log(event);
  };

  useEffect(() => {
    console.log(nodes, edges);
  }, [nodes, edges]);

  const { project } = useReactFlow();

  const onPaneContextMenu = (event) => {
    onPaneClick(event);
    setEventInstance(event);
    event.preventDefault();
    const positionChange = {
      x: event.clientX + 130,
      y: event.clientY - 200,
    };
    setXyPosistion(positionChange);
    setContextMenuOption(["Create Map"]);
    setContext(true);
  };

  const mapCreationRes = useSelector(
    (state) => state.PacketProker_reducer.mapCreationResponse
  );

  useEffect(() => {
    let key = "statusCode";
    if (
      Object.prototype.hasOwnProperty.call(mapCreationRes, key) &&
      mapCreationRes.statusCode === 400
    ) {
      const updatedNodes = (nodes || []).forEach((node) => {
        if (node.id === connectingNodeId.current) {
          node.data.mappedPorts.from = [];
          node.data.mappedPorts.to = [];
          node.data.pushVlan = "";
          node.data.description = "";
          node.data.isCreated = false;
          return node;
        }
      });
      const updatedEdges = edges.filter((edge) => {
        return ![edge.source, edge.target].includes(connectingNodeId.current);
      });
      console.log(updatedNodes, updatedEdges);
      if (nodes && nodes?.length > 0) {
        updateCoOrdinates(updatedNodes, updatedEdges);
        setTimeout(() => {
          dispatch(getInterfacesData(deviceIpAddress));
        }, 2000);
      }
    }

    if (
      Object.prototype.hasOwnProperty.call(mapCreationRes, key) &&
      mapCreationRes.statusCode === 200
    ) {
      const updatedNodes = (nodes || []).forEach((node) => {
        if (node.id === connectingNodeId.current) {
          node.data.isCreated = true;
          return node;
        }
      });

      if (nodes && nodes?.length > 0) {
        updateCoOrdinates(updatedNodes, edges);
        setTimeout(() => {
          dispatch(getInterfacesData(deviceIpAddress));
        }, 2000);
      }
    }
  }, [mapCreationRes]);

  const isValidConnection = (connection) => {
    return (
      (!connection.target.startsWith("E") ||
        !connection.source.startsWith("E")) &&
      !nodes
        .find((node) => node.id === connection.source)
        .data?.mappedPorts?.from?.includes(
          connection.target.replace("E", "Ethernet")
        ) &&
      (!connection.target.startsWith("E") ||
        !connection.source.startsWith("E")) &&
      !nodes
        .find((node) => node.id === connection.target)
        .data?.mappedPorts?.to?.includes(
          connection.source.replace("E", "Ethernet")
        )
    );
  };

  return (
    <Fragment>
      <Row>
        <div>
          <RightContext
            context={context}
            setContext={setContext}
            xYPosistion={xYPosistion}
            setXyPosistion={setXyPosistion}
            handleClick={handleClick}
            contextMenuOption={contextMenuOption}
          />
          <PortGroup
            portGroup={portGroup}
            setPortGroup={setPortGroup}
            ports={ports}
            setPorts={setPorts}
            createGroup={createGroup}
            removeGroup={removeGroup}
            groupOperation={groupOperation}
            portChannelData={portChannelData}
            setgroupOperation={setgroupOperation}
          />
          <>
            <ToastContainer autoClose={false} />
            <div style={{ marginBottom: "-40px" }}>
              <span className={styles["available-interfaces"]}>
                Available Interfaces
              </span>
            </div>
            <div className={styles.dndflow}>
              <Sidebar
                removingNode={removingNode}
                plottingNode={plottingNode}
              />
              <div className={styles.wrapper} ref={reactFlowWrapper}>
                {/* {loading ? ( */}
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  onConnectStart={onConnectStart}
                  onConnectEnd={onConnectEnd}
                  onSelectionContextMenu={onSelectionContextMenu}
                  onNodeContextMenu={onNodeContextMenu}
                  onNodeClick={onNodeClick}
                  isValidConnection={isValidConnection}
                  nodeTypes={nodeTypes}
                  zoomOnScroll={false}
                  onPaneClick={onPaneClick}
                  onEdgeContextMenu={onEdgeContextMenu}
                  onPaneContextMenu={onPaneContextMenu}
                  onEdgeUpdate={onEdgeUpdate}
                  onNodeDragStart={onNodeDragStart}
                  onNodeDragStop={onNodeDragStop}
                  //onSelectionChange={onSelectionChange}
                  panOnScrollMode={PanOnScrollMode.Vertical}
                  fitView={false}
                  panOnScroll={true}
                  onPaneScroll={onPaneScroll}
                  selectionOnDrag={true}
                  maxZoom={1}
                  minZoom={1}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                >
                  <Background color="#00000" variant="none" />
                  <Panel className="" position="top-left">
                    Network Ports
                  </Panel>
                  <Panel
                    position="top-center"
                    className="d-flex align-items-center"
                  >
                    Filters &nbsp;
                    <Button
                      variant="success"
                      size="sm"
                      onClick={addDynamicFilterNode}
                    >
                      <i className="ri-add-line align-bottom me-1"></i> Add
                    </Button>
                  </Panel>
                  <Panel position="top-right">Tool Ports</Panel>
                </ReactFlow>
                {/* ) : (
                  ""
                )} */}
              </div>
            </div>
            {/* ) : (
            <Row className="justify-content-center mt-2">
              <Col sm={4}>
                <div
                  className="mt-2 p-4 text-center"
                  style={{ background: "white" }}
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/tqywkdcz.json"
                    trigger="hover"
                    style={{ width: "150px", height: "150px" }}
                  ></lord-icon>
                  <img
                    src={notfound}
                    width="140"
                    alt="Mac"
                    className="img-fluid"
                  />
                  <h4 className="mb-3 mt-4">
                    No interface for {deviceIpAddress}
                  </h4>
                  <p className="text-muted fs-15 mb-4">
                    Currently we do not have any interface for device IP{" "}
                    {deviceIpAddress}
                  </p>
                  <div className="hstack gap-2 justify-content-center">
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        history("/devices");
                        setShowDeviceSelection(true);
                        setInitNodes([]);
                      }}
                    >
                      Back to Devices
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          )} */}
          </>
          <Modals
            showModal={showModal}
            setShowModal={setShowModal}
            mapGeneralData={mapGeneralData}
            portChannelData={portChannelData}
            setMapGeneralData={setMapGeneralData}
            mapRuleData={mapRuleData}
            setMapRuleData={setMapRuleData}
            defaultMapId={currentMapId}
            configuringMap={configuringMap}
            deleteMapDataByMapId={deleteMapDataByMapId}
            configuringRule={configuringRule}
            deleteRule={deleteRule}
            editRule={editRule}
            showFilterCriteria={showFilterCriteria}
            setShowFilterCriteria={setShowFilterCriteria}
          />
        </div>
      </Row>
    </Fragment>
  );
};

export default function PacketProkerSetup(props) {
  return (
    <ReactFlowProvider>
      <DeviceManagentSetupFlow />
    </ReactFlowProvider>
  );
}
