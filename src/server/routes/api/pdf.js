const express = require("express");
const router = express.Router();

const { checkLoggedIn } = require("../../utils/middleware");

const config = require("../../config");
const upload = require("../../utils/upload");

router.post("/new", (req, res) => {
    const uploadedFiles = req.body;
    console.log("Variable whatever: ", uploadedFiles);
    console.log("REQ. BODY. PDF ", req.body.pdf);
    console.log("REQ FILES ", req.files);

    // const singleFile = uploadedFiles.map((file, index) =>
    //     console.log("All FILES LOGGED IN THE BACK TOO ", file(index))
    // );

    // if (!email || !password) res.status(400).send({ error: "Missing Credentials." });

    // User.findOne({ email })
    //     .then(existingUser => {
    //         if (existingUser) return res.status(400).send({ error: "E-Mail exists already." });

    //         return req.files && req.files.picture ? upload(req.files.picture) : Promise.resolve();
    //     })
    //     .then(pictureUrl => {
    //         const hashedPassword = bcrypt.hashSync(password, 10);
    //         return new User({ email, password: hashedPassword, profilePicture: pictureUrl }).save();
    //     })
    //     .then(user => {
    //         const token = jwt.sign(
    //             { _id: user._id, email: user.email, profilePicture: user.profilePicture },
    //             config.SECRET_JWT_PASSPHRASE
    //         );
    //         res.send({ token });
    //     });
});

module.exports = router;
