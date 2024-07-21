"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import LampDemo from "../_components/Lamb";



export default function Page() {


    const router = useRouter();
    const [data, setData] = useState("nothing");

    useEffect(() => {
        const getUserDetails = async () => {
            const res = await axios.get('/api/users/me');
            console.log(res.data);
            setData(res.data.data.username);
        }
        getUserDetails();
    }, [])





    

    return (
       
            <>
            <div>
            <LampDemo username={data}/>
            </div>
            
            </>
        
    );
}
