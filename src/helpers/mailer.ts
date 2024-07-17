import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        //create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                { verifyToken: hashedToken, verifyExpire: Date.now() + 3600000 })
        } else if (email === "RESET") {
            await User.findByIdAndUpdate(userId,
                { forgotPasswordToken: hashedToken, forgotPasswordExpire: Date.now() + 3600000 })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "e23eb3d50d0da5",
                pass: "23d4d71fae33ad"
                // TODO: add these credentials to .env file
            }
        });

        const mailOptions = {
            from: '"omeraydin2112@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            text: "Hello world?",
            html: `<p>Click <a href="${process.env.DOMAINç}/verifyemail?token=${hashedToken}">here</a> 
            to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> 
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`,
        }

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}