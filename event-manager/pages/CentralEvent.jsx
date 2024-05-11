import React, { useState, useEffect } from "react";
import axios from "axios";
import './Central.css'

const CentralEvent = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8000/eventdetails");
            const notapprovedData =response.data.filter(event=>event.ApproveStatus!=='true')
            setEvents(notapprovedData);
            console.log(notapprovedData);
        } catch (error) {
            console.error("Error in fetching event details", error);
        }22
    };

    const handleApprove = async (eventId) => {
        try {
            await axios.put(`http://localhost:8000/approve-event/${eventId}`);
            
            setEvents(prevEvents => prevEvents.filter(event => event._id !== eventId));
        } catch (error) {
            console.error('Error approving event:', error);
        }
    };

    return (
        <div>
            {events.map(event => (
                <div key={event._id} class="prp" style={{marginTop:'2rem'}}>
                    <h3>Event Name: {event.eventName}</h3>
                    <h3>Event Desc: {event.eventDesc}</h3>
                    <h3>Event Date: {event.eventDate}</h3>
                    <h3>Competitions: {event.competitions}</h3>
                    <h3>Department: {event.department}</h3>
                    <h3>Hall: {event.hall}</h3>
                    <h3>Faculty Coordinators: {event.facultyCoordinators}</h3>
                    <h3>Faculty Mail: {event.facultyMail}</h3>
                    <button class="rtm" onClick={() => handleApprove(event._id)}>Approved</button><br />
                        
                    
                </div>
            ))}
        </div>
    );
};

export default CentralEvent;
