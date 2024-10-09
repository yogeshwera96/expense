import React, { useState } from 'react';
import styled from 'styled-components';
import avatar from '../../img/avatar.png';
import { signout } from '../../utils/Icons';
import { menuItems } from '../../utils/menuItems';
import Login from '../../pages/Login';  // Import the Login component
import Signup from '../../pages/Signup'; // Import the Signup component
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../context/AuthContext';
import {  useNavigate } from 'react-router-dom';  // Import useNavigate
import { Link } from 'react-router-dom';



function Navigation({ active, setActive }) {
    const [showLogin, setShowLogin] = useState(false);  // Initially set to false
    const [showSignup, setShowSignup] = useState(false);
    const navigate = useNavigate();  // Initialize useNavigate hook
   
    const handleToggleLogin = () => {
        setShowLogin(!showLogin);  // Toggle login form visibility
        setShowSignup(false);  // Ensure signup form is hidden when login is shown
    };

    const handleToggleSignup = () => {
        setShowSignup(!showSignup);  // Toggle signup form visibility
        setShowLogin(false);  // Ensure login form is hidden when signup is shown
    };

    // Logout 
    const { logout } = useLogout();
    const { user } = useAuthContext();
    
    const handleClick = () => {
        logout();
        navigate('/');  // Redirect to home after logout
    };

    return (
        
        <NavStyled>
           
            <nav>
          
                {user ? (
                    <div className="bottom-nav">
                        <Link to="/home"></Link>
                        <span>{user.email}</span>
                        <button className='but' onClick={handleClick}>
                            {signout} Log Out
                        </button>
                    </div>
                ) : (
                    <div>
                        <button className='login' onClick={handleToggleLogin}>
                            Login
                        </button>
                        <button className='signup' onClick={handleToggleSignup}>
                            Sign up
                        </button>
                    </div>
                )}
            </nav>

            {/* Centered Forms */}
            { (showLogin || showSignup) && !user && (
                <FormContainer>
                    {showLogin && <Login onSuccess={() => { setShowLogin(false); }} />}
                    {showSignup && <Signup onSuccess={() => { setShowSignup(false); }} />}
                </FormContainer>
            )}

            {/* User Avatar and Menu Items - Only show when user is logged in */}
            {user && (
                <>
                    <div className="user-con">
                        <img src={avatar} alt="User Avatar" />
                        <div className="text">
                            <h2>{user.username || user.email}</h2>
                            <p>Your Money</p>
                        </div>
                    </div>

                    <ul className="menu-items">
                        {menuItems.map((item) => (
                            <li
                                key={item.id}
                                onClick={() => setActive(item.id)}
                                className={active === item.id ? 'active' : ''}
                            >
                                {item.icon}
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </NavStyled>
        

    );
    
}

const NavStyled = styled.nav`
    
    padding: 2rem 1.5rem;
    width: 374px;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    
    

    .bottom-nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
       

    .user-con {
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;

        img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }

        h2 {
            color: rgba(34, 34, 96, 1);
        }

        p {
            color: rgba(34, 34, 96, .6);
        }
    }

    .menu-items {
        flex: 1;
        display: flex;
        flex-direction: column;

        li {
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;

            i {
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    }

    .active {
        color: rgba(34, 34, 96, 1) !important;

        i {
            color: rgba(34, 34, 96, 1) !important;
        }

        &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #222260;
            border-radius: 0 10px 10px 0;
        }
    }

    .login, .signup {
        padding: 10px;
        margin-right: 10px;
        color: red; /* Changed to white for better visibility */
        background-color: var(--primary); /* Add background color */
        border: 5px solid white;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .login:hover, .signup:hover {
        background-color: darken(var(--primary), 10%);
    }

    .but {
        background: #fff;
        color: var(--primary);
        border: 2px solid var(--primary);
        padding: 6px 10px;
        border-radius: 4px;
        font-family: "Poppins", sans-serif;
        cursor: pointer;
        font-size: 1 em;
        transition: background-color 0.3s ease, color 0.3s ease;
    }

    .but:hover {
        background-color: var(--primary);
        color: #fff;
    }
`;

const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    
    background: rgba(255, 255, 255, 0.9);
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
`;

export default Navigation;
