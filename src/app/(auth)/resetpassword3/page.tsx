"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import Link from 'next/link';


function ResetPasswordForm() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [token, setToken] = useState("");

    

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
        console.log(urlToken)
    }, [])

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            showErrorToast('Passwords do not match');
            return;
        }

        try {
            console.log("buraya geldi", password)
            const response = await axios.post('/api/users/resetpassword', {
                token,
                password
            });
            showToast(response.data.message)
            setSuccess(true);

        } catch (error: any) {
            showErrorToast('Failed to reset password');
            console.error(error.data);
        }
    };

    function showErrorToast(message: string): void {
        toast({
            variant: "destructive",
            title: "Error",
            description: message,
        })
    }

    function showToast(message: string): void {
        toast({
            variant: "default",
            title: "Password reset successfully!",
            description: message,
        })
    }

    if (success) {
        return(
            <div>
                <p>Password reset successfully! You can now log in with your new password.</p>
                <Link href="/login">Login</Link>
            </div>
        )
    }

    return (
        
            <div>
                <div>
                <label>New Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Confirm New Password:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            <button onClick={handleSubmit}>Reset Password</button>
            </div>
        
    );
}

export default ResetPasswordForm;
