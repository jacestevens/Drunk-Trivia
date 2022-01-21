const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, "Username is required to continue"]
    },

    email: {
        type: String, 
        required: [true, "Bark! You need to have an email, ask your pawrents!"],
        minLength: [3, "Bark! Email must be at least 3 characters"]

    }, 

    password: {

        type: String,
        required: [true, "Bark! A password is required"], 
        minLength: [8, "Bark! Passwords must be at least 8 characters"]

    }

}, {timestamps: true})

// Now we work on the virtual field
    // this stores info from our fields but does not save it on the database for security measures 

    UserSchema.virtual("confirmPassword")
    .get(()=>this._confirmPassword)
    .set((value)=> this._confirmPassword = value)



    UserSchema.pre("validate", function(next){

        console.log("In Validate")
        if(this.password !== this.confirmPassword){
            this.invalidate("confirmPassword", "Password must match!")
            console.log("It didn't match!")
            console.log(this.confirmPassword)
        }
        console.log(this.password, this.confirmPassword)
        // using this next function allows us to move on to the next pre.
        next();
    })  

    UserSchema.pre("save", function(next){

        console.log("in pre save");

        // The following function would now allow us to hash and encrypt the saved password

        bcrypt.hash(this.password, 10)
            .then((hashedPassword) => {
                console.log(hashedPassword);
                this.password = hashedPassword;
            next();
            })
        })

const User = mongoose.model("User", UserSchema);

module.exports = User; 