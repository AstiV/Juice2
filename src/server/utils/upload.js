const cloudinary = require("cloudinary");
const config = require("../config");
const fs = require("fs");

cloudinary.config({
    cloud_name: config.CLOUDINARY_NAME,
    api_key: config.CLOUDINARY_KEY,
    api_secret: config.CLOUDINARY_SECRET
});

function upload(file) {
    return new Promise((resolve, reject) => {
        file.mv(`tmp/${file.name}`, function(err) {
            if (err) return reject(err);
            // cloudinary.image(`tmp/${file.name}.jpg`, { width: 200, height: 250, page: 2, crop: "fill" });
            cloudinary.uploader.upload(`tmp/${file.name}`).then(uploadResult => {
                fs.unlinkSync(`tmp/${file.name}`);
                resolve(uploadResult.secure_url);
            });
        });
    });
}

module.exports = upload;
