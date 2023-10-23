// import React, { useCallback, useState, useRef, useEffect } from "react";
// import GridTable from "./GritTable";
// import { Grid, _ } from "gridjs-react";
// import Select from 'react-select';

// //redux
// import { useSelector, useDispatch } from "react-redux";
// import {
//   Form,
//   Button,
//   FloatingLabel,
//   Row,
//   Col,
//   Table,
//   ButtonGroup,
// } from "react-bootstrap";
// import { MdModeEditOutline, MdDelete } from "react-icons/md";

// import {
//   getRuleData,
//   getOneRuleData,
//   setRuleData,
// } from "../../../store/PacketProker/action";
// import { useParams } from "react-router-dom";
// import {
//   getInterfaceData,
//   getInterfaceConfigDatas,
// } from "../../../store/Interfaces/action";
// import {
//   setMapData,

// } from "../../../store/PacketProker/action";
// export default function FilterPopup({
//   sectionName,
//   mapRuleData,
//   setMapRuleData,
//   mapGeneralData,
//   setMapGeneralData,
//   configuringMap,
//   // currentmapid,
//   configuringRule,
//   deleteRule,
//   editRule,
// }) {
//   // const useEffect
//   const dispatch = useDispatch();
//   const formRef = useRef(null);

//   const [key, setKey] = useState(sectionName);
//   const [isEdit, setIsEdit] = useState(false);
//   const [delruleconfig, setDelruleconfig] = useState({ id: null });
//   const [mapGeneral, setMapGeneral] = useState({
//     mapId: "",
//     pushvlan: "",
//     description: "",
//   });
//   const [isReadOnly, setIsReadOnly] = useState(false);
//   const currentMapId = mapRuleData?.mapId;
//   const deviceIpAddress = useParams().id;


//   const { getRule_red, getOneRule_red } = useSelector((state) => ({
//     getRule_red: state.PacketProker_reducer.getRule_red,
//     getOneRule_red: state.PacketProker_reducer.getOneRule_red,
//   }));
//   console.log(
//     "🚀 ~ file: Filter-Popup.js:58 ~ const{getRule_red,getOneRule_red}=useSelector ~ getRule_red:",
//     getRule_red
//   );
//   const { addMapData } = useSelector((state) => ({
//     addMapData: state.PacketProker_reducer.addMapData,
//   }));

//   var rulesList;
//   if (getRule_red != []) { ;
// }

// console.log(configFilter);

// const [selected, setSelected] = useState(true);
// const [statChecked, setStatChecked] = useState(true);
// const [actionChecked, setActionChecked] = useState(true);
// const interfaceList = useSelector((state) => state.Interface_reducer?.interfaceData?.interfaceList);
// const interfaceNamesArray = interfaceList ? interfaceList.map((interfaceItem) => interfaceItem.name) : [];


// const [createMapformData, setCreateMapFormData] = useState({
//   deviceId: deviceIpAddress,
//   mapId: '',
//   to: [],
//   from: [],
//   description: '',
//   pushVlan: '',
//   isUpdate: false,
// });

// const networkPortsOptions = interfaceNamesArray.filter((name) => !createMapformData?.from?.includes(name)).map((name) => ({ value: name, label: name }));

// const toolPortsOptions = interfaceNamesArray.filter((name) => !createMapformData?.to?.includes(name)).map((name) => ({ value: name, label: name }));



// const handleFormInputChange = (event) => {
//   const { name, value } = event.target;
//   setCreateMapFormData((prevData) => ({
//     ...prevData,
//     [name]: value,
//   }));
// };

// const handleNetworkPortsChange = (selectedOptions) => {
//   const selectedValues = selectedOptions.map((option) => option.value).join(',');
//   setCreateMapFormData((prevData) => ({
//     ...prevData,
//     from: selectedValues,
//   }));
// };


// const handleToolPortsChange = (selectedOptions) => {
//   const selectedValues = selectedOptions.map((option) => option.value).join(',');
//   setCreateMapFormData((prevData) => ({
//     ...prevData,
//     to: selectedValues
//   }));
// };

// //console.log(currentmapid != undefined ? currentmapid : null)
// const [ruleForm, setRuleForm] = useState({
//   mapid: "",
//   ruleId: null,
//   action: "permit",
//   srcmac: "",
//   destmac: "",
//   vlan: "",
//   ethertype: "",
//   ipdst: "",
//   srcipv6: "",
//   smask: "",
//   dstipv6: "",
//   dmask: "",
//   ttl: "",
//   src_l4port: "",
//   dst_l4port: "",
//   protocol: "",
//   stats: "disabled",
//   //match_all: "disable",
// });

// const BrokerUpdateRuleDataSet = useSelector(
//   (state) => state?.PacketProker_reducer?.getOneRule_red
// );

// // console.log("%c⧭", "color: #00e600", BrokerUpdateRuleDataSet);

// const [brokerRequestBody, setBrokerRequestBody] = useState({
//   counters: "",
//   map_id: "",
//   rule_id: "",
//   stats: "",
//   action: "",
//   srcmac: "",
//   destmac: "",
//   ethertype: "",
//   ipdst: "",
//   ipsrc: "",
//   srcipv6: "",
//   smask: "",
//   dstipv6: "",
//   dmask: "",
//   ttl: "",
//   src_l4port: "",
//   dst_l4port: "",
//   protocol: "",
// });

