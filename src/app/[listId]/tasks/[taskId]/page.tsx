'use client';

import { useEffect, useState } from "react";
import { Button, Checkbox } from "@mui/material";
import { db } from "@/firebase/firebase-config";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useParams } from "next/navigation";

type Task = {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
};

export default function TaskPage() {
    const { taskId } = useParams();
    const [task, setTask] = useState<Task | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTask = async () => {
            if (!taskId) return;

            try {
                const taskDocRef = doc(db, "tasks", taskId);
                const taskDocSnapshot = await getDoc(taskDocRef);

                if (taskDocSnapshot.exists()) {
                    setTask({
                        id: taskDocSnapshot.id,
                        ...taskDocSnapshot.data(),
                    } as Task);
                } else {
                    console.error("Завдання не знайдено");
                }
            } catch (error) {
                console.error("Помилка при отриманні завдання", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTask();
    }, [taskId]);

    const handleTaskStateChange = async (isActive: boolean) => {
        if (task) {
            try {
                const taskRef = doc(db, "tasks", task.id);
                await updateDoc(taskRef, { isActive });
                setTask((prevTask) => (prevTask ? { ...prevTask, isActive } : null));
            } catch (error) {
                console.error("Помилка при оновленні статусу завдання", error);
            }
        }
    };

    const handleDeleteTask = async () => {
        if (task) {
            try {
                const taskRef = doc(db, "tasks", task.id);
                await deleteDoc(taskRef);
                window.location.href = "/";
            } catch (error) {
                console.error("Помилка при видаленні завдання", error);
            }
        }
    };

    if (isLoading) return <div>Завантаження...</div>;

    return (
        <main className="flex flex-col items-center px-12 py-8 ">
            {task && (
                <>
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
                                    onChange={() => handleTaskStateChange(!task.isActive)}
                                    color="primary"
                                />
                                <span>{task.isActive ? "Активне" : "Неактивне"}</span>
                            </div>
                        </div>
                        <Button
                            variant="contained"
                            color="error"
                            fullWidth
                            onClick={handleDeleteTask}
                        >
                            Видалити завдання
                        </Button>
                    </div>
                </>
            )}
        </main>
    );
}
