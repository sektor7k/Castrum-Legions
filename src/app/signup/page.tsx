"use client"
import Link from "next/link";
import { useEffect, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function SignupPage() {

    const router = useRouter();

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false)

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data.message);
            router.push("/login");
            
        } catch (error: any) {
            console.log("Signup failed", error.message);

            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{

        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false);
        }else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>
                {loading ? "Processing" : "Signup"}
            </h1>
            <hr />
            <label htmlFor="username">Username</label>
            <input
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="username"
                className=" p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            />

            <label htmlFor="email">email</label>
            <input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
                className=" p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            />

            <label htmlFor="password">password</label>
            <input
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
                className=" p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            />
            <button
            onClick={onSignup}
                className=" p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 "
            >
                {buttonDisabled ? "No Signup": "Signup"}
            </button>
            <Link href={"/login"}>Visit login page</Link>
        </div>
    )
}