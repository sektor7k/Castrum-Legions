"use client"

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            console.log("buraya")
            await axios.post('/api/users/verifyemail', { token })
            console.log("geldi")
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token])

    return (
        <div className=" flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">
                Verify Email
            </h1>
            <h2 className="p-2 bg-orange-500 text-black">
                {token ? `${token}` : "no token"}
            </h2>

            {verified && (
                <div>
                    <h2 className="p-2 bg-green-500 text-black">
                        Email verified
                    </h2>
                    <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="/login">
                        Login
                    </Link>
                </div>
            )}

            {error && (
                <div>
                    <h2 className="p-2 bg-red-500 text-black">
                        Error
                    </h2>
                    
                </div>
            )}
        </div>
    )
}