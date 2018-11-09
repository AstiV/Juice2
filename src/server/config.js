module.exports = {
    IS_PRODUCTION: process.env.NODE_ENV === "production",
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/Juice",
    SECRET_JWT_PASSPHRASE: "TWLom9RDbmGYBtkHHPe4m8pKswyUY",
    CLOUDINARY_NAME: "astridvarga",
    CLOUDINARY_KEY: "316451391768145",
    CLOUDINARY_SECRET: "x6z2wXO7T4LQHcgOwJN4AXUc6yQ"
};
