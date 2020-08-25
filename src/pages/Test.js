import React, { useEffect, useState } from 'react';
import axios from 'axios'

export const Test = () => {

    const [card, setCard] = useState([])
    useEffect(() => {
        getData()
    }, [])

    function getData() {        
        const data = [
            { id: 1, fliped: false, value: 1 },
            { id: 2, fliped: false, value: 2 },
            { id: 3, fliped: false, value: 3 },
            { id: 4, fliped: false, value: 1 },
            { id: 5, fliped: false, value: 2 },
            {id: 6, fliped: false, value: 3},
        ]
        setCard(data)
    }

    const cardList = card.map(c => 
        <div key={c.id}>{c.value}</div>
    )
    return (
        <div>
            {cardList}
        </div>
    )
}