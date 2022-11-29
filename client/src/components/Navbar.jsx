import React, {useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/authContext';

const Navbar = () => {

    const {currentUser, logout} = useContext(AuthContext);
    const navigate = useNavigate();

    const logoutHandler = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="navbar">
            <div className="container">
                <Link className="link" to="/">
                    <div className="title">Joel's Blog</div>
                </Link>
                <div className="links">
                    <Link className="link" to="aboutme">
                        <span>About me</span>
                    </Link>
                    <span>{currentUser?.username}</span>
                    {currentUser ? <span onClick={logoutHandler}>Logout</span> : <Link className="link" to="/login">Sign In</Link>}
                    <span className="write">
                        <Link className="write" to="/write">Write</Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;