// // console.log("brokerRequestBodyPPPPPPPPPP", brokerRequestBody);

// useEffect(() => {
//   if (
//     BrokerUpdateRuleDataSet &&
//     Object.keys(BrokerUpdateRuleDataSet)?.length > 0
//   ) {
//     setBrokerRequestBody((prevState) => ({
//       ...prevState,
//       counters: BrokerUpdateRuleDataSet?.counters,
//       map_id: BrokerUpdateRuleDataSet?.map_id,
//       rule_id: BrokerUpdateRuleDataSet?.ruleId,
//       stats: BrokerUpdateRuleDataSet?.stats,
//       action: BrokerUpdateRuleDataSet?.action,
//       srcmac: BrokerUpdateRuleDataSet?.srcmac,
//       destmac: BrokerUpdateRuleDataSet?.destmac,
//       ethertype: BrokerUpdateRuleDataSet?.ethertype,
//       ipdst: BrokerUpdateRuleDataSet?.ipdst,
//       ipsrc: BrokerUpdateRuleDataSet?.ipsrc,
//       srcipv6: BrokerUpdateRuleDataSet?.srcipv6,
//       smask: BrokerUpdateRuleDataSet?.smask,
//       dstipv6: BrokerUpdateRuleDataSet?.dstipv6,
//       dmask: BrokerUpdateRuleDataSet?.dmask,
//       ttl: BrokerUpdateRuleDataSet?.ttl,
//       src_l4port: BrokerUpdateRuleDataSet?.src_l4port,
//       dst_l4port: BrokerUpdateRuleDataSet?.dst_l4port,
//       protocol: BrokerUpdateRuleDataSet?.protocol,
//     }));
//   }
// }, [BrokerUpdateRuleDataSet]);

// const [editRuleForm, setEditRuleForm] = useState({
//   update_ruleId:
//     getOneRule_red.rules != undefined
//       ? getOneRule_red.rules[0].rule_id
//       : null,
//   update_action:
//     getOneRule_red.rules != undefined ? getOneRule_red.rules[0].action : "",
//   update_srcmac:
//     getOneRule_red.rules != undefined ? getOneRule_red.rules[0].srcmac : "",
//   update_destmac: "",
//   update_vlan: "",
//   update_ethertype: "",
//   update_ipdst: "",
//   update_ipsrc:
//     getOneRule_red.rules != undefined ? getOneRule_red.rules[0].ipsrc : "",
//   update_srcipv6: "",
//   update_smask: "",
//   update_dstipv6: "",
//   update_dmask: "",
//   update_ttl: "",
//   update_src_l4port: "",
//   update_dst_l4port: "",
//   update_protocol: "",
//   update_stats:
//     getOneRule_red.rules != undefined ? getOneRule_red.rules[0].stats : "",
//   update_match_all:
//     getOneRule_red.rules != undefined
//       ? getOneRule_red.rules[0].match_all
//       : "",
// });

// const onFormSubmit = () => {
//   //console.log(ruleForm);
// };

// const onInput = (value, id) => {
//   setRuleForm({
//     ...ruleForm,
//     [id]: value,
//   });
// };

// const handleChange = (e) => {
//   e.persist();
//   setEditRuleForm((prevState) => ({
//     ...prevState,
//     kindOfStand: e.target.value,
//   }));
// };

// const onEditInput = (value, id) => {
//   setEditRuleForm({
//     ...editRuleForm,
//     [id]: value,
//   });
// };

// const onMapGeneralInput = (value, id) => {
//   setMapGeneral({
//     ...mapGeneral,
//     [id]: value,
//   });
// };
// const onDelRuleInput = (ruleid) => {
//   setDelruleconfig(ruleid);
// };

// const availableFilterOutput = (value, laneKey, portKey) => {
//   setRuleForm((prevState) => ({
//     ...prevState,
//     [laneKey]: {
//       ...prevState[laneKey],
//       [portKey]: value,
//     },
//   }));
// };

// const onEditRules = (id, editid) => {
//   // console.log("Edit", id, mapRuleData.mapId);
//   //console.log(editid);
//   console.log(currentMapId);
//   dispatch(
//     getOneRuleData({
//       mapId: localStorage.getItem("mapId"),
//       ruleId: id.toString(),
//       deviceId: deviceIpAddress,
//     })
//   );
//   setIsEdit(true);
// };

// const ruleInfoEdit = useSelector(
//   (state) => state.PacketProker_reducer.getOneRule_red
// );

// // const ruleInfoEdit = useSelector(
// //   (state) => state?.PacketProker_reducer?.getOneRule_red
// //   // setMapRuleData((ruleData) => ({
// //   //   ...ruleData,
// //   //   state.PacketProker_reducer.getOneRule_red[0]
// //   // }))
// //   // setMapRuleData(state.PacketProker_reducer.getOneRule_red.rules[0])
// // );

// // const populateRuleDataForEdit = () => {
// //   setMapRuleData((ruleData) => ({
// //     ...ruleData,
// //     ruleInfoEdit,
// //   }));
// // };

// // useEffect(() => {
// //   setMapRuleData((ruleData) =>
// //     ({
// //       ...ruleData,
// //       ruleId: ruleInfoEdit.rules[0].rule_id,
// //       ipsrc: ruleInfoEdit.rules[0].ipsrc,
// //     })
// //   );
// // }, [ruleInfoEdit]);

// // console.log(ruleInfoEdit.rules[0]);
// // console.log(ruleInfoEdit.rules[0].ipsrc);

