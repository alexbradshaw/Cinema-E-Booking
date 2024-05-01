import mail from 'nodemailer';
import { Movie, Ticket, Transaction, User } from '../models/index.js';

const transporter = mail.createTransport({
    host: 'smtp-relay.brevo.com', 
    port: 587,
    secure: false, 
    auth: {
      user: 'thisismyspamemail2014@gmail.com', 
      pass: 'dM57vTyK1ascjk9G', 
    },
});

export const sendConfirmEmail = async (target: string, user: User) => {
    const token = user.token_identifier;
    const prefix = process.env.PRODUCTION ? process.env.APP_URL : 'localhost:3000';

    await transporter.sendMail({
        from: '"Cinema E-Booking" <thisismyspamemail2014@gmail.com>', 
        to: target, 
        subject: "Confirm Email - Cinema E-Booking", 
        text: "Thank your for signing up for our Cinema Booking Website!", 
        html: `<div><a href='${prefix}/verify/${token}'>Click here to verify your account.</a></div>`, 
    });
}

export const sendBookingEmail = async (email: string | undefined, transaction: Transaction | null, movie: Movie | null) => {
    await transporter.sendMail({
        from: '"Cinema E-Booking" <thisismyspamemail2014@gmail.com>', 
        to: email, 
        subject: `Purchase Confirmation - ${movie?.title} - Cinema E-Booking`, 
        text: `This is a confirmation email for your booking today, ${new Date().getMonth() + '/' + new Date().getDate() + '/' + new Date().getFullYear()},  totaling: ${transaction?.total}`, 
        html: `<div><a href='${process.env.PRODUCTION ? process.env.APP_URL : 'localhost:3000'}'>Visit Our Website </a></div>`, 
    });
}

export const sendResetEmail = async (target: string, token: string) => {
    const prefix = process.env.PRODUCTION ? process.env.APP_URL : 'localhost:3000';

    await transporter.sendMail({
        from: '"Cinema E-Booking" <thisismyspamemail2014@gmail.com>', 
        to: target, 
        subject: "Reset Password - Cinema E-Booking", 
        text: "Someone requested a password reset for this email, it will expire in 30 minutes. If you did not request this, you can safely disregard this email.", 
        html: `<div><a href='${prefix}/reset/${token}'>Reset Password Here</a></div>`, 
    });
}

export const sendUpdateEmail = async (target: string | undefined, username: string | undefined, item: string) => {
    await transporter.sendMail({
        from: '"Cinema E-Booking" <thisismyspamemail2014@gmail.com>', 
        to: target, 
        subject: "Account Information Changed", 
        text: `This is a notification that your account ${username}${item} was recently updated on our site. If this was not done by you, please contact support immediately.`, 
    });
}