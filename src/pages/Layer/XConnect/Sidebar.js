import { DragEvent, useEffect, useState } from "react";

import styles from "./dnd.module.css";
import { getInterfaceData } from "../../../store/Interfaces/action";
import { useSelector, useDispatch } from "react-redux";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { UncontrolledTooltip } from "reactstrap";

import { useNavigate, useParams } from "react-router-dom";

const Sidebar = (props) => {
  const deviceIpAddress = useParams().id;
  const deviceName = useParams().osVersion;
  const [interfaceList, setInterfacesList] = useState([]);
  const [interfaceListSearch, setInterfacesListSearch] = useState([]);
  const [searchList, setSearchList] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInterfaceData(deviceIpAddress));
  }, []);

  const interfaceDataSet = useSelector(
    (state) => state.Interface_reducer.interfaceData
  );

  const onDragStart = (event, nodeType) => {
    nodeType.draggable = true;
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(nodeType)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  useEffect(() => {
    if (props.plottingNode != undefined && props.plottingNode.length > 0) {
      let plottingNodeId = [];
      let fn = [];
      props.plottingNode.map((node) => plottingNodeId.push(node.id));
      fn = interfaceList?.filter((word) => !plottingNodeId.includes(word.id));
      setInterfacesList(fn);
    } else {
      postFn();
    }
  }, [interfaceDataSet, props.plottingNode]);

  const postFn = () => {
    // if (interfaceCoOrdinateDataSet.message != "") console.log(deviceName);
    if (deviceName == "goldstone" || deviceName == "sonic") {
      (interfaceDataSet.interfaceList || []).map((interfaces, index) => {
        interfaces["id"] = `E${index}`;
        interfaces.type = "customInterfaceNode";
        interfaces.position = { x: 80, y: index * 75 + 75 };
        interfaces.data = {
          label: interfaces.name,
          size: interfaces.port_speed,
          operationStatus: interfaces.operationStatus,
          deviceId: deviceIpAddress,
        };
        interfaces.selectable = true;
        interfaces.draggable = false;
      });
      setInterfacesList(interfaceDataSet.interfaceList);
      setInterfacesListSearch(interfaceDataSet.interfaceList);
    } else {
      // setNodes([]);
    }
  };

  useEffect(() => {
    if (Object.keys(props.removingNode).length > 0) {
      setInterfacesList((interfaceList) => {
        interfaceList?.filter((element, index) => {
          if (element.id === props?.removingNode?.id) {
            element.draggable = false;
          }
        });
        return interfaceList; // Return the current interfaceList without any changes
      });
    }
  }, [props.removingNode]);

  const searchByEthernetName = (val) => {
    console.log(val, typeof val, !val);
    console.log(interfaceList);
    if (!val) {
      setSearchList(false);
      setInterfacesList(interfaceList);
    } else {
      setSearchList(true);
      setInterfacesListSearch(
        interfaceList?.filter((ethernet) => ethernet.name.includes(val))
      );
    }
  };

  return (
    <>
      <aside className={styles.aside}>
        <div className="px-2" style={{ width: "24vw" }}>
          <div className="search-box ms-2">
            <input
              type="text"
              className="form-control search"
              placeholder="Search..."
              id="searchdevicelist"
              onChange={(e) => searchByEthernetName(e.target.value)}
            />
            <i className="ri-search-line search-icon"></i>
          </div>
        </div>
        <UncontrolledTooltip placement="bottom" target="searchdevicelist">
          Search Interfaces
        </UncontrolledTooltip>
        {!searchList ? (
          <>
            {" "}
            {interfaceList?.length > 0 &&
              interfaceList?.map((node) => (
                <div
                  className="react-flow__node-input"
                  key={node.id}
                  onDragStart={(event) => onDragStart(event, node)}
                  draggable
                  hidden={node.draggable}
                >
                  {node.operationStatus?.toString().toLowerCase() === "up" ? (
                    <AiFillCaretUp
                      className="fs-2"
                      style={{ color: "green" }}
                    />
                  ) : (
                    <AiFillCaretDown
                      className="fs-2"
                      style={{ color: "red" }}
                    />
                  )}{" "}
                  {node.name}
                </div>
              ))}
          </>
        ) : (
          <>
            {" "}
            {interfaceListSearch?.length > 0 &&
              interfaceListSearch?.map((node) => (
                <div
                  className="react-flow__node-input"
                  key={node.id}
                  onDragStart={(event) => onDragStart(event, node)}
                  draggable
                  hidden={node.draggable}
                >
                  {node.operationStatus?.toString().toLowerCase() === "up" ? (
                    <AiFillCaretUp
                      className="fs-2"
                      style={{ color: "green" }}
                    />
                  ) : (
                    <AiFillCaretDown
                      className="fs-2"
                      style={{ color: "red" }}
                    />
                  )}{" "}
                  {node.name}
                </div>
              ))}
          </>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
