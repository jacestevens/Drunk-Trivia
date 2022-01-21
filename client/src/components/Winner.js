import React, {useState, useEffect} from 'react'
import { Typography, Paper, Button } from '@mui/material'

 
const Winner = (props) => {

    const {socket} = props;
    const [playersData, setPlayersData] = useState({});
    const [winner, setWinner] = useState("");


    useEffect(() => {
       
        socket.emit("requestWinnerName");
        socket.emit("requestPlayersData");
        socket.on("sendWinnerName", (data) => {
            setWinner(data)
        })
        socket.on('updatePlayersData', (playerData) => setPlayersData(playerData));

    }, [])

    return (

        <div className=' flex flex-col gap-6'>
            
            <Paper className='winner-background w-11/12 my-10 mx-auto flex flex-col gap-4 justify-end p-5'>

                    <div className='flex flex-col gap-3 w-7/12'>
                        <Typography variant='h3' sx={{color: 'white', textAlign: "left", fontWeight: "bold"}}>CONGRATULATIONS TO {winner} </Typography>
                        <Typography variant='h5' sx={{color: 'white', textAlign: "left"}}>Head over to the bar and claim your prize! Thank you to all that participated!</Typography>
                    </div>
              
            </Paper>
            <Paper elevation={3} className='w-3/12 p-2'>
                    <table id='scoreBoard'>
                        <thead>
                            <tr>
                                <td>Player</td>
                                <td>Score</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                playersData ?
                                    Object.keys(playersData).map((player, index) => (
                                        <tr key={player.username}>
                                            {
                                                player === socket.id ?
                                                    <td className='you'>{playersData[player].username} (You)</td>
                                                    :
                                                    <td>{playersData[player].username}</td>
                                            }
                                            {
                                                player === socket.id ?
                                                    <td className='you'>{playersData[player].score}</td>
                                                    :
                                                    <td>{playersData[player].score}</td>
                                            }
                                        </tr>
                                    ))
                                    : <p>scoreboard error</p>
                            }
                        </tbody>
                    </table>
                </Paper> 
        </div>

    )
}

export default Winner
