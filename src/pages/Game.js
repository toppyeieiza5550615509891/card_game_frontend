import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import './Game.scss'

import { gameRequest, cardRequest, newGameRequest } from '../utils/request'


export const Game = () => {
    const history = useHistory()    

    const [ranNum, setRanNum] = useState([])    
    const [gameId, setGameId] = useState(null)
    const [move, setMove] = useState(0)
    const [highest, setHighest] = useState(0)
    const [myBest, setMyBest] = useState(0)
    const [ready, setReady] = useState(true)
    const [reRender, setReRender] = useState(false)
    
    const getGameRequest = async () => {        
        const userId = window.localStorage.getItem('userId') || ''
        if (!userId) {
            history.push('/login')
        }
        const res = await gameRequest('/game/', userId)
        
        if (!res.ok) {
            alert(res?.err || res.detail || 'server error')
        } else {            
            if (res.data.is_success) {
                setMyBest(res.data.my_best)
            } else {
                setMyBest(0)
            }
            setRanNum(JSON.parse(res.data.ran_num))
            setMove(res.data.move)   
            setHighest(res.data.highest_score)
            // setMyBest(res.data.my_best)
            setGameId(res.data.id)            
            
        }
    }

    useEffect(() => {
        getGameRequest()
    }, [reRender])

    async function doCardRequest(cardId) {
        setReady(false)        
        document.getElementById(cardId).style.background = 'white'        
        const userId = window.localStorage.getItem('userId') || ''
        if (!userId) {
            history.push('/login')
        }        
        const data = JSON.stringify({ input_num: cardId })
        const res = await cardRequest('/game/', data, gameId)        
        if (!res.ok) {
            alert(res?.err || res.detail || 'server error')
        } else {
            setRanNum(JSON.parse(res.data.ran_num))
            setMove(res.data.move)
            setGameId(res.data.id)            
            setTimeout(() => {
                setReRender(!reRender)
                setReady(true)        
            }, 500)                           
        }     
        
        
    }
    

    const createNewgame = async () => {
        const userId = window.localStorage.getItem('userId') || ''
        if (!userId) {
            history.push('/login')
        }
        await newGameRequest('/game', userId)        
        setReRender(!reRender)
    }
    

    const handleFlipCard = (e) => {
        if (ready) {
            const cardId = parseInt(e.target.id)            
            doCardRequest(cardId)
        }
    }
    
    const cardList = ranNum.map(c => {
        if (c.flip) {
            return (               
                <div className="flip-card" key={c.id} id={c.id}>
                    <div className="flip-card-inner">
                        <h2>{c.value}</h2>                        
                    </div>
                </div>
            )
        }
        else {
            return (                
                <div className="flip-card" onClick={handleFlipCard} key={c.id} >
                    <div className="flip-card-inner">
                        <div className="flip-card-front" id={c.id}>                            
                        </div>
                        <div className="flip-card-back">
                            <h2>{c.value}</h2>
                        </div>
                    </div>
                </div>
            )
        }
        
    })

    return (
        <>
            <Main>
                {/* {matchNum.length === 12 ?
                    <Modal>
                        <Modalcontent>
                            <h2>Game over</h2>
                            <button onClick={createNewgame}>new game</button>
                        </Modalcontent>
                    </Modal>
                        :
                        null
                } */}
                <Sidebar>
                    <Wrapper>
                        <h2 className='container'>Game</h2>
                        <div className='container'>Move: {move}</div>
                        <div className='container'>My best score: {myBest}</div>
                        <div className='container'>Highest: {highest}</div>
                        <Button onClick={createNewgame}>New game</Button>
                    </Wrapper>
                </Sidebar>

                <Container>
                    {cardList}
                </Container>
            </Main>
        </>
    )
}



const Main = styled.div`
    display: flex;    
    height: 600px;    
`
const Wrapper = styled.div`
    padding-top: 50px 10px;
    display: flex;
    flex-direction: column;
    .container {
        margin-bottom: 30px;
    }   
`
const Button = styled.div`    
    border-radius: 50%;
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
`
const Sidebar = styled.div`
    width: 25%;    
    height: inherit;
    display: flex;    
    justify-content: center;
    padding: 10px;
    
`

const Modal = styled.div`
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%;
    background-color: rgba(0,0,0,0.4);
    display: flex;
    justify-content: center;    
    
`
const Modalcontent = styled.div`
    position: absolute;    
    text-align: center;    
    top: 27%;    
    background: yellow;
`
const Container = styled.div`    
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    width: 75%;
    height: 100%;
`
const Card = styled.div`
    background: ${props => props.fold ? 'black' : 'green'};
    opacity:  ${props => props.hide ? '0' : '1'};
    padding: 10px;
    @media (max-width: 400px) {
        width: 50px;
        height: 50px;
    }
    width: 25%;
    height: 100px;
    margin: 10px;
    display: flex;    
    justify-content: center;
    align-items: center;
`

