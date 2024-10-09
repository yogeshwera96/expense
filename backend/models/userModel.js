const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const nodemailer = require('nodemailer'); 
const { sendEmail } = require('../Services/emailServices')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Invalid email format']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    budget: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });

// Email configuration using Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Or any other email service like 'SendGrid', 'Mailgun', etc.
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS  // Your email password (or app-specific password)
    }
});

// Function to send welcome email
const sendWelcomeEmail = (email, username) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Welcome to Expenses Tracker!',
        text: `Hi ${username},\n\nYou have successfully registered for the Expenses Tracker. Welcome aboard!\n\nBest regards,\nThe Expenses Tracker Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};
// Static signup method
// Signup function
userSchema.statics.signup = async function(email, password, username) {
    if (!email || !password || !username) {
        throw Error('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
        throw Error('Invalid email format');
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password must be stronger');
    }

    const exists = await this.findOne({ email });

    if (exists) {
        throw Error('Email is already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash, username });

    // Send signup confirmation email
    await sendEmail(email, "Registration Successful", `Hello ${username}, you have successfully registered!`);

    return user;
};

// Static login method
userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled');
    }

    const user = await this.findOne({ email });

    if (!user) {
        throw Error('Incorrect email');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error('Incorrect password');
    }

    return user; // Or return specific user details, excluding password if needed
};

module.exports = mongoose.models.User || mongoose.model('User', userSchema);

