'use client'

import { useState } from "react";
import { Button, Checkbox } from "@mui/material";

type Task = {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    setIsActive: (isActive: boolean) => void;
};

export default function TaskPage() {
    const [isActive, setIsActive] = useState(true);

    const task: Task = {
        id: "1",
        name: "Test Task",
        description: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aperiam at consequatur culpa cum minima molestias necessitatibus omnis possimus repellat sed, similique soluta, voluptas! Debitis dolorem fugit nostrum rem rerum.",
        isActive,
        setIsActive,
    };

    return (
        <main className="flex flex-col items-center px-12 py-8 ">
            <h1 className="text-4xl font-bold mb-6">Завдання: {task.name}</h1>
            <div className="bg-slate-800 p-6 rounded-xl shadow-md w-full max-w-lg">
                <div className="mb-4">
                    <span className="text-xl font-semibold">Опис:</span>
                    <p className="text-md mt-2 text-gray-400">{task.description}</p>
                </div>
                <div className="mb-4">
                    <span className="text-xl font-semibold">Статус:</span>
                    <div className="flex items-center mt-2">
                        <Checkbox
                            checked={task.isActive}
                            onChange={() => task.setIsActive(!task.isActive)}
                            color="primary"
                        />
                        <span>{task.isActive ? "Активне" : "Неактивне"}</span>
                    </div>
                </div>
                <Button variant="contained" color="error" fullWidth>
                    Видалити завдання
                </Button>
            </div>
        </main>
    );
}
