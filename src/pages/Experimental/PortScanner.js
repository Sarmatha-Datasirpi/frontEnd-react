// import React, { Component } from 'react';
// import portUsed from 'port-used';

// class PortChecker extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             port: 44201, // Port to check
//             host: '127.0.0.1', // Host to check
//             isPortUsed: null, // To store the result
//             error: null, // To store any errors
//         };
//     }

//     componentDidMount() {
//         // Check the port when the component mounts
//         this.checkPortUsage();
//     }

//     checkPortUsage = () => {
//         const { port, host } = this.state;

//         portUsed
//             .check(port, host)
//             .then((inUse) => {
//                 this.setState({ isPortUsed: inUse });
//             })
//             .catch((err) => {
//                 this.setState({ error: err.message });
//             });
//     };

//     render() {
//         const { port, host, isPortUsed, error } = this.state;

//         return (
//             <div>
//                 <h1>Port Checker</h1>
//                 <p>Checking if port {port} on host {host} is in use:</p>
//                 {isPortUsed !== null && (
//                     <p>
//                         Port {port} usage: {isPortUsed ? 'In use' : 'Not in use'}
//                     </p>
//                 )}
//                 {error && <p>Error on check: {error}</p>}
//             </div>
//         );
//     }
// }

// export default PortChecker;
