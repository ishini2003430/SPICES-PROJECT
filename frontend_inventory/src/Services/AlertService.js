import axios from 'axios';

// Define the API URL
const API_URL = 'http://localhost:5000/api/alerts';  // Update with your backend URL if needed

// Function to fetch all alerts
export const getAllAlerts = () => axios.get(API_URL);

// Function to fetch unread alerts
export const getUnreadAlerts = () => axios.get(`${API_URL}/unread`);

// Function to mark an alert as read
export const markAlertAsRead = (id) => axios.patch(`${API_URL}/${id}`);

// Function to delete an alert
export const deleteAlert = (id) => axios.delete(`${API_URL}/${id}`);