// // useEffect(() => {
// //   //console.log(ruleForm);
// //   //dispatch(getRuleData(""))
// // }, [ruleForm]);

// const updateRule = (ruleInfo) => {
//   ruleInfo.isUpdate = true;
//   ruleInfo.deviceId = deviceIpAddress;
//   ruleInfo.mapId = localStorage.getItem("mapId");
//   dispatch(setRuleData(ruleInfo));
//   dispatch(setMapData(createMapformData));
//   setTimeout(() => {
//     dispatch(
//       getRuleData({
//         mapId: localStorage.getItem("mapId"),
//         deviceId: deviceIpAddress,
//       })
//     );
//   }, 2000);
//   setIsEdit(!isEdit);
//   editRule(ruleInfo);
// };

// const handleCreateMap = () => {
//   dispatch(setMapData(createMapformData));
//   setCreateMapFormData({
//     mapid: '',
//     from: "",
//     to: "",
//     description: '',
//     pushVlan: '',
//   });
// };

// const ruleRes = useSelector(
//   (state) => state.PacketProker_reducer.setRule_red
// );

// useEffect(() => {
//   if (ruleRes && ruleRes.statusCode === 200) {
//     dispatch(
//       getRuleData({
//         mapId: localStorage.getItem("mapId"),
//         deviceId: deviceIpAddress,
//       })
//     );
//   }
// }, [ruleRes]);


// switch (key) {
//   case "general":
//     return (
//       <div>
//         <Row className="d-flex flex-column justify-content-between">
//           <Row>
//             <div className="col-2">
//               <label>Map ID</label>
//               <FloatingLabel  >
//                 <Form.Control
//                   type="text"
//                   placeholder="mapId"
//                   name="mapId"
//                   value={createMapformData.mapID}
//                   onChange={handleFormInputChange}
//                 />
//               </FloatingLabel>
//             </div>
//             <div className="col-5">
//               <label>Network Port</label>
//               <FloatingLabel>
//                 <Select
//                   isMulti
//                   placeholder="Select network ports"
//                   // value={createMapformData?.from?.map((name) => ({ value: name, label: name }))}
//                   options={toolPortsOptions}
//                   onChange={handleNetworkPortsChange}
//                 />
//               </FloatingLabel>
//             </div>
//             <div className="col-5">
//               <label>Tool Port</label>
//               <FloatingLabel>
//                 <Select
//                   isMulti
//                   placeholder="Select tool ports"
//                   // value={createMapformData?.to?.map((name) => ({ value: name, label: name }))}
//                   options={networkPortsOptions}
//                   onChange={handleToolPortsChange}
//                 />
//               </FloatingLabel>
//             </div>
//           </Row>
//           <Row>
//             <div className="col-12 mt-2">
//               <FloatingLabel controlId="floatingInput" label="Description">
//                 <Form.Control
//                   type="textarea"
//                   placeholder="description"
//                   name="description"
//                   value={createMapformData.description}
//                   onChange={handleFormInputChange}
//                 />
//               </FloatingLabel>
//             </div>
//             <div className="col-12 mt-2">
//               <FloatingLabel controlId="floatingInput" label="Push Vlan">
//                 <Form.Control
//                   type="number"
//                   placeholder="push-vlan"
//                   name="pushVlan"
//                   value={createMapformData.pushVlan}
//                   onChange={handleFormInputChange}
//                 />
//               </FloatingLabel>
//             </div>
//           </Row>
//         </Row>
//         <Row>
//           <Col>
//             <div className="d-grid gap-2 mt-2">

//               {/*                
//                 <Button
//                   variant="primary"
//                   type="submit"
//                   onClick={() => configuringMap(mapGeneral, "update")}
//                 >
//                   Update
//                 </Button> */}

//               <Button
//                 variant="primary"
//                 type="submit"
//                 onClick={handleCreateMap}
//               >
//                 Create
//               </Button>

