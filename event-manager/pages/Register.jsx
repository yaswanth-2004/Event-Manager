import { useRef, useState, useEffect } from "react";
import axios from "axios";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setError("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/register", {
        username,
        password,
        role,
      }); 
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h3>Login In</h3>
      {success ? (
        <h3>You're Successfully Logged In!</h3>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">UserName</label>
          <input
            type="text"
            id="username"
            ref={userRef}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="Role">Role</label>
          <input
            type="text"
            id="role"
            onChange={(e) => setRole(e.target.value)}
          />
          <button>Login</button>
        </form>
      )}
    </div>
  );
};

export default Register;
