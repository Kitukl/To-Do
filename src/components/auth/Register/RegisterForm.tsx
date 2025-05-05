"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/firebase/firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { Button } from "@mui/material";

export const RegisterForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });

            await setDoc(doc(db, "users", userCredential.user.uid), {
                name,
                email,
                role: "user",
                uid: userCredential.user.uid,
            });
        } catch (error: any) {
            console.error(error.message);
        }
    };

    return (
        <div className="flex flex-col gap-20 w-[40vw]">
            <h3 className="text-3xl font-bold text-center">Реєстрація</h3>
            <form className="flex flex-col gap-8" onSubmit={handleRegister}>
                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-4 bg-slate-950 border-b-2 border-slate-800 outline-none w-full focus:border-b-4"
                    />
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
                <Button type="submit" variant="contained">Register</Button>
            </form>
        </div>
    );
};