//             </div>
//           </Col>
//           {/* <Col>
//             <div className="d-grid gap-2">
//               <Button
//                 variant="info"
//                 type="submit"
//                 onClick={() => alert("On edit function")}
//               >
//                 Edit
//               </Button>
//             </div>
//           </Col>
//           <Col>
//             <div className="d-grid gap-2">
//               <Button
//                 variant="danger"
//                 type="submit"
//                 onClick={() => alert("On delete function")}
//               >
//                 Delete
//               </Button>
//             </div>
//           </Col> */}
//         </Row>
//       </div>
//     );
//   case "filterCriteria":
//     return (
//       <>
//         <Row>
//           {isEdit == false ? (
//             <>
//               <Col lg="4">
//                 <Form name="ruleForm" ref={formRef}>
//                   <Form.Group>
//                     <Col>
//                       <FloatingLabel
//                         controlId="floatingInput"
//                         label="Map ID"
//                         className="mb-3"
//                       >
//                         <Form.Control
//                           type="number"
//                           // defaultValue={currentmapid != "" ? currentmapid : null}
//                           value={localStorage.getItem("mapId")}
//                           name="mapid"
//                           placeholder="name"
//                           lg="sm"
//                           readonly
//                         />
//                       </FloatingLabel>
//                     </Col>
//                     <Col>
//                       <FloatingLabel
//                         controlId="floatingInput"
//                         label="Rule ID"
//                         className="mb-3"
//                       >
//                         <Form.Control
//                           type="text"
//                           // defaultValue={mapRuleData.rule_id}
//                           onChange={(event) => {
//                             setMapRuleData((ruleData) => ({
//                               ...ruleData,
//                               ruleId: event.target.value,
//                               stats: "disabled",
//                               action: "permit",
//                               mapId: currentMapId,
//                             }));
//                             console.log("RULE_ID", mapRuleData);
//                             onInput(event.target.value, "ruleId");
//                           }}
//                           name="ruleId"
//                           placeholder="name"
//                           size="sm"
//                         />
//                       </FloatingLabel>
//                     </Col>
//                     <Col>
//                       <div key="inline-radio" className="mb-3">
//                         <span className="fw-bold">Stats : </span> &nbsp;
//                         <Form.Check
//                           inline
//                           label="Enable"
//                           type="radio"
//                           id="enable"
//                           name="stats"
//                           value="enabled"
//                           onChange={(event) => {
//                             setMapRuleData((ruleData) => ({
//                               ...ruleData,
//                               stats: event.target.value,
//                             }));
//                             onInput(event.target.value, "stats");
//                           }}
//                         />
//                         <Form.Check
//                           inline
//                           label="Disable"
//                           type="radio"
//                           name="stats"
//                           value="disabled"
//                           id="disable"
//                           defaultChecked={statChecked}
//                           onChange={(event) => {
//                             setMapRuleData((ruleData) => ({
//                               ...ruleData,
//                               stats: event.target.value,
//                             }));
//                             onInput(event.target.value, "stats");
//                           }}
//                         />
//                       </div>
//                     </Col>

