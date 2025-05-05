'use client';

import { useState } from "react";
import { TaskCard } from "@/components/ui/TaskCard/TaskCard";
import { Button } from "@mui/material";
import {AddTaskPopup} from "@/components/ui/Popups/AddTaskPopup/AddTaskPopup";

type Task = {
    listId: string;
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    setState: (state: boolean) => void;
};

export default function ListPage() {
    const [tasks, setTasks] = useState<Task[]>([
        {
            listId: "1",
            id: "1",
            name: "task1",
            description: "Task 1",
            isActive: true,
            setState: () => {},
        },
        {
            listId: "1",
            id: "2",
            name: "task2",
            description:
                " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci asperiores assumenda, consectetur deleniti dolorem eius esse et hic labore libero molestias nesciunt, nulla perferendis rerum sed sequi sit soluta vitae?",
            isActive: false,
            setState: () => {},
        },
    ]);

    const handleTaskStateChange = (id: string, isActive: boolean) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, isActive } : task
            )
        );
    };

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <main className="flex flex-col px-24 py-12 items-center">
                <div className="flex flex-col">
                    <h2 className="text-6xl uppercase text-center font-bold mb-10">test</h2>
                    <p className="w-[40vw] text-xl">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, animi
                        ducimus eligendi magnam minus mollitia numquam omnis qui quos
                        repellendus ullam ut veritatis? Commodi consectetur ea impedit libero
                        praesentium velit!
                    </p>
                </div>
                <ul className="mt-12 space-y-6">
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            listId={task.listId}
                            id={task.id}
                            name={task.name}
                            description={task.description}
                            isActive={task.isActive}
                            setActive={(isActive) => handleTaskStateChange(task.id, isActive)}
                        />
                    ))}
                </ul>
            </main>
            <Button
                variant="contained"
                className="absolute bottom-8 left-8"
                color="success"
                onClick = {() => setIsOpen(true)}
            >
                Додати завдання
            </Button>
            <AddTaskPopup isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    );
}
