import React, {useContext} from 'react'
import axios from 'axios'
import { navigate } from '@reach/router';
import { Button } from '@mui/material'
import { GlobalContext } from '../context/GlobalContext';


const Logout = () => {

    
    const { setuserId, setUserInfo } = useContext(GlobalContext)


    const logout = (e) => {

        
        
        axios
            .post(
                "http://localhost:8001/api/users/logout",
                {},
                {
                    withCredentials: true,
                },
            )
            .then((res) => {

                console.log(res.data);
                localStorage.clear();
                navigate("/");
                setuserId("")
                setUserInfo("")

                
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <Button sx={{color: 'white'}} onClick={logout}>Log Out</Button>
        </div>
    )
}

export default Logout
