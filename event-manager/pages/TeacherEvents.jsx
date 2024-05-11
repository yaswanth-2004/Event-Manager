import { useNavigate } from "react-router-dom";


const TeacherEvents=()=>{
    const navigate=useNavigate()

    const participantDisplay=()=>{
        navigate('/participantdisplay')
    }
    const adminEvent=()=>{
        navigate('/adminevent')
    }
    return(
        <div>
            <button onClick={()=>participantDisplay()}>Participants Details</button>
            <button onClick={()=>adminEvent()} >Enter the Events</button>
            <h3>Number of students registered for the events</h3>
        </div>
    )
}

export default TeacherEvents


