import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AlertList.css';  // Importing the CSS file

const AlertList = () => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        // Fetch all alerts from the API
        axios.get('http://localhost:5000/api/alert')  // Ensure to update the URL if needed
            .then(response => setAlerts(response.data.alerts))
            .catch(error => console.error('Error fetching alerts:', error));
    }, []);

    const markAsRead = (alertId) => {
        // Mark an alert as read
        axios.patch(`http://localhost:5000/api/alert/${alertId}`)
            .then(response => {
                console.log(response.data);  // Log the updated alert object
                // Update the alert's read status in the state
                setAlerts(prevAlerts => 
                    prevAlerts.map(alert => 
                        alert._id === alertId ? { ...alert, read: true } : alert
                    )
                );
            })
            .catch(error => console.error('Error marking alert as read:', error));
    };

    return (
        <div className="alert-list-container">
            <h2>Alerts</h2>
            <ul className="alert-list">
                {alerts.map(alert => (
                    <li key={alert._id} className={alert.read ? 'read' : 'unread'}>
                        {alert.message} 
                        <button onClick={() => markAsRead(alert._id)}>
                            Mark as Read
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AlertList;
