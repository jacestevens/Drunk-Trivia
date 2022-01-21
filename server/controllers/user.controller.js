const User = require('../models/user.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

    register: (req, res) => {
        
        console.log("In Register")
        console.log(req.body)

        const user = new User(req.body)

            //req is an object that contains the information about the http request that raised the event

        user.save()
            .then((newUser) => {
                console.log(newUser)
                console.log("successfully registered!")

                // why are we using res.json here?
                res.json({
                    successMessage: "Successfully registered! Woof!",
                    user: newUser
                });
            })
            .catch((err) => {
                console.log(err)
                console.log("there was an error in saving this user")
                res.status(400).json(err);

            })

    }, 

    login: (req, res) => {
        User.findOne({email: req.body.email})
            .then((userRecord) =>
            {
                if(userRecord === null){
                    res.status(400).json({message: "Invalid login attempt!"});
                    // this means the email is not found
                } else {
                    // this runs when the email is found
                    bcrypt
                        .compare(req.body.password, userRecord.password) //returns a boolean which runs on the promise below it calls itself "isPasswordValid"
                        .then((isPasswordValid) => {
                            if(isPasswordValid){
                                console.log("password is valid")
                                res.cookie(
                                    "userToken", 
                                    jwt.sign(
                                        {
                                            //payload is what we want to save, whatever that is
                                            id: userRecord._id,
                                            email: userRecord.email, 
                                            username: userRecord.username
                                        }, 
                                        //we need a key to hash and hide all the data above. Here is where we're gonna use dotenv to create a secret environment. this secret environment is not going to be saved on our public code
                                        process.env.JWT_SECRET
                                    ), 

                                        {
                                            //configuration settings for this cookie options 
                                            //if we make this http only, it allows it to be hidden in the client side and only can be read in the server

                                            httpOnly: true, 
                                            expires: new Date(Date.now() + 9000000)
                                        },
                                ).json({

                                        
                                        message: "You have Successfully Logged In!",
                                        userLoggedIn: userRecord.username, 
                                        userId: userRecord._id

                                });
                            } else {

                                res.status(400).json({
                                    message: "Login attempt failed"
                                })
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(400).json({
                                message: "Invalid Attempt"
                            })
                        })
                    }

            })

            .catch((err) => {
                console.log("error");
                res.status(400).json({ message: "Invalid Attempt" });
            });

    }, 

    logout: (req, res) => {
        console.log("logging out")
        res.clearCookie("userToken")
        res.json({
            message: "You have successfully logged out!"
        })
    }, 

    getOneUser: (req, res) => {
        User.findOne({_id: req.params._id})
            .then((oneUser)=> {
                console.log(oneUser);
                res.json(oneUser);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err)
                console.log("There was something wrong in getting the user")
            }) 
    },

    getAllUsers: (req, res) => {
        User.find({})
            .then((allUsers) => {
                console.log(res.data)
                res.json(allUsers)
            })
    }

}

//notes: 
//First we make the register function
    //Here we create the user to which we post it on our json (res.json) as a newUser also creating the message for successfully creating a user

//Then we create the function for logging in
    // User.findOne({}) we first try to see if we can find the user using the information they have used (email) 
        //we create an if else statement through the promise **this is also where we create the variable for the user & all of it's information: userRecord
            //if(userRecord == null) this is when the user is doesnt exist in the database––We return an error 
            //if the user exist this is an entire long function
                //First use Bcryt to compare the passwords 
                //Then we go into our environment where all of the info is saved