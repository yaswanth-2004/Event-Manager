import { useNavigate } from "react-router-dom"
import Login from "./StudentLogin"
import './FirstLogin.css'

const FirstLogin = ()=>{

    const navigate = useNavigate()
    const StudentLogin =()=>{
        navigate('/studentlogin')
    }

    const Central=()=>{
        navigate('/centrallogin')
    }

    const TeacherLogin = ()=>{
        navigate('/teachlogin')
    }
    
    
    
    
    return(
     
        <div>
            <body>

            
            <div className="btn">
            <button style={{marginLeft:'20px'}} className="button-74" onClick={()=>{Central()}} >Login as central</button>

            <button className="button-74" onClick={()=> StudentLogin()} >Login as student</button>
            <button style={{marginLeft:'20px'}} className="button-74" onClick={()=>{TeacherLogin()}} >Login as Event Organiser:</button>
            </div>
            </body>
        </div>
    )
}

export default FirstLogin