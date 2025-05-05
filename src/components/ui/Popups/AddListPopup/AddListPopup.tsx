'use client'

import { PopupTemplate } from "@/components/ui/Popups/PopupTemplate/PopupTemplate";
import { Button } from "@mui/material";
import { useContext, useState } from "react";
import {UserContext} from "@/context/UserProvider";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebase-config";

type AddListPopupProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

export const AddListPopup = ({ isOpen, setIsOpen }: AddListPopupProps) => {
    const {user}  = useContext(UserContext)!;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) return alert("Користувач не авторизований");

        try {
            await addDoc(collection(db, "toDoLists"), {
                title,
                description,
                ownerId: user.id,
                participants: [],
                createdAt: serverTimestamp(),
            });

            setTitle('');
            setDescription('');
            setIsOpen(false);
        } catch (error) {
            console.error("Помилка при створенні списку:", error);
        }
    };

    return (
        <PopupTemplate
            title="Додати список"
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            position="center"
        >
            <div className="mx-10 sm:mx-14 md:mx-18 xl:mx-28 w-full">
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <input
                        placeholder="Введіть назву списку"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="p-4 bg-slate-950 border-b-2 border-slate-800 outline-none w-full focus:border-b-4"
                    />
                    <textarea
                        placeholder="Введіть опис списку"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="p-4 bg-slate-950 border-b-2 border-slate-800 outline-none w-full focus:border-b-4 h-32 resize-none"
                    />
                    <Button type="submit" variant="contained" color="success">
                        Створити список
                    </Button>
                </form>
            </div>
        </PopupTemplate>
    );
};