//                     <Col>
//                       <div key="inline-radio" className="mb-1">
//                         <span className="fw-bold">Action : </span> &nbsp;
//                         <Form.Check
//                           inline
//                           label="Permit"
//                           type="radio"
//                           id="permit"
//                           name="action"
//                           value="permit"
//                           defaultChecked={actionChecked}
//                           onChange={(event) => {
//                             setMapRuleData((ruleData) => ({
//                               ...ruleData,
//                               action: event.target.value,
//                             }));
//                             onInput(event.target.value, "action");
//                           }}
//                         />
//                         <Form.Check
//                           inline
//                           label="Deny"
//                           type="radio"
//                           name="action"
//                           value="deny"
//                           id="deny"
//                           onChange={(event) => {
//                             setMapRuleData((ruleData) => ({
//                               ...ruleData,
//                               action: event.target.value,
//                             }));
//                             onInput(event.target.value, "action");
//                           }}
//                         />
//                       </div>
//                     </Col>
//                     <br />
//                     <Table striped bordered hover>
//                       <thead>
//                         <tr>
//                           <th colSpan={4}>Available Filters</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         <tr>
//                           <td>L2</td>
//                           <td>
//                             <Form.Label>SMAC</Form.Label>
//                             <Form.Control
//                               name="srcmac"
//                               type="input"
//                               id="srcmac"
//                               disabled={isReadOnly}
//                               onChange={(event) => {
//                                 setMapRuleData((ruleData) => ({
//                                   ...ruleData,
//                                   srcmac: event.target.value,
//                                 }));
//                                 onInput(event.target.value, "srcmac");
//                               }}
//                             />
//                           </td>
//                           <td>
//                             <Form.Label>DMAC</Form.Label>
//                             <Form.Control
//                               name="destmac"
//                               type="input"
//                               id="destmac"
//                               disabled={isReadOnly}
//                               onChange={(event) => {
//                                 setMapRuleData((ruleData) => ({
//                                   ...ruleData,
//                                   destmac: event.target.value,
//                                 }));
//                                 onInput(event.target.value, "destmac");
//                               }}
//                             />
//                           </td>
//                           <td>
//                             <Form.Label>Ether Type</Form.Label>
//                             <Form.Control
//                               name="ethertype"
//                               type="input"
//                               id="ethertype"
//                               disabled={isReadOnly}
//                               onChange={(event) => {
//                                 setMapRuleData((ruleData) => ({
//                                   ...ruleData,
//                                   ethertype: event.target.value,
//                                 }));
//                                 onInput(event.target.value, "ethertype");
//                               }}
//                             />
//                           </td>
//                         </tr>
//                         <tr rowSpan={4}>
//                           <td>L3</td>
//                           <td colSpan={3}>
//                             <tr>
//                               <td>
//                                 <Form.Label>DIP</Form.Label>
//                                 <Form.Control
//                                   name="ipdst"
//                                   type="input"
//                                   id="ipdst"
//                                   disabled={isReadOnly}
//                                   onChange={(event) => {
//                                     setMapRuleData((ruleData) => ({
//                                       ...ruleData,
//                                       ipdst: event.target.value,
//                                     }));
//                                     onInput(event.target.value, "ipdst");
//                                   }}
//                                 />
//                               </td>
//                               <td>
//                                 <Form.Label>SIP</Form.Label>
//                                 <Form.Control
//                                   name="ipsrc"
//                                   type="input"
//                                   id="ipsrc"
//                                   disabled={isReadOnly}
//                                   // defaultValue={mapRuleData.ipsrc}
//                                   onChange={(event) => {
//                                     setMapRuleData((ruleData) => ({
//                                       ...ruleData,
//                                       ipsrc: event.target.value,
//                                     }));
//                                     onInput(event.target.value, "ipsrc");
//                                   }}
//                                 />
//                               </td>
//                               <td>
//                                 <Form.Label>SIP V6</Form.Label>
//                                 <Form.Control
//                                   name="srcipv6"
//                                   type="input"
//                                   id="srcipv6"
//                                   disabled={isReadOnly}
//                                   onChange={(event) => {
//                                     setMapRuleData((ruleData) => ({
//                                       ...ruleData,
//                                       srcipv6: event.target.value,
//                                     }));
//                                     onInput(event.target.value, "srcipv6");
//                                   }}
//                                 />
//                               </td>
//                               <td>
//                                 <Form.Label>SMASK </Form.Label>
//                                 <Form.Control
//                                   name="smask"
//                                   type="input"
//                                   id="smask"
//                                   disabled={isReadOnly}
//                                   onChange={(event) => {
//                                     setMapRuleData((ruleData) => ({
//                                       ...ruleData,
//                                       smask: event.target.value,
//                                     }));
//                                     onInput(event.target.value, "smask");
//                                   }}
//                                 />
//                               </td>
//                             </tr>
//                             <br />
//                             <tr>
//                               <td>
//                                 <Form.Label>DIP V6</Form.Label>
//                                 <Form.Control
//                                   name="dstipv6"
//                                   type="input"
//                                   id="dstipv6"
//                                   disabled={isReadOnly}
//                                   onChange={(event) => {
//                                     setMapRuleData((ruleData) => ({
//                                       ...ruleData,
//                                       dstipv6: event.target.value,
//                                     }));
//                                     onInput(event.target.value, "dstipv6");
//                                   }}
//                                 />
//                               </td>
//                               <td>
//                                 <Form.Label>DMASK</Form.Label>
//                                 <Form.Control
//                                   name="dmask"
//                                   type="input"
//                                   id="dmask"
//                                   disabled={isReadOnly}
//                                   onChange={(event) => {
//                                     setMapRuleData((ruleData) => ({
//                                       ...ruleData,
//                                       dmask: event.target.value,
//                                     }));
//                                     onInput(event.target.value, "dmask");
//                                   }}
//                                 />
//                               </td>
//                               <td>
//                                 <Form.Label>TTL</Form.Label>
//                                 <Form.Control
//                                   name="ttl"
//                                   type="input"
//                                   id="ttl"
//                                   disabled={isReadOnly}
//                                   onChange={(event) => {
//                                     setMapRuleData((ruleData) => ({
//                                       ...ruleData,
//                                       ttl: event.target.value,
//                                     }));
//                                     onInput(event.target.value, "ttl");
//                                   }}
//                                 />
//                               </td>
//                             </tr>
//                           </td>
//                         </tr>
//                         <tr>
//                           <td>L4</td>
//                           <td>
//                             <Form.Label>S Port</Form.Label>
//                             <Form.Control
//                               name="src_l4port"
//                               type="input"
//                               id="src_l4port"
//                               disabled={isReadOnly}
//                               onChange={(event) => {
//                                 setMapRuleData((ruleData) => ({
//                                   ...ruleData,
//                                   src_l4port: event.target.value,
//                                 }));
//                                 onInput(event.target.value, "src_l4port");
//                               }}
//                             />
//                           </td>
//                           <td>
//                             <Form.Label>D Port</Form.Label>
//                             <Form.Control
//                               name="dst_l4port"
//                               type="input"
//                               id="dst_l4port"
//                               disabled={isReadOnly}
//                               onChange={(event) => {
//                                 setMapRuleData((ruleData) => ({
//                                   ...ruleData,
//                                   dst_l4port: event.target.value,
//                                 }));
//                                 onInput(event.target.value, "dst_l4port");
//                               }}
//                             />
//                           </td>
//                           <td>
//                             <Form.Label>Protocol</Form.Label>
//                             <Form.Control
//                               name="protocol"
//                               type="input"
//                               id="protocol"
//                               disabled={isReadOnly}
//                               onChange={(event) => {
//                                 setMapRuleData((ruleData) => ({
//                                   ...ruleData,
//                                   protocol: event.target.value,
//                                 }));
//                                 onInput(event.target.value, "protocol");
//                               }}
//                             />
//                           </td>
//                         </tr>
//                       </tbody>
//                     </Table>
//                     <br />
//                     <Row>
//                       <Col>
//                         <div className="d-grid gap-2">
//                           <Button
//                             variant="secondary"
//                             onClick={() => {
//                               setMapRuleData({});
//                               formRef.current.reset();
//                             }}
//                           >
//                             Reset
//                           </Button>
//                         </div>
//                       </Col>
//                       <Col>
//                         <div className="d-grid gap-2">
//                           <Button
//                             variant="primary"
//                             onClick={() => {
//                               console.log(mapRuleData);
//                               configuringRule(mapRuleData);
//                               setMapRuleData({});
//                               formRef.current.reset();
//                             }}
//                           >
//                             Add Rule
//                           </Button>
//                         </div>
//                       </Col>
//                     </Row>
//                   </Form.Group>
//                 </Form>
//               </Col>
//             </>
//           ) : (
//             <>
//               {getOneRule_red != undefined ? (
//                 <>
//                   {/* <span>edit page</span> */}
//                   <Col>
//                     <Form name="ruleForm">
//                       <Form.Group>
//                         <Col>
//                           <FloatingLabel
//                             controlId="floatingInput"
//                             label="Rule ID"
//                             className="mb-3"
//                           >
//                             <Form.Control
//                               type="text"
//                               name="rule_id"
//                               readOnly
//                               Value={brokerRequestBody?.rule_id}
//                               placeholder="name"
//                               size="sm"
//                             />
//                           </FloatingLabel>
//                         </Col>
//                         {/* <Col md>
//                           <div key="inline-radio" className="mb-3">
//                             <span className="fw-bold">Match All : </span>
//                             <Form.Check
//                               inline
//                               label="Enable"
//                               type="radio"
//                               id="update_match_all"
//                               name="update_match_all"
//                               value="enable"
//                               checked={
//                                 editRuleForm.update_match_all === "enable"
//                               }
//                               onChange={(event) => {
//                                 setIsReadOnly(true);
//                                 onEditInput(
//                                   event.target.value,
//                                   "update_match_all"
//                                 );
//                               }}
//                             />
//                             <Form.Check
//                               inline
//                               label="Disable"
//                               type="radio"
//                               name="update_match_all"
//                               value="disable"
//                               id="update_match_all"
//                               checked={
//                                 editRuleForm.update_match_all === "disable"
//                               }
//                               onChange={(event) => {
//                                 setIsReadOnly(false);
//                                 onEditInput(
//                                   event.target.value,
//                                   "update_match_all"
//                                 );
//                               }}
//                             />
//                           </div>
//                         </Col> */}

