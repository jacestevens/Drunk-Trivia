import React, {useContext, useState} from 'react'
import { Zoom, Paper, Typography, Button, TextField } from '@mui/material'
import { SampleQuestions } from './SampleQuestions'
import { GlobalContext } from '../context/GlobalContext'
import { Link } from '@reach/router'

const SampleQuestionsDisplay = () => {

    const {activeQuestion, setActiveQuestion} = useContext(GlobalContext)
    
    const nextQuestion = (e) => {
        e.preventDefault()
        if(activeQuestion >= 3){
            setActiveQuestion(0)
            console.log("restart")
        }else{
            setActiveQuestion(activeQuestion + 1)
            console.log(activeQuestion)
        }
    }
    const showQuestion = (i) => {
        if(i == activeQuestion){
            return 'w-11/12 my-0 mx-auto p-5 flex flex-col gap-2'
        } else {
            return "hidden"
        }
    }

    

    return (
       
           <div>
               { SampleQuestions ? SampleQuestions.map((questions, i) => {
                return(

                    
                    <Paper className={showQuestion(i)} key={questions.id}>
                        <Typography variant="h4">
                            {questions.question}
                        </Typography>
                        <TextField 
                        label="Answer"/>
                        <Link to={"/game"} className='no-underline'><Button className='w-full' variant="contained">Start Playing!</Button></Link>
                        <Button onClick={nextQuestion} variant="contained">Next</Button>
                    </Paper>
                    
                )
            }) : null
            }
           </div>
            
            
       
    )
}

export default SampleQuestionsDisplay
