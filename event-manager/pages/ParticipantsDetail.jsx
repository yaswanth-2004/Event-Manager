import React, { useState } from 'react';
import { useRef } from 'react';
import axios from 'axios';

const ParticipantsDetail = () => {

    const[name,setName]=useState('')
    const[eventName,setEventname]=useState('')
    const[department,setDepartment]=useState('')
    const[section,setSection]=useState('')
    const[phoneNumber,setPhonenumber]=useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/participants', {
                name,
                eventName,
                department,
                section,
                phoneNumber
            });
            console.log(response);
        } catch (error) {
            console.error('Error saving participant details:', error);
        }
    };

    return (
        <div>
            <h2>Enter your name:</h2>
            <input type="text" name="name"  onChange={(e)=>setName(e.target.value)}/>
            <h2>Enter the event name:</h2>
            <input type="text" name="eventName"  onChange={(e)=>setEventname(e.target.value)}/>
            <h2>Department:</h2>
            <input type="text" name="department" onChange={(e)=>setDepartment(e.target.value)}/>
            <h2>Section:</h2>
            <input type="text" name="section"  onChange={(e)=>setSection(e.target.value)}/>
            <h2>Phone number:</h2>
            <input type="text" name="phoneNumber"  onChange={(e)=>setPhonenumber(e.target.value)} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default ParticipantsDetail;
