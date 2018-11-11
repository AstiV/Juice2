const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    profilePicture: {
        type: String,
        default:
            "https://upload.wikimedia.org/wikipedia/commons/9/93/Default_profile_picture_%28male%29_on_Facebook.jpg"
    },
    pdf: {
        type: String,
        default:
            "https://res.cloudinary.com/astridvarga/image/upload/v1541956893/Texter-Gehalts-Tabelle-Texterclub.pdf"
    }
});

module.exports = mongoose.model("User", userSchema);
