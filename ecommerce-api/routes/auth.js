const User = require("../models/User");
const router = require("express").Router();
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

// Register
router.post("/register", async (req, res) => {
    const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });

    try {
        const savedUser = await newUser.save()
        const accessToken = jwt.sign(
            {
                id: savedUser._id,
                isAdmin: savedUser.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        );

        const { password, ...others } = savedUser._doc;
        res.status(200).json({ ...others, accessToken });
        // res.status(201).json(savedUser);
    }
    catch (err) {
        // console.log({Error: err.message})
        res.status(500).json({Error: err.message});
    }
})

//Login
router.post("/login", async (req, res) => {
    try 
    {
        const user = await User.findOne(
            {
                username: req.body.username
            }
        );

        if(!user){
            res.status(401).json("Wrong User Name");
        }
        else{            
            const hashedPassword = CryptoJS.AES.decrypt(
                user.password,
                process.env.PASS_SEC
            );

            const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    
            const inputPassword = req.body.password;
    
            if(originalPassword !== inputPassword){
                res.status(401).json("Wrong Password");
            }
            else{
                const accessToken = jwt.sign(
                    {
                        id: user._id,
                        isAdmin: user.isAdmin,
                    },
                    process.env.JWT_SEC,
                    { expiresIn: "3d" }
                );
        
                const { password, ...others } = user._doc;
                res.status(200).json({ ...others, accessToken });
            }
        }
    } 
    catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router