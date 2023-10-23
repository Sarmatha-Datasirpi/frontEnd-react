import React, { Component } from 'react';

class WebSocketTable extends Component {
    constructor(props) {
        super(props);

        // Initialize state
        this.state = {
            deviceId: '',
            response: null,
        };

        // Initialize WebSocket connection
        this.ws = new WebSocket('wss://your-websocket-server-url'); // Replace with your WebSocket server URL
    }

    componentDidMount() {
        // Listen for messages from the WebSocket server
        this.ws.addEventListener('message', this.handleMessage);
    }

    componentWillUnmount() {
        // Clean up WebSocket connection when the component unmounts
        this.ws.removeEventListener('message', this.handleMessage);
        this.ws.close();
    }

    // Handle incoming WebSocket messages
    handleMessage = (event) => {
        // Assuming the server sends the response as a JSON string
        const response = JSON.parse(event.data);

        // Update state with the response
        this.setState({ response });
    };

    // Handle input change for deviceId
    handleDeviceIdChange = (event) => {
        this.setState({ deviceId: event.target.value });
    };

    // Send a message to the WebSocket server
    sendMessage = () => {
        const { deviceId } = this.state;

        // Send the deviceId to the server (you can customize this message format)
        this.ws.send(JSON.stringify({ deviceId }));
    };

    render() {
        const { deviceId, response } = this.state;

        return (
            <div>
                <h1>WebSocket Table</h1>
                <div>
                    <label htmlFor="deviceId">Device ID:</label>
                    <input
                        type="text"
                        id="deviceId"
                        value={deviceId}
                        onChange={this.handleDeviceIdChange}
                    />
                    <button onClick={this.sendMessage}>Send</button>
                </div>
                <div>
                    <h2>Response</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Field</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {response &&
                                Object.entries(response).map(([field, value]) => (
                                    <tr key={field}>
                                        <td>{field}</td>
                                        <td>{value}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default WebSocketTable;
