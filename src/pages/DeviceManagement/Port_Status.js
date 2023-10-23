import React, { useState } from 'react';
import axios from 'axios';

function CheckServerStatus() {
    const [serverStatus, setServerStatus] = useState({});

    const checkServer = (port) => {
        axios.get(`http://localhost:${port}`)
            .then(() => {
                setServerStatus((prevStatus) => ({
                    ...prevStatus,
                    [port]: 'Server is running',
                }));
            })
            .catch(() => {
                setServerStatus((prevStatus) => ({
                    ...prevStatus,
                    [port]: 'Server is not running',
                }));
            });
    };

    return (
        <div>
            <button onClick={() => checkServer(8081)}>Check Port 8081</button>
            <button onClick={() => checkServer(8082)}>Check Port 8082</button>
            <ul>
                <li>Port 8081: {serverStatus[8081] || 'Not checked'}</li>
                <li>Port 8082: {serverStatus[8082] || 'Not checked'}</li>
            </ul>
        </div>
    );
}

export default CheckServerStatus;
