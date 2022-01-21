import { Paper, TextField, Avatar, Typography, Button } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from '@reach/router';
import { GlobalContext } from '../context/GlobalContext';
import TriviaForm from '../components/TriviaForm'
import CreatedTrivia from '../components/CreatedTrivia';
import TriviaList from '../components/TriviaHome';

const Admin = () => {

    const  {userInfo, userId} = useContext(GlobalContext)
    const [username, setUsername] = useState('')
    useEffect(() => {
        setUsername(localStorage.getItem("username"))
    }, [])
    const avatarInitials = username.charAt(0)
    return (
        <div className='pt-5'>

        <div className="flex flex-row gap-5 mx-auto my-5 w-11/12" >
           <div className="flex flex-col gap-5 w-3/12">
                <Paper className="flex flex-col gap-5 items-center p-10 ">
                    <Avatar sx={{ bgcolor: "black", height: 200, width: 200 }} src="https://images.getbento.com/accounts/f468abc38bf68e2c74a93581297771cf/media/images/broken-shaker-large.png"/>
                    <Typography variant="h4">{username}</Typography>
                </Paper>
           </div>
           <div className="flex flex-col gap-5 w-9/12">
                <Paper className="px-8">
                    <TriviaForm />
                </Paper>
                <Paper className="px-8">
                    <TriviaList />
                </Paper>
                {/* <Paper className="px-8">
                    <CreatedTrivia />
                </Paper> */}
           </div>
        </div>
        </div>
    )
}

export default Admin