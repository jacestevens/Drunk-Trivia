import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, navigate } from '@reach/router';
import { Button, Paper, TextField,  MenuItem, TextareaAutosize, FormControl, InputLabel } from '@mui/material';



// import Button from 'react-bootstrap/Button';
// import "../App.css"


const TriviaForm = () => {
    const [question, setQuestion] = useState("");
    const [tidbit, setTidbit] = useState("");
    const [answers, setAnswers] = useState([]);
    const [answerStr, setAnswerStr] = useState("");
    // const [description, setDescription] = useState("");
    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [answer3, setAnswer3] = useState("");
    const [answer4, setAnswer4] = useState("");
    // const [skill3, setSkill3] = useState("");
    const [errors, setErrors] = useState({});

    // const { submitted, setSubmitted } = props;
    // useEffect(() => {
    //     // updateAnswerArr();  
    //     setAnswers(answerStr.split(","));
    // }, [answerStr])
    // const updateAnswers = () => {

    // }

    // // const updateAnswerArr = () => {
    //     setAnswers(answerStr.split(","));
    // // }


    // const updateAnswerString = async (e) => {
    //     setAnswerStr(e.target.value)


    //     await setAnswers(answerStr.split(","));
    // }



    const triviaSubmit = (e) => {
        e.preventDefault();
        // updateAnswerString();
        // setAnswers(answerStr.split(","));
        const newTrivia = {
            question,
            answers: [answer1, answer2, answer3, answer4],
            tidbit,



        };
        axios.post("http://localhost:8001/api/trivias", newTrivia)
            .then(response => {
                console.log(response);
                setQuestion("");
                setTidbit("");
                setAnswers([]);


                // setSubmitted(!submitted);
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
            });
    }

    return (
        <div>


            <form onSubmit={triviaSubmit} >
                <div className="header">
                    <h1>Add Trivia</h1>
                </div>
                <div className="flex flex-col gap-3 p-3">
                    <div className="left-Pets">

                    </div>
                    <div className="" >
                        {/* Question: {" "} */}
                        <TextField type="text" label="Question" onChange={(e) => setQuestion(e.target.value)}
                            value={question} sx={{width: "100%"}}
                        />
                        {errors.question ?
                            <p className="Error">{errors.question.message}</p>
                            : null
                        }
                    </div>
                    <div className="">
                        {/* Tidbit: {" "} */}
                        <TextField type="text" label="Tidbit" onChange={(e) => setTidbit(e.target.value)}
                            value={tidbit} sx={{width: "100%"}}
                        />
                        {errors.tidbit ?
                            <p className="Error">{errors.tidbit.message}</p>
                            : null
                        }
                    </div>
                    <div className="flex flex-col gap-3">

                        {/* Answer1: {""} */}
                        <TextField label="Answer" type="text" onChange={(e) => setAnswer1(e.target.value)}
                            value={answer1} sx={{width: "100%"}}
                        />
                        {errors.answer1 ?
                            <p >{errors.answer2.message}</p>
                            : null
                        }
                        {/* Answer2: {""} */}
                        <TextField label="Answer"  type="text" onChange={(e) => setAnswer2(e.target.value)}
                            value={answer2} sx={{width: "100%"}}
                        />
                        {errors.answer2 ?
                            <p >{errors.answer2.message}</p>
                            : null
                        }
                        {/* Answer3: {""} */}
                        <TextField label="Answer" type="text" onChange={(e) => setAnswer3(e.target.value)}
                            value={answer3} sx={{width: "100%"}}
                        />
                        {errors.answer3 ?
                            <p >{errors.answer3.message}</p>
                            : null
                        }
                        {/* Answer4: {""} */}
                        <TextField label="Answer" type="text" onChange={(e) => setAnswer4(e.target.value)}
                            value={answer4} sx={{width: "100%"}}
                        />
                        {errors.answer4 ?
                            <p >{errors.answer4.message}</p>
                            : null
                        }

                    </div>

                    {/* <div className="">
                        Answer2: {" "}
                        <input type="text" onChange={(e) => setAnswer2(e.target.value)}
                            value={answer2[1]}
                        />

                    </div> */}
                    {/* <div className="">
                Skill Two: {" "}
                <input type ="text" onChange={(e) => setSkill2(e.target.value)}
                value={skill2}
                />

                </div>
                <div className="">
                Skill Three: {" "}
                <input type ="text" onChange={(e) => setSkill3(e.target.value)}
                value={skill3}
                /> */}
                    {/* /} */}

                    {/* {/* </div> */}
                    <button onClick={triviaSubmit} type="submit" class="btn btn-primary" >

                        Add Question</button>
                </div>

            </form >

        </div >


    )
};

export default TriviaForm;