import React from 'react'

import { Typography, Paper, Button, Divider } from '@mui/material'
import { Link } from '@reach/router'
import UseMediaQuery from '../hooks/UseMediaQuery'
import ReviewDisplay from './ReviewDisplay'
import SampleQuestionsDisplay from '../components/SampleQuestionsDisplay'


const Home = () => {

    const isMobile = UseMediaQuery('(min-width: 960px)')


    return (
        
        <div className=' flex flex-col gap-4 mt-4 mb-10'>
            { isMobile ?
            <Paper className='home-background h-5/6 w-11/12 mx-auto flex flex-col gap-4 justify-end pt-56 px-5 pb-10'>
    
                    <div className='flex flex-col gap-3 w-6/12'>
                        <Typography variant='h3' sx={{color: 'white', textAlign: "left", fontWeight: "bold"}}>Welcome To Bar Trivia!</Typography>
                        <Typography variant='h5' sx={{color: 'white', textAlign: "left"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Typography>
                    </div>
                    <div className='flex flex-row gap-4'>
                        <Link to="/game" className=' no-underline'><Button variant='contained' size='large' sx={{backgroundColor:'rgb(30 41 59)', fontSize: "1.2rem"}}>I'm Ready To Play!</Button></Link>
                        <Link to="/login" className='no-underline'><Button variant='contained' size='large' sx={{backgroundColor:'rgb(30 41 59)', fontSize: "1.2rem"}}>I'm A Quizmaker</Button></Link>
                    </div>
                
            </Paper> : 
            <div>

                <Paper className='home-background h-5/6 w-11/12 mx-auto p-5'>
                    <Typography variant='h3' sx={{color: 'white', textAlign: "center", fontWeight: "bold"}}>Welcome To Bar Trivia!</Typography>
                </Paper>
                <Paper className='w-11/12 my-10 mx-auto flex flex-col gap-4 justify-end p-5'> 

                    <div className='flex flex-col gap-3'>
                        
                        <Typography variant='h5' sx={{color: 'black', textAlign: "left"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Typography>
                    </div>
                    <div className='flex flex-row gap-4'>
                        <Link to="/game" className=' no-underline'><Button variant='contained' size='medium' sx={{backgroundColor:'rgb(30 41 59)', padding: 1.5}}>I'm Ready To Play!</Button></Link>
                        <Link to="/login" className='no-underline'><Button variant='contained' size='medium' sx={{backgroundColor:'rgb(30 41 59)', padding: 1.5}}>I'm A Quizmaker</Button></Link>
                    </div>
                </Paper>
            </div>
}
            <Paper className={isMobile ? 'flex flex-row w-11/12 mx-auto gap-5 items-center text-white p-5' : 'flex flex-col w-11/12 mx-auto gap-1 items-center text-white p-5' } sx={{backgroundColor:'rgb(30 41 59)'}}>
                <Typography variant='h3'>
                    Trivia Questions
                </Typography>
                <Divider orientation='vertical'/> 
                <Typography variant='h6' className=" text-left">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Typography>
            </Paper>
                <Typography variant='h3' className='text-white text-center '>Reviews</Typography>
            <Paper className={isMobile ? 'w-11/12 p-5 mx-auto my-1 flex flex-col gap-3 justify-start' : ' overflow-x-auto w-11/12 p-5 mx-auto my-1 flex flex-col gap-3 justify-start'} sx={{backgroundColor: "rgb(30 41 59)"}}>
                <ReviewDisplay />
                
            </Paper>
            <SampleQuestionsDisplay />
            
        </div>
    )
}

export default Home
