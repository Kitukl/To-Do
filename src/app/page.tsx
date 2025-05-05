'use client'

import { ListCard } from "@/components/ui/ListCard/ListCard";
import { Button } from "@mui/material";
import {AddListPopup} from "@/components/ui/Popups/AddListPopup/AddListPopup";
import {AddContributorPopup} from "@/components/ui/Popups/AddContributorPopup/AddContributorPopup";
import {useState} from "react";

const test = [
    {
        id: "1",
        title: "Test",
        description: "\n" +
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, dolor enim est odit pariatur quaerat quidem quo sequi sit vel. Aliquid culpa dolor mollitia sit? At corporis qui rerum suscipit.",
    },
    {
        id: "2",
        title: "TestTest",
        description: "\n" +
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, dolor enim est odit pariatur quaerat quidem quo sequi sit vel. Aliquid culpa dolor mollitia sit? At corporis qui rerum suscipit.",
    },
]

export default function Home() {

    const [isOpenAddListPopup, setIsOpenAddListPopup] = useState(false);
    const [isOpenAddContributorPopup, setIsOpenAddContributorPopup] = useState(false);

    return (
        <>
            <main className="px-24 py-12 flex flex-col items-center">
                <h2 className="text-6xl uppercase font-bold mb-10">
                    Списки завдань
                </h2>
                <ul className="flex flex-col gap-8">
                    {test.map(list => (
                        <ListCard
                            id={list.id}
                            key={list.id}
                            title={list.title}
                            description={list.description}
                        />
                    ))}
                </ul>
            </main>
            <div className='flex flex-col gap-2 w-[15vw]'>
                <Button
                    variant="contained"
                    className="absolute bottom-8 left-8 "
                    color="success"
                    onClick={() => setIsOpenAddListPopup(true)}
                >
                    Додати список
                </Button>
                <Button
                    variant="contained"
                    className="absolute bottom-8 left-8 "
                    onClick={() => setIsOpenAddContributorPopup(true)}
                >
                    Додати співучасника
                </Button>
            </div>
            <AddListPopup isOpen={isOpenAddListPopup} setIsOpen={setIsOpenAddListPopup}></AddListPopup>
            <AddContributorPopup isOpen={isOpenAddContributorPopup} setIsOpen={setIsOpenAddContributorPopup}></AddContributorPopup>
        </>
    );
}
