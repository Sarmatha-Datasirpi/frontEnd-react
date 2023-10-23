import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import { PROTOCOL, DOMAIN, PORT_8081, PORT_8082 } from '../../helpers/url_helper';
const RealTimeDataComponent = () => {
    const apiUrl = `${PROTOCOL}://${DOMAIN}:${PORT_8081}/device/interface/statistics`;
    const deviceId = useParams().id;

    // Define the request body
    const requestBody = {
        deviceIpAddress: deviceId,
    };

    const [data, setData] = useState([]);

    // Function to handle incoming events
    const handleEvent = (event) => {
        // Parse the event data (assuming it's JSON)
        const eventData = JSON.parse(event.data);

        // Update the data state with the received data
        setData((prevData) => [...prevData, eventData]);
    };

    useEffect(() => {
        // Create an EventSource and add event listener
        const eventSource = new EventSource(apiUrl);

        // Add an event listener for the 'message' event
        eventSource.addEventListener('message', handleEvent);

        // Handle errors
        eventSource.addEventListener('error', (error) => {
            console.error('EventSource error:', error);
        });

        // Send the initial POST request with the request body
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
            })
            .catch((error) => {
                console.error('Initial POST request error:', error);
            });

        // Clean up the EventSource when the component unmounts
        return () => {
            eventSource.close();
        };
    }, [apiUrl, requestBody]);

    return (
        <div>
            <h2>Real-Time Data Table</h2>
            <table>
                <thead>
                    <tr>
                        <th>Column 1</th>
                        <th>Column 2</th>
                        {/* Add more table headers as needed */}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.column1}</td> {/* Replace with actual data fields */}
                            <td>{item.column2}</td> {/* Replace with actual data fields */}
                            {/* Add more table cells as needed */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RealTimeDataComponent;
