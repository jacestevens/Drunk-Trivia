import React, {useContext} from 'react'
import {AppBar, Button, Toolbar, Typography, IconButton} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from '@reach/router';
import Logout from './Logout';
import { GlobalContext } from '../context/GlobalContext';


const Navigation = () => {

    const {userInfo, setuserId, userId} = useContext(GlobalContext)

    return (


        <div>
        <AppBar position="static" sx={{backgroundColor: 'rgb(30 41 59)'}}>
        <Toolbar className='flex flex-row justify-between'>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
        <MenuIcon />
          </IconButton>
          <div>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bar Trivia
            </Typography>
          </div>
          <div className='flex flex-row'>
            <Link to="/" className='no-underline'><Button sx={{color: 'white'}}>Home</Button></Link>
            { userId ?
            <Logout /> : <Link to="/login" className='no-underline'><Button sx={{color: 'white'}}>Login</Button></Link> 
            }
          </div>
        </Toolbar>
      </AppBar>
        </div>

        
    )
}

export default Navigation
