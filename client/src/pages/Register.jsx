import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

const changeHandler = (event) => {
  setInputs(prev => ({...prev, [event.target.name]: event.target.value}));
}

const submitHandler = async (event) => {
  event.preventDefault();
  try {
    await axios.post("auth/register", inputs);
    navigate("/login");
    
  } catch (err) {
    setError(err.response.data);
  }

}

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input required type="text" placeholder="username" name="username" onChange={changeHandler} />
        <input required type="email" placeholder="e-mail address" name="email" onChange={changeHandler} />
        <input required type="password" placeholder="password" name="password" onChange={changeHandler} />
        <button onClick={submitHandler}>Register</button>
        {error && <p>{error}</p>}
        
        <span>
          Do you already have an account? <Link to="/login">Login now!</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