//                         <Col>
//                           <div key="inline-radio" className="mb-3">
//                             <span className="fw-bold">Stats : </span> &nbsp;
//                             <Form.Check
//                               inline
//                               label="Enable"
//                               type="radio"
//                               id="update_stats"
//                               name="stats"
//                               value="enabled"
//                               checked={brokerRequestBody?.stats === "enabled"}
//                               onChange={(e) => {
//                                 setBrokerRequestBody({
//                                   ...brokerRequestBody,
//                                   stats: e.target.value,
//                                 });
//                               }}
//                             />
//                             <Form.Check
//                               inline
//                               label="Disable"
//                               type="radio"
//                               name="stats"
//                               value="disabled"
//                               checked={
//                                 brokerRequestBody?.stats === "disabled"
//                               }
//                               onChange={(e) => {
//                                 setBrokerRequestBody({
//                                   ...brokerRequestBody,
//                                   stats: e.target.value,
//                                 });
//                               }}
//                             />
//                           </div>
//                         </Col>

//                         <Col>
//                           <div key="inline-radio" className="mb-1">
//                             <span className="fw-bold">Action : </span> &nbsp;
//                             <Form.Check
//                               inline
//                               label="Permit"
//                               type="radio"
//                               id="permit"
//                               name="action"
//                               value="permit"
//                               checked={brokerRequestBody?.action === "permit"}
//                               onChange={(e) => {
//                                 setBrokerRequestBody({
//                                   ...brokerRequestBody,
//                                   action: e.target.value,
//                                 });
//                               }}
//                             />
//                             <Form.Check
//                               inline
//                               label="Deny"
//                               type="radio"
//                               name="action"
//                               value="deny"
//                               id="deny"
//                               checked={brokerRequestBody?.action === "deny"}
//                               onChange={(e) => {
//                                 setBrokerRequestBody({
//                                   ...brokerRequestBody,
//                                   stats: e.target.value,
//                                 });
//                               }}
//                             />
//                           </div>
//                         </Col>
//                         <br />
//                         <Table striped bordered hover>
//                           <thead>
//                             <tr>
//                               <th colSpan={4}>Available Filters</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             <tr>
//                               <td>L2</td>
//                               <td>
//                                 <Form.Label>SMAC</Form.Label>
//                                 <Form.Control
//                                   name="srcmac"
//                                   type="input"
//                                   id="srcmac"
//                                   // disabled={isReadOnly}
//                                   value={brokerRequestBody?.srcmac}
//                                   onChange={(e) => {
//                                     setBrokerRequestBody({
//                                       ...brokerRequestBody,
//                                       srcmac: e.target.value,
//                                     });
//                                   }}
//                                 />
//                               </td>
//                               <td>
//                                 <Form.Label>DMAC</Form.Label>
//                                 <Form.Control
//                                   name="destmac"
//                                   type="input"
//                                   id="destmac"
//                                   // disabled={isReadOnly}
//                                   value={brokerRequestBody?.destmac}
//                                   onChange={(e) => {
//                                     setBrokerRequestBody({
//                                       ...brokerRequestBody,
//                                       destmac: e.target.value,
//                                     });
//                                   }}
//                                 />
//                               </td>
//                               <td>
//                                 <Form.Label>Ether Type</Form.Label>
//                                 <Form.Control
//                                   name="ethertype"
//                                   type="input"
//                                   id="ethertype"
//                                   // disabled={isReadOnly}
//                                   value={brokerRequestBody?.ethertype}
//                                   onChange={(e) => {
//                                     setBrokerRequestBody({
//                                       ...brokerRequestBody,
//                                       ethertype: e.target.value,
//                                     });
//                                   }}
//                                 />
//                               </td>
//                             </tr>
//                             <tr rowSpan={4}>
//                               <td>L3</td>
//                               <td colSpan={3}>
//                                 <tr>
//                                   <td>
//                                     <Form.Label>DIP</Form.Label>
//                                     <Form.Control
//                                       name="ipdst"
//                                       type="input"
//                                       id="ipdst"
//                                       value={brokerRequestBody.ipdst || ""}
//                                       onChange={(e) => {
//                                         setBrokerRequestBody({
//                                           ...brokerRequestBody,
//                                           ipdst: e.target.value,
//                                         });
//                                       }}
//                                     />
//                                   </td>
//                                   <td>
//                                     <Form.Label>SIP</Form.Label>
//                                     <Form.Control
//                                       name="ipsrc"
//                                       type="input"
//                                       id="ipsrc"
//                                       value={brokerRequestBody?.ipsrc}
//                                       onChange={(e) => {
//                                         setBrokerRequestBody({
//                                           ...brokerRequestBody,
//                                           ipsrc: e.target.value,
//                                         });
//                                       }}
//                                     />
//                                   </td>
//                                   <td>
//                                     <Form.Label>SIP V6</Form.Label>
//                                     <Form.Control
//                                       name="srcipv6"
//                                       type="input"
//                                       id="srcipv6"
//                                       // disabled={isReadOnly}
//                                       value={brokerRequestBody?.srcipv6}
//                                       onChange={(e) => {
//                                         setBrokerRequestBody({
//                                           ...brokerRequestBody,
//                                           srcipv6: e.target.value,
//                                         });
//                                       }}
//                                     />
//                                   </td>
//                                   <td>
//                                     <Form.Label>SMASK </Form.Label>
//                                     <Form.Control
//                                       name="smask"
//                                       type="input"
//                                       id="smask"
//                                       // disabled={isReadOnly}
//                                       value={brokerRequestBody?.smask}
//                                       onChange={(e) => {
//                                         setBrokerRequestBody({
//                                           ...brokerRequestBody,
//                                           smask: e.target.value,
//                                         });
//                                       }}
//                                     />
//                                   </td>
//                                 </tr>
//                                 <br />
//                                 <tr>
//                                   <td>
//                                     <Form.Label>DIP V6</Form.Label>
//                                     <Form.Control
//                                       name="dstipv6"
//                                       type="input"
//                                       id="dstipv6"
//                                       // disabled={isReadOnly}
//                                       value={brokerRequestBody?.dstipv6}
//                                       onChange={(e) => {
//                                         setBrokerRequestBody({
//                                           ...brokerRequestBody,
//                                           dstipv6: e.target.value,
//                                         });
//                                       }}
//                                     />
//                                   </td>
//                                   <td>
//                                     <Form.Label>DMASK</Form.Label>
//                                     <Form.Control
//                                       name="dmask"
//                                       type="input"
//                                       id="dmask"
//                                       // disabled={isReadOnly}
//                                       value={brokerRequestBody?.dmask}
//                                       onChange={(e) => {
//                                         setBrokerRequestBody({
//                                           ...brokerRequestBody,
//                                           dmask: e.target.value,
//                                         });
//                                       }}
//                                     />
//                                   </td>
//                                   <td>
//                                     <Form.Label>TTL</Form.Label>
//                                     <Form.Control
//                                       name="ttl"
//                                       type="input"
//                                       id="ttl"
//                                       // disabled={isReadOnly}
//                                       value={brokerRequestBody?.ttl}
//                                       onChange={(e) => {
//                                         setBrokerRequestBody({
//                                           ...brokerRequestBody,
//                                           ttl: e.target.value,
//                                         });
//                                       }}
//                                     />
//                                   </td>
//                                 </tr>
//                               </td>
//                             </tr>
//                             <tr>
//                               <td>L4</td>
//                               <td>
//                                 <Form.Label>S Port</Form.Label>
//                                 <Form.Control
//                                   name="src_l4port"
//                                   type="input"
//                                   id="src_l4port"
//                                   // disabled={isReadOnly}
//                                   value={brokerRequestBody?.src_l4port}
//                                   onChange={(e) => {
//                                     setBrokerRequestBody({
//                                       ...brokerRequestBody,
//                                       src_l4port: e.target.value,
//                                     });
//                                   }}
//                                 />
//                               </td>
//                               <td>
//                                 <Form.Label>D Port</Form.Label>
//                                 <Form.Control
//                                   name="dst_l4port"
//                                   type="input"
//                                   id="dst_l4port"
//                                   // disabled={isReadOnly}
//                                   value={brokerRequestBody?.dst_l4port}
//                                   onChange={(e) => {
//                                     setBrokerRequestBody({
//                                       ...brokerRequestBody,
//                                       dst_l4port: e.target.value,
//                                     });
//                                   }}
//                                 />
//                               </td>
//                               <td>
//                                 <Form.Label>Protocol</Form.Label>
//                                 <Form.Control
//                                   name="protocol"
//                                   type="input"
//                                   id="protocol"
//                                   // disabled={isReadOnly}
//                                   value={brokerRequestBody?.protocol}
//                                   onChange={(e) => {
//                                     setBrokerRequestBody({
//                                       ...brokerRequestBody,
//                                       protocol: e.target.value,
//                                     });
//                                   }}
//                                 />
//                               </td>
//                             </tr>
//                           </tbody>
//                         </Table>
//                         <br />
//                         <Row>
//                           <Col>
//                             <div className="d-grid gap-2">
//                               <Button
//                                 variant="secondary"
//                                 onClick={() => setIsEdit(false)}
//                               >
//                                 Cancel
//                               </Button>
//                             </div>
//                           </Col>
//                           <Col>
//                             <div className="d-grid gap-2">
//                               <Button
//                                 variant="primary"
//                                 onClick={() => updateRule(brokerRequestBody)}
//                               >
//                                 Update Rule
//                               </Button>
//                             </div>
//                           </Col>
//                         </Row>
//                       </Form.Group>
//                     </Form>
//                   </Col>
//                 </>
//               ) : (
//                 <></>
//               )}
//             </>
//           )}

