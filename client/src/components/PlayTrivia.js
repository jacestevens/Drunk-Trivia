import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import { Button, Paper, TextField, Typography, Alert} from "@mui/material"

const PlayTrivia = (props) => {


    const { socket } = (props);

    const [playersData, setPlayersData] = useState({});
    // const { id } = props;
    const [question, setQuestion] = useState("");
    const [tidbit, setTidbit] = useState("");
    const [guess, setGuess] = useState("");
    // const [questionId, setQuestionId] = useState("");
    const [correctBoolean, setCorrectBoolean] = useState(false);
    const [nextBoolean, setNextBoolean] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [activateButton, setActivateButton] = useState(false);
    const [hideGame, setHideGame] = useState(false);
    const [hideHeader, setHideHeader] = useState(false)
    


    // const [allQuestions, setAllQuestions] = useState([]);
    // var questionTimer = 60;
    // var score = 0;
    // const [answerStr, setAnswerStr] = useState("");

    // const displayAnswer = () => {
    //     document.getElementById("Answer").style.display = "Block";
    // }
    useEffect(() => {
        socket.on('updatePlayersData', (playerData) => setPlayersData(playerData));
        socket.on('gameStarting', (data) => {
            // setTriviaGameState(data);
            console.log("gameStarted");
            startGame();
        });
        socket.on('gameEnded', (data) => {
            // setTriviaGameState(data);
            console.log("game Ended");
            navigate("/winner");
        });
        axios.get(`http://localhost:8001/api/random`)
            .then(res => {
                // console.log(res.data);
                setQuestion(res.data.question);
                setTidbit(res.data.tidbit);
                setAnswers(res.data.answers);
                // setQuestionId(res.data._id);
                // setQuestionID(res.data._id)
                // setAllQuestions([res.data._id, ...allQuestions])
                // console.log(questionID);
                // console.log(allQuestions);
                // console.log(questionId);



            })
            .catch(err => console.log(err))
    }, [nextBoolean]);

    const nextQuestion = () => {
        // console.log(allQuestions);
        setNextBoolean(nextBoolean => !nextBoolean);
        // console.log(nextBoolean => !nextBoolean);
        // getQuestion();
        document.getElementById("Answer").style.display = "none";
        document.getElementById("Submit").style.display = "none";
        setCorrectBoolean(false);
        setErrorMessage(false);
        setGuess("");
        // checkDuplicateQuestion();

    }
    // const checkDuplicateQuestion = () => {
    //     for (var i = 0; i < allQuestions.length; i++) {
    //         // console.log(answers[i]);
    //         if (allQuestions[i] === questionId) {
    //             setNextBoolean(nextBoolean => !nextBoolean);
    //             console.log("dup check");
    //         }
    //     }
    // }
    const styleAnswerSubmit = () => {
        document.getElementById("Answer").style.display = "block";
        document.getElementById("Submit").style.display = "block";
    }
    const preStartGame = () => {
        
        socket.emit('startGame');
    }
    const startGame = () => {
        
        setHideGame(true)
        setHideHeader(true)
        // setNextBoolean(!nextBoolean);
        socket.on('updatePlayersData', (data) => setPlayersData(data));
        // document.getElementById("StartGame").style.display = "block";
        function countdown() {
            if (gameOver === true) {
                console.log("game is over")
            }
            else {
                var seconds = 10;
                function tick() {
                    var counter = document.getElementById("counter");
                    seconds--;
                    counter.innerHTML = "0:" + (seconds < 10 ? "0" : "") + String(seconds);
                    if (seconds > 0) {
                        setTimeout(tick, 1000);
                    } else {
                        styleAnswerSubmit();
                        displayWait();
                        socket.on('updatePlayersData', (data) => setPlayersData(data));
                    }
                }
                tick();
            }

        }

        countdown();
    }
    const displayWait = () => {
        if (gameOver === true) {
            console.log("game is over")
        } else {


            document.getElementById("displayWait").style.display = "block";
            function countdown() {
                if (gameOver === true) {
                    console.log("game is over")
                }
                var seconds = 5;
                function tick() {
                    var counter = document.getElementById("displayWait");
                    seconds--;
                    counter.innerHTML = "0:" + (seconds < 10 ? "0" : "") + String(seconds);
                    if (seconds > 0) {
                        setTimeout(tick, 1000);
                    } else {
                        nextQuestion();
                        startGame();
                        document.getElementById("SubmitButton").style.display = "block";
                        console.log("ran display")

                    }
                }

                tick();

            }
            countdown();
        }
    }
    // const timerEnd = () {
    const declareWinner = () => {
        if (score > 4) {
            socket.emit('endGame');
            socket.emit('winnerName', socket.id)
            setGameOver(true);
            console.log(gameOver);
            document.getElementById("StartGame").style.display = "none";
            document.getElementById("Winner").style.display = "block";
        }
    }
    // }
    // const getQuestion = () => {
    //     for (var i = 0; i < allQuestions.length; i++) {
    //         if (allQuestions[i] === id && allQuestions.length > 0) {
    //             setNextBoolean(!nextBoolean);

    //         }
    //     }
    // }
    const displayAnswer = () => {
        if (guess.length < 1) {
            setErrorMessage(!errorMessage);
            styleAnswerSubmit();
            return
        }
        for (var i = 0; i < answers.length; i++) {
            console.log(answers[i]);
            if (answers[i] === guess && guess.length > 0) {
                setCorrectBoolean(!correctBoolean);
                setScore(score + 1);
                socket.emit('scoreUp');

            }
        }
        styleAnswerSubmit();
        console.log(correctBoolean);
        console.log(guess);
        console.log(errorMessage);
        document.getElementById("SubmitButton").style.display = "none";
        declareWinner();
        //     // console.log(guess);
        //     // setCosdfsdfsfrrectBoolean = setAnswers.contains(guess => { guess == })
        // }
    }

    // const btnNext = document.getElementById("btnNext");
    // btnNext.addEventListener('click', function () {

    // });

    const updateUsername = (e) => {
        e.preventDefault();
        setActivateButton(true)
        if(username.length > 0) {
            socket.emit('setUsername', username);
        }
    }
    

    return (
        <div className='flex flex-col items-center'>
            
            <div className="flex flex-col gap-4 w-11/12 items-center my-4 mx-auto" >
                <div>

                <img src="https://images.getbento.com/accounts/f468abc38bf68e2c74a93581297771cf/media/images/18295broken-shaker-logo.png" alt="" className='h-24 w-auto'/>
                </div>
                {
                hideHeader ? null :
                <div className='flex flex-col gap-3'>
                    <Typography variant="h3">Broken Shaker's Trivia Night!</Typography>
                    <form onSubmit={updateUsername} className='flex flex-col gap-2'>
        
                        <TextField
                        
                            name='username'
                            label="What's your name?"
                            value={username}
                            onChange={e => {setUsername(e.target.value)}}
                        />
                    
                            <Button variant="contained" type='submit'>I like this name</Button> 
                    </form>
                    {
                    activateButton ?
                    <Button variant="contained" size="large" onClick={preStartGame} sx={{fontSize: 20, paddingX: 20}}>Let's Drink!</Button> : <Button disabled variant="contained" size="large" onClick={preStartGame} sx={{fontSize: 20, paddingX: 20}}>I Don't Know Who I Am Yet</Button>
                    }
                </div>
                }
            </div>
            
            {
            hideGame ? 
            <div className='w-10/12 my-0 mx-auto'>
                <div className='flex flex-col gap-2 w-10/12 my-0 mx-auto'>

                <Paper className="flex flex-row justify-between items-center p-4">
                    <div >
                        <h4>Question timer:</h4>
                        <h4 id="counter"></h4>
                    </div>

                    <h4>Score: {score}</h4>
                    <div>
                        <h4>Time till next question:</h4>
                        <h4 id="displayWait"></h4>
                    </div>

                </Paper>
                <div>
                    <div className='flex flex-col gap-4'>
                        <p>
                            {/* <button id="btnNext" onClick={nextQuestion}>Next Question</button> */}
                        </p>
                        <Paper elevation ={3} className='p-4'>
                            <Typography variant="h4">{question}</Typography>
                        </Paper>


                        <div id="GuessDiv">
                            
                            <TextField label="Your Answer?" type="text" className='w-full' onChange={(e) => setGuess(e.target.value)}
                                value={guess}
                            />
                        </div>

                        <div id="Submit">
                            {
                                correctBoolean ?
                                  
                                    <Alert severity="success" variant='filled' icon={false} sx={{fontSize: 20}}>You're Correct!</Alert>
                                    : <Alert severity="error" variant='filled' icon={false} sx={{fontSize: 20}}>Incorrect! Try Again!</Alert>
                            }

                            {errorMessage ?
                                <p className="Error">
                                    Guess cannot be blank
                                </p>
                                : <></>
                            }
                        </div>
                        <Button variant="contained" id="SubmitButton" onClick={displayAnswer}>Submit</Button>
                        <p>
                            <label>Guess: {guess}</label>
                        </p>
                        <div id="Answer">
                            <div className="displayinfo">
                                Answer:
                                <label id="Question">{answers}</label>
                            </div>

                            <div className="displayinfo">
                                Tidbit:
                                <label id="Question">{tidbit}</label>
                            </div>

                        </div>

                    </div>
                </div> 
                </div>
                
            </div> : null
            }
            <Paper elevation={3} className=' w-10/12 p-2 my-1 mx-auto'>
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
            <div id="Winner">
                <label>Congrats User: Won the game!</label>
            </div>

            </div>
            
       



    )

};

export default PlayTrivia;