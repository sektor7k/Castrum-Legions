import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypts from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";



connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {  email } = reqBody;
        console.log(reqBody);

        const user = await User.findOne({ email })


        // send forgot password email
        await sendEmail({email, emailType: "RESET", userId: user._id})

        return NextResponse.json({
            message: "Forgot password successfully",
            success: true,
            user
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}