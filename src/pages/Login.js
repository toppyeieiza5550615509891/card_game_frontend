import React, { Component, useEffect, useState } from 'react';
import styled from 'styled-components';
import {    
    useHistory,    
  } from "react-router-dom";
import { authenRequest } from '../utils/request';

export const Login = () => {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    const history = useHistory()

    const onsubmit = async() => {
        if (username && password) {
            const data = {
                username: username,
                password: password
            }            
            const res = await authenRequest('/login/', JSON.stringify(data))            
            if (!res.ok) {
                alert(res?.err || res.detail || 'server error')
            } else {                
                window.localStorage.setItem('userId', res.data.id)
                history.push('/')
            }
        }
    }

    useEffect(() => {

    }, [])

    return (
        <Container>
            <h1>Login</h1>
            <Wrapper>                
                    <label>username </label>
                    <input type='text' onChange={(e) => setUsername(e.target.value)}/>                
            </Wrapper>
            <Wrapper>                
                <label>password</label>
                    <input type='password' onChange={(e) => setPassword(e.target.value)}/>                
            </Wrapper>
            <button onClick={onsubmit}>Log in</button>
        </Container>   
    )
}

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin: 10px;
`

const Container = styled.div`    
    display: flex;
    justify-content: center;
    height: 600px;
    align-items: center;
    flex-direction: column;
    
`