import React, { Component, useEffect, useState } from 'react';

import styled from 'styled-components';
import {    
    useHistory, 
    Link
} from "react-router-dom";
  
export const Navbar = () => {
    const history = useHistory()
    const [userId, setUserId] = useState(false)

    useEffect(() => {
        const userId = window.localStorage.getItem('userId') || ''
        if (userId) {
            setUserId(true)
        }
    }, [userId])

    function handleSignup() {
        history.push('/signup')
    }

    function handleHome() {
        history.push('/')
    }
    function handleLogout() {
        window.localStorage.removeItem('userId')
        setUserId(false)
        history.push('/login')
    }    
    return (
        <Nav>
            <div onClick={handleHome} style={{ cursor: 'pointer' }}>Home</div>    
            {userId ? 
                <div onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</div>    
                :
                <div onClick={handleSignup} style={{ cursor: 'pointer' }}>Signup</div>    
            }
            
        </Nav>
    )
}

const Nav = styled.div`
    background: rgba(200,200,200,200);
    height: 50px;
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
    div {
        margin-right: 50px;
        padding-top: 10px;
    }
`

