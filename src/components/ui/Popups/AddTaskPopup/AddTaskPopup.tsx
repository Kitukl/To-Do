import { useState } from "react";
import { Button } from "@mui/material";
import { PopupTemplate } from "@/components/ui/Popups/PopupTemplate/PopupTemplate";

type Task = {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    listId: string;
};

type AddTaskPopupProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    handleAddTask: (taskData: Omit<Task, "id">) => Promise<void>;
};

export const AddTaskPopup = ({ isOpen, setIsOpen, handleAddTask }: AddTaskPopupProps) => {
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!taskName || !taskDescription) {
            alert("Будь ласка, заповніть всі поля");
            return;
        }

        const taskData = {
            name: taskName,
            description: taskDescription,
            isActive: true,
        };

        try {
            await handleAddTask(taskData);
            setIsOpen(false);
        } catch (error) {
            console.error("Помилка при додаванні завдання", error);
            alert("Сталася помилка, спробуйте ще раз");
        }
    };

    return (
        <PopupTemplate
            title="Додати завдання"
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            position="center"
        >
            <div className="mx-10 sm:mx-14 md:mx-18 xl:mx-28 w-full">
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <input
                        placeholder="Введіть назву завдання"
                        type="text"
                        className="p-4 bg-slate-950 border-b-2 border-slate-800 outline-none w-full focus:border-b-4"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                    <textarea
                        placeholder="Введіть опис завдання"
                        className="p-4 bg-slate-950 border-b-2 border-slate-800 outline-none w-full focus:border-b-4 h-32 resize-none"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="success">
                        Створити завдання
                    </Button>
                </form>
            </div>
        </PopupTemplate>
    );
};
