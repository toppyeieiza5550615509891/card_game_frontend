import React from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

const Wrapper = styled.div`
    display: flex;
    margin-top: 30px;
    justify-content: center;
    text-align: center;
`
export function NoMatch() {
    let location = useLocation();
  
    return (
        <div>
            <h1>Not Found</h1>
        <h1>
          No match for <code>{location.pathname}</code>
        </h1>
      </div>
    );
  }