//           <Col size="8">
//             <br />
//             {/* <GridTable mapid={mapidconfig} tabledata = {configFilter}/>  */}
//             {/* {configFilter.length > 0 ? ( */}
//             <>
//               <Grid
//                 data={configFilter}
//                 columns={[
//                   {
//                     name: "Rule Id",
//                     width: "10px",
//                     formatter: (cell) =>
//                       _(<span className="fw-semibold">{cell}</span>),
//                   },
//                   {
//                     name: "Stats",
//                     width: "10px",
//                     formatter: (cell) => _(<a href="/#"> {cell} </a>),
//                   },
//                   {
//                     name: "Filters",
//                     width: "120px",
//                     formatter: (cell) =>
//                       _(
//                         <>
//                           <div className="d-flex flex-row align-items-center justify-content-between overflow-auto">
//                             <div>
//                               {Object.keys(JSON.parse(cell)).map(
//                                 (d, index) => (
//                                   <>
//                                     {/* {(index >= 4 || index >= 8 || index >= 12) ? (
//                                         <>
//                                           <span className="fw-bold" key={d}>
//                                             {d.toUpperCase()}
//                                           </span>
//                                           {" : "}
//                                           <span>
//                                             {JSON.parse(cell)[d]}
//                                           </span>{" "}
//                                           {", "} <br />
//                                         </>
//                                       ) : ( */}
//                                     <>
//                                       {JSON.parse(cell)[d] != null ? (
//                                         <>
//                                           <span className="fw-bold" key={d}>
//                                             {d.toUpperCase()}
//                                           </span>
//                                           {" : "}
//                                           <span>
//                                             {JSON.parse(cell)[d]}
//                                           </span>{" "}
//                                           {", "}
//                                         </>
//                                       ) : (
//                                         ""
//                                       )}
//                                     </>
//                                     {/* )} */}
//                                   </>
//                                 )
//                               )}
//                             </div>
//                             {/* <div>
//                                 {Object.values(JSON.parse(cell)).map((d) => (
//                                   <span key={d}>{d}</span>
//                                 ))}
//                               </div> */}
//                           </div>
//                         </>
//                       ),
//                   },
//                   {
//                     name: "Actions",
//                     width: "30px",
//                     formatter: (cell, row) =>
//                       _(
//                         <td className="d-flex justify-content-around align-items-center">
//                           <div className="edit">
//                             <button
//                               className="btn btn-sm btn-success edit-item-btn"
//                               onClick={() => {
//                                 console.log(row._cells[0].data);
//                                 onEditRules(row._cells[0].data);
//                               }}
//                               data-bs-toggle="modal"
//                               data-bs-target="#showModal"
//                             >
//                               Edit
//                             </button>
//                           </div>
//                           <div className="remove">
//                             <button
//                               className="btn btn-sm btn-danger remove-item-btn"
//                               onClick={() =>
//                                 deleteRule(
//                                   mapRuleData.mapId,
//                                   row._cells[0].data
//                                 )
//                               }
//                               data-bs-toggle="modal"
//                               data-bs-target="#deleteRecordModal"
//                             >
//                               Del
//                             </button>
//                           </div>
//                         </td>
//                       ),
//                   },
//                 ]}
//                 search={true}
//                 sort={true}
//                 pagination={{ enabled: false, limit: 10 }}
//               />
//             </>
//             {/* ) : (
//               <></>
//             )} */}

//             {/* <Table striped bordered hover>
//               <thead>
//                 <tr>
//                   <th colSpan={3}>Configured Filters</th>
//                 </tr>
//                 <tr>
//                   <th>Rule Id</th>
//                   <th>Filters</th>
//                   <th>Stats</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//             {(rulesList != undefined) ? <>
//               {Object.keys(rulesList).map(key => (
//                 <tr key={key}>
//                 <td>{rulesList[key].rule_id}</td>
//                 <td>
//                 {(rulesList[key].match_all == 'disable') ? <>
//                 <span>
//                   {rulesList[key].action},
//                   {rulesList[key].match_all},
//                   {rulesList[key].srcmac},
//                   {rulesList[key].destmac},
//                   {rulesList[key].vlan},
//                   {rulesList[key].ethertype},
//                   {rulesList[key].ipdst},
//                   {rulesList[key].ipsrc}
//                 </span>
//                 </> :<>
//                 <span>
//                   {rulesList[key].action},
//                   {rulesList[key].stats},
//                   {rulesList[key].match_all}
//                 </span>
//                 </>}
//                 </td>
//                 <td>{rulesList[key].counters}</td>
//                 <td>
//                   <ButtonGroup aria-label="Basic example">
//                     <Button variant="primary">
//                       <MdModeEditOutline />
//                     </Button>
//                     &nbsp;
//                     <Button variant="secondary">
//                       <MdDelete />
//                     </Button>
//                   </ButtonGroup>
//                 </td>
//               </tr> 
//               ))}
//             </>:<></>}

//               </tbody>
//             </Table> */}
//           </Col>
//         </Row>
//       </>
//     );
//   default:
//     return null;
// }
// }