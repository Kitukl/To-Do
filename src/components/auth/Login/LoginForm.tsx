"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase-config";
import { Button } from "@mui/material";
import Link from "next/link";

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            console.log(error.message);
        }
    };

    return (
        <div className="flex flex-col gap-24">
            <h3 className="text-3xl font-bold text-center">Увійдіть</h3>
            <form className="flex flex-col gap-8" onSubmit={handleLogin}>
                <div className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-4 bg-slate-950 border-b-2 border-slate-800 outline-none w-full focus:border-b-4"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-4 bg-slate-950 border-b-2 border-slate-800 outline-none w-full focus:border-b-4"
                    />
                </div>
                <span className="flex flex-row gap-2">
                    Не маєте акаунта?
                    <Link href="/register" className="text-sky-600">Реєструйтесь!</Link>
                </span>
                <Button type="submit" variant="contained">Login</Button>
            </form>
        </div>
    );
};
