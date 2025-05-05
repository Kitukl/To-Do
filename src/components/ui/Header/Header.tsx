'use client'

import {useContext, useState} from "react";
import {UserContext} from "@/context/UserProvider";
import {Button} from "@mui/material";

import {LoginPopup} from "@/components/auth/Login/LoginPopup";
import {useRouter} from "next/navigation";

export const Header = () => {

    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const user = useContext(UserContext);
        if (!user) {
            return (
                <div>
                    <header className='flex flex-row justify-between px-24 py-12'>
                        <h3 className='text-3xl font-bold cursor-pointer' onClick={() => router.push('/')}>To-Do App</h3>
                        <Button variant="outlined" onClick={() => setIsOpen(true)}>Увійти</Button>
                    </header>
                    <LoginPopup state={isOpen} setState={setIsOpen}/>
                </div>
            )
        } else {
            return (
                <div>
                    <header className='flex flex-row justify-between px-24 py-12'>
                        <h3 className = 'text-3xl bold'>To-Do App</h3>
                    </header>
                </div>
            )
        }
}