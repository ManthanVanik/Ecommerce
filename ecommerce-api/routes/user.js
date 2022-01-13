const User = require("../models/User");
const CryptoJS = require('crypto-js');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

// update
router.put("/user/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
            { new: true }
        );
        res.status(200).json(updatedUser);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.put("/address/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: { "address": req.body }
        },
            { new: true }
        );
        res.status(200).json(updatedUser);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.put("/password/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.oldpassword && req.body.newpassword) {
        const newpassword = CryptoJS.AES.encrypt(req.body.newpassword, process.env.PASS_SEC).toString();
        try {
            const id = req.params.id;
            const user = await User.findById(id);
            const password = CryptoJS.AES.decrypt(user.password,process.env.PASS_SEC).toString(CryptoJS.enc.Utf8);
            // console.log(password)
            if (req.body.oldpassword === password)
            {
                const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                    $set: {"password" : newpassword}
                },
                    { new: true }
                );
                res.status(200).json(updatedUser);
            }
            else{
                console.log("error");
            }
        }
        catch (err) {
            res.status(500).json({Error : err.message});
        }
    }
    else {
        console.log("enter valid password")
    }

});

// delete
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted...")
    }
    catch (err) {
        res.status(500).json(err);
    }
});


// get
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// get all
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// stats
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastyear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastyear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                }
            }
        ]);
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router