import React, {useState} from 'react';
import styled from 'styled-components';
import {    
    useHistory,    
  } from "react-router-dom";
import { signUpRequest } from '../utils/request'

export const Signup = () => {
    
    const history = useHistory()

    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const onsubmit = async() => {
        if (username && password) {
            const data = {
                username: username,
                password: password,
            }
            const res = await signUpRequest('/users/', JSON.stringify(data))
            if (!res.ok) {
                alert(res?.err || res.detail || 'server error')
                history.push('/signup')
            } else {                
                history.push('/login')
            }
        }        
    }

    return (
        <Container>
            <h1>Signup</h1>
            <Wrapper>                
                    <label>username </label>
                    <input type='text' onChange={(e) => setUsername(e.target.value)}/>                
            </Wrapper>
            <Wrapper>                
                <label>password</label>
                    <input type='password' onChange={(e) => setPassword(e.target.value)}/>                
            </Wrapper>
            <button onClick={onsubmit}>Signup</button>
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