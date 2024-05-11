import React, { useState, useEffect } from "react";
import axios from "axios";
import './EvenDetail.css'
const EventDetails = () => {
    const [approvedEvents, setApprovedEvents] = useState([]);

    useEffect(() => {
        fetchApprovedEvents();
    }, []);

    const fetchApprovedEvents = async () => {
        try {
            const response = await axios.get("http://localhost:8000/eventdetails");
            const approvedEventsData = response.data.filter(event => event.ApproveStatus === 'true');
            setApprovedEvents(approvedEventsData);
            console.log(approvedEventsData);
        } catch (error) {
            console.error("Error fetching approved events:", error);
        }
    };

    return (
        <div class="yash" >
            {approvedEvents.map(event => (
                <div key={event.id} class="event" style={{marginLeft:'3rem'}}>
                    <h3>Event Name: {event.eventName}</h3>
                    <h3>Event Desc: {event.eventDesc}</h3>
                    <h3>Event Date: {event.eventDate}</h3>
                    <h3>Competitions: {event.competitions}</h3>
                    <h3>Department: {event.department}</h3>
                    <h3>Hall: {event.hall}</h3>
                    <h3>Faculty Coordinators: {event.facultyCoordinators}</h3>
                    <h3>Faculty Mail: {event.facultyMail}</h3>
                    <br />
                </div>
            ))}
        </div>
    );
};

export default EventDetails;
