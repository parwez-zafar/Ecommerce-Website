const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const JWT = require("jsonwebtoken");
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLenght: [13, "Name Cannot Exceed 30 charecters"],
        minLength: [4, "Name Should Have More Than 4 Charecters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter A Valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Passowrd"],
        minLength: [8, "Password Shluld Be Grater Than 8 Charecters"],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    role: {
        type: String,
        default: 'user',
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },


    resetPasswordToken: String,
    resetPasswordExpire: Date,

});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);

})


// JWT token
userSchema.methods.getJWTToken = function () {
    return JWT.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}


// compare password
userSchema.methods.comparePassword = async function (loginPassword) {
    return await bcrypt.compare(loginPassword, this.password);
}

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing and adding to userSchema
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};

module.exports = mongoose.model("User", userSchema);