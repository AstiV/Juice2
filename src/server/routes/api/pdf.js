const express = require("express");
const router = express.Router();

const User = require("../../models/User");

const { checkLoggedIn } = require("../../utils/middleware");
const jwt = require("jsonwebtoken");

const config = require("../../config");
const upload = require("../../utils/upload");

router.post("/new", checkLoggedIn, (req, res) => {
    // const uploadedFiles = req.body;
    // console.log("Variable whatever: ", uploadedFiles);
    // console.log("REQ. BODY. PDF ", req.body.pdf);
    console.log("REQ FILES ", req.files);
    const p = req.files && req.files.pdf ? upload(req.files.pdf) : Promise.resolve(undefined);
    p.then(fileUrl => {
        const updateData = {};
        if (fileUrl) updateData.pdf = fileUrl;

        return User.findByIdAndUpdate(req.user._id, updateData, { new: true });
    })
        .then(user => {
            const jsonUser = user.toObject();
            delete jsonUser.password;
            console.log(jsonUser);
            const token = jwt.sign(jsonUser, config.SECRET_JWT_PASSPHRASE);

            res.send({ token });
        })
        .catch(err => {
            console.error(err);
        });
});

module.exports = router;
