import React, {useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/authContext';

const Login = () => {

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
      });
      const [error, setError] = useState(null);
      const navigate = useNavigate();
      const {login} = useContext(AuthContext);

    
    const changeHandler = (event) => {
      setInputs(prev => ({...prev, [event.target.name]: event.target.value}));
    }
    
    const submitHandler = async (event) => {
      event.preventDefault();

      if (inputs.username.trim().length === 0 || inputs.password.trim().length === 0) return setError("Username / Password should not be empty!");
      
      // try-catch to login with inputs
      try {
        await login(inputs);
        navigate("/");
      } catch (err) {
        setError(err.response.data);
      }
    
    }
    
    return (
        <div className="auth">
            <h1>Login</h1>
            <form>
                <input type="text" placeholder="username" name="username" required onChange={changeHandler} />
                <input type="password" placeholder="password" name="password" required onChange={changeHandler} />
                <button onClick={submitHandler}>Login</button>
                {error && <p>{error}</p>}
                <span>Don't have an account yet? <Link to="/register">Register now!</Link></span>
            </form>
        </div>
    );
};

export default Login;
