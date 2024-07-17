import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypts from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";



connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        console.log(reqBody);

        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 })
        }

        //hash password
        const salt = await bcrypts.genSalt(10);
        const hashedPassword = await bcrypts.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        const saveUser = await newUser.save();
        console.log("sasa",saveUser);

        // send verification email
        await sendEmail({email, emailType: "VERIFY", userId: saveUser._id})

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            saveUser
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}