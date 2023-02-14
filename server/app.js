const mongoose = require('mongoose')
const express = require('express');
const app = express();


const DB = 'mongodb+srv://lucky:lucky123@cluster0.3gz7edg.mongodb.net/mernstack?retryWrites=true&w=majority'

async function connect() {
    try{
        await mongoose.connect(DB);
        console.log('connected');
    } catch(error){
        console.error(error);
    }
}

connect();
app.use(express.json());

// const User = require('./model/userSchema')

app.use(require('./router/auth'));

//middleware
const middleware = (req,res,next) =>{
    console.log(`hello my middleware`);
    next();
}

app.get('/', (req,res) => {
    res.send(`hello from home server`)
});

app.get('/about', middleware, (req,res) => {
    res.send(`hello from about server`) //jab tak next call nahi karenge tabtak nahi khulega
});

app.get('/contact', (req,res) => {
    // res.cookie("lucky",'khan');
    res.send(`hello from contact server`)
});

app.get('/login', (req,res) => {
    res.send(`hello from login server`)
});

app.get('/register', (req,res) => {
    res.send(`hello from register server`)
});



app.listen(4000, () =>{
    console.log(`server is running at port no 4000`);
})

module.exports = app;