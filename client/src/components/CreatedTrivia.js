import axios from 'axios'
import React from 'react'
import { useEffect, useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'

const CreatedTrivia = () => {

    const {TriviaList, setTriviaList} = useContext(GlobalContext)

    useEffect(() => {
        axios.get("http://localhost:8001/api/trivias")
            .then((res) => {
                console.log(res.data)
                setTriviaList(res.data)
            })
            .catch((err) => console.log(err))
    }, [])


    return (
        <div>
            {
                TriviaList ? TriviaList.map((Trivia, i) => {
                    return (
                        <div>
                            {Trivia.question}
                        </div>
                    )
                }) : null
            }
        </div>
    )
}

export default CreatedTrivia
