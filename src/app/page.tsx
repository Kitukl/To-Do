'use client'

import { ListCard } from "@/components/ui/ListCard/ListCard";
import { Button } from "@mui/material";
import {AddListPopup} from "@/components/ui/Popups/AddListPopup/AddListPopup";
import {AddContributorPopup} from "@/components/ui/Popups/AddContributorPopup/AddContributorPopup";
import { useContext, useEffect, useState } from "react";
import { collection, query, where, getDocs, or,  } from "firebase/firestore";
import { db } from "@/firebase/firebase-config";
import {UserContext} from "@/context/UserProvider";

export default function Home() {
    const { user } = useContext(UserContext)!;
    const [isOpenAddListPopup, setIsOpenAddListPopup] = useState(false);
    const [lists, setLists] = useState<any[]>([]);

    useEffect(() => {
        if (!user) return;

        const fetchLists = async () => {
            try {
                const q = query(
                    collection(db, "toDoLists"),
                    or(
                        where("ownerId", "==", user.id),
                        where("participants", "array-contains", user.email)
                    )
                );

                const querySnapshot = await getDocs(q);
                const userLists = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setLists(userLists);
            } catch (err) {
                console.error("Помилка при отриманні списків:", err);
            }
        };

        fetchLists();
    }, [user]);

    return (
        <>
            <main className="px-24 py-12 flex flex-col items-center">
                <h2 className="text-6xl uppercase font-bold mb-10">
                    Списки завдань
                </h2>
                <ul className="flex flex-col gap-8">
                    {lists.map(list => (
                        <ListCard
                            key={list.id}
                            id={list.id}
                            title={list.title}
                            description={list.description}
                        />
                    ))}
                </ul>
            </main>
            <div className='flex flex-col gap-2 w-[15vw]'>
                <Button
                    variant="contained"
                    className="absolute bottom-8 left-8"
                    color="success"
                    onClick={() => setIsOpenAddListPopup(true)}
                >
                    Додати список
                </Button>
            </div>
            <AddListPopup isOpen={isOpenAddListPopup} setIsOpen={setIsOpenAddListPopup} />
        </>
    );
}

