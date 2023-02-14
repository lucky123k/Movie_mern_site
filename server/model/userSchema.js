const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const bCript = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]

});

// hashing the password
userSchema.pre('save', async function (next) {
    if (this.isModified('pasword')) {
        this.password = bCript.hash(this.password, 12);
        this.cpassword = bCript.hash(this.cpassword, 12);
    }
    next();
})

//we are using token
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, luckykhandelwal1234556789);
        this.tokens = this.tokens.concat({token: token});   //databse me token stored karane k liye
        await this.save();
        return tokenLucky; 
    } catch (err) {
        console.log(err);
 
    }

     
}



const User = mongoose.model('USER', userSchema);
module.exports = User;


 