const express = require('express');
const router = express.Router();
const bCript = require('bcryptjs')
const jwt = require('jsonwebtoken');

require('../app');
const User = require('../model/userSchema');

router.get('/', (req, res) => {
    res.send(`hello from router js`)
});

//using promises
// router.post('/register', (req,res) => {
//     const {name, email, phone ,password,cpassword} = req.body;

//     if(!name || !email || !phone || !password || !cpassword) {
//         return res.json({error: "plz filled the fiels properly"})
//     }

//     User.findOne({email:email})
//        .then((userExist) =>{
//         if(userExist){
//             return res.status(422).json({error: "Email already exist"});
//         }

//         const user = new User({name, email, phone ,password,cpassword});

//         user.save().then(() =>{
//             res.status(201).json({message: "user registerd successfully"});
//         }).catch((err) => res.status(500).json({error: "Failed to registered"}));
//     }).catch(err => {console.log(err);});
// });



// using Async-Await
router.post('/register', async (req, res) => {
    const { name, email, phone, password, cpassword } = req.body;

    if (!name || !email || !phone || !password || !cpassword) {
        return res.json({ error: "plz filled the fiels properly" })
    }

    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "Email already exist" });
        }
        const user = new User({ name, email, phone, password, cpassword });
        // yanha pe
        await user.save();
        res.status(201).json({ Message: "user registered successfully" });
    } catch (err) {
        console.log(err);
    }

});

//login route
router.post('/login', async (req, res) => {
    try {
        let token;
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "plz filled the data" })
        }

        const userlogin = await User.findOne({ email: email });
        const isMatch = await bCript.compare(password, userlogin.password);

        // console.log(userlogin);
        if (userlogin) {
            res.json({ messsge: "user signin successfully" });

            token = await userlogin.generateAuthToken();

            res.cookie("abc", token, {
                expires: new Date(Date.now() + 23498234720),
                httpOnly:true
            });
        } else {
            return res.status(400).json({ error: "user error" });
        }

        if (isMatch) {
            res.json({ messsge: "user signin successfully" });
        } else {
            return res.status(400).json({ error: "user error" });
        }


    } catch (err) {
        console.log(err);
    }
});



module.exports = router;