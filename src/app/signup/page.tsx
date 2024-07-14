"use client"
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";


export default function SignupPage() {

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })

    const onSignup = async () => {

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>
                Signup
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
                type="text"
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
                Signup here
            </button>
            <Link href={"/login"}>Visit login page</Link>
        </div>
    )
}