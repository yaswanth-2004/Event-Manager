import { useState,useEffect } from "react";
import axios from "axios";
import './AdminEvent.css'




const AdminEvent = ()=>{
    const [eventName, setEventName] = useState('');
    const [competitions, setCompetitions] = useState('');
    const [department, setDepartment] = useState('');
    const [eventDesc, setEventDesc] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [hall, setHall] = useState('');
    const [facultyCoordinators, setFacultyCoordinators] = useState('');
    const [facultyMail, setFacultyMail] = useState('');



    const handleSubmit = async(e)=>{
        e.preventDefault();
        const ApproveStatus = 'FALSE'
        try{
        const response = await axios.post('http://localhost:8000/eventdetails',{
            eventName,
            eventDesc,
            eventDate,
            competitions,
            department,
            hall,
            facultyCoordinators,
            ApproveStatus,
            facultyMail,

        })
        console.log(response);
        }
        catch (error) {
            console.error('Error saving event details:', error);
        }


    }


    return(
        <body class="adminbody">

        <div class="container">
            <h2 style={{color:'black'}}>Event Registration Form</h2>
            <form action="#" method="post">
                <div class="form-group">
                    <label for="eventName">1. Enter the Event Name:</label>
                    <input type="text" id="eventName" name="eventName" required onChange={(e)=>setEventName(e.target.value)}/>
                </div>
                <div class="form-group">
                    <label for="competitions">2. Competitions to be Conducted:</label>
                    <input type="text" id="competitions" name="competitions" required onChange={(e)=>setCompetitions(e.target.value)}/>
                </div>
                <div class="form-group">
                    <label for="department">3. Enter the Department:</label>
                    <select id="department" name="department" required onChange={(e)=>setDepartment(e.target.value)}>
                        <option value="AIML">AIML</option>
                        <option value="AIDS">AIDS</option>
                        <option value="CSE">CSE</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="eventDetails">4. Enter the Event Details:</label>
                    <textarea id="eventDetails" name="eventDetails" rows="4" required onChange={(e)=>setEventDesc(e.target.value)}/>
                </div>
                <div class="form-group">
                    <label for="hall">5. Enter the Hall:</label>
                    <select id="hall" name="hall" required onChange={(e)=>setHall(e.target.value)}>
                        <option value="hall1">Hall 1</option>
                        <option value="hall2">Hall 2</option>
                        <option value="hall3">Hall 3</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="coordinators">6. Enter the Faculty Coordinators:</label>
                    <input type="text" id="coordinators" name="coordinators" required onChange={(e)=>setFacultyCoordinators(e.target.value)}/>
                </div>
                <div class="form-group">
                    <label for="coordinatorEmail">7. Enter the Mail ID of Faculty Coordinator:</label>
                    <input type="email" id="coordinatorEmail" name="coordinatorEmail" required onChange={(e)=>setFacultyMail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label  >8.Enter the Date:</label>
                    <input type="date" onChange={(e)=>setEventDate(e.target.value)}/>

                </div>
                <button className="adminbutton" type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
        
        </body>
        
    )
}

export default AdminEvent