import { Paper, TextField, Button, Alert, AlertTitle  } from '@mui/material'
import axios from 'axios'
import React, { useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import {navigate, Link} from '@reach/router'





const Login = () => {


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState("")
    const { setuserInfo, setuserId} = useContext(GlobalContext)

    const login = (e) => {

        e.preventDefault()
        axios.post("http://localhost:8001/api/users/login", {
            email: email,
            password: password
        },{withCredentials: true})
        .then((res) => {


            localStorage.setItem("userId", res.data.userId)
            localStorage.setItem("username", res.data.userLoggedIn)
            console.log(res.data)   
            setuserId(res.data.userId)
            setuserInfo(res.data.userLoggedIn)
            navigate("/admin")
            
            
        })
        .catch((err) => {
            setErrors(err.response.data)
            console.log(err.response.data)
        })


    }



    return (
        <div>
            <div className='pt-5'>
            {/* <Navigation /> */}
            <Paper elevation={3} className="p-10 mx-auto mt-8 mb-96 w-5/12">
                <form onSubmit={login} className="flex flex-col gap-4">
                {errors ? 
                <div className='flex flex-col'> 
                <Alert severity="error" className="my-5">
                <AlertTitle>{errors.message}</AlertTitle>
        
                </Alert>
                    <TextField error id="outlined-error" label="Login attempt failed!" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                :
                <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={e => setEmail(e.target.value)}/>
                }
                {errors ? 
                <TextField error id="outlined-error" label="Login attempt failed!" type="password" name="email" value={password} onChange={e => setPassword(e.target.value)}/>:
                <TextField id="outlined-basic" label="Password" variant="outlined" type="password" value={password} onChange={e => setPassword(e.target.value)}/>}
                <Button type="submit" variant="contained" sx={{backgroundColor: 'rgb(30 41 59)'}}>Login</Button>
                </form>
                <Link to="/Register" className='no-underline'><Button variant="contained" sx={{backgroundColor: 'rgb(30 41 59)', marginTop: 1, width: "100%"}}>Register</Button></Link>
            </Paper>
        </div>
    </div>
    )
}

export default Login
