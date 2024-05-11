// ParticipantDetailsPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './edit.css'
const ParticipantDisplay = () => {
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/participants');
            setParticipants(response.data);
        } catch (error) {
            console.error('Error fetching participant details:', error);
        }
    };

    return (
        <div class="yash">
            <h1>Participant Details</h1>
            {participants.map(participant => (
                <div key={participant._id}>
                    <h2 >Name: {participant.name}</h2>
                    <h2>Event Name: {participant.eventName}</h2>
                    <h2>Department: {participant.department}</h2>
                    <h2>Section: {participant.section}</h2>
                    <h2>Phone Number: {participant.phoneNumber}</h2>
                </div>
            ))}
        </div>
    );
};

export default ParticipantDisplay;
