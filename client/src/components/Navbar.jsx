import React, {useContext} from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../context/authContext';

const Navbar = () => {

    const {currentUser, logout} = useContext(AuthContext);

    return (
        <div className="navbar">
            <div className="container">
                <Link className="link" to="/">
                    <div className="title">Joel's Blog</div>
                </Link>
                <div className="links">
                    <Link className="link" to="aboutme">
                        <h6>About me</h6>
                    </Link>
                    <span>{currentUser?.username}</span>
                    {currentUser ? <span onClick={logout}>Logout</span> : <Link className="link" to="/login">Login</Link>}
                    <span className="write">
                        <Link className="write" to="/write">Write</Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;