'use client';

import { useEffect, useState } from "react";
import { TaskCard } from "@/components/ui/TaskCard/TaskCard";
import { Button } from "@mui/material";
import { AddTaskPopup } from "@/components/ui/Popups/AddTaskPopup/AddTaskPopup";
import { db } from "@/firebase/firebase-config";
import { collection, query, where, getDocs, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import { auth } from "@/firebase/firebase-config";
import {AddContributorPopup} from "@/components/ui/Popups/AddContributorPopup/AddContributorPopup";  // Імпортуємо auth для перевірки користувача

type Task = {
    listId: string;
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    setState: (state: boolean) => void;
};

type List = {
    id: string;
    title: string;
    description: string;
};

type Contributor = {
    userId: string;
    role: "admin" | "user";  // Роль співучасника: admin або user
};

export default function ListPage() {
    const { listId } = useParams();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [list, setList] = useState<List | null>(null);
    const [contributors, setContributors] = useState<Contributor[]>([]); // Список співучасників
    const [isOpenAddTaskPopup, setIsOpenAddTaskPopup] = useState(false);
    const [isOpenAddContributorPopup, setIsOpenAddContributorPopup] = useState(false);
    const [userRole, setUserRole] = useState<"admin" | "user" | null>(null);

    useEffect(() => {
        const fetchTasksAndList = async () => {
            if (!listId) return;

            try {
                const tasksQuery = query(
                    collection(db, "tasks"),
                    where("listId", "==", listId)
                );
                const querySnapshot = await getDocs(tasksQuery);
                const tasksFromDb = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Task[];
                setTasks(tasksFromDb);

                const listDocRef = doc(db, "toDoLists", listId as string);
                const listDocSnapshot = await getDoc(listDocRef);
                if (listDocSnapshot.exists()) {
                    setList({
                        id: listDocSnapshot.id,
                        title: listDocSnapshot.data().title,
                        description: listDocSnapshot.data().description,
                    });
                } else {
                    console.error("Список не знайдений");
                }

                // Отримуємо співучасників списку
                const contributorsQuery = query(
                    collection(db, "contributors"),
                    where("listId", "==", listId)
                );
                const contributorsSnapshot = await getDocs(contributorsQuery);
                const contributorsFromDb = contributorsSnapshot.docs.map((doc) => ({
                    userId: doc.data().userId,
                    role: doc.data().role,
                })) as Contributor[];
                setContributors(contributorsFromDb);

                // Перевіряємо роль поточного користувача
                const currentUser = auth.currentUser;
                if (currentUser) {
                    const currentUserContributor = contributorsFromDb.find(
                        (contributor) => contributor.userId === currentUser.uid
                    );
                    if (currentUserContributor) {
                        setUserRole(currentUserContributor.role);
                    }
                }
            } catch (error) {
                console.error("Помилка при отриманні завдань або списку", error);
            }
        };

        fetchTasksAndList();
    }, [listId]);

    const handleTaskStateChange = async (taskId: string, isActive: boolean) => {
        if (userRole !== "admin") {
            console.error("Немає доступу для редагування завдань");
            return;
        }

        try {
            const taskRef = doc(db, "tasks", taskId);
            await updateDoc(taskRef, { isActive });
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskId ? { ...task, isActive } : task
                )
            );
        } catch (error) {
            console.error("Помилка при оновленні статусу завдання", error);
        }
    };

    const handleAddTask = async (taskData: Omit<Task, 'id'>) => {
        if (userRole !== "admin") {
            console.error("Немає доступу для додавання завдань");
            return;
        }

        try {
            const docRef = await addDoc(collection(db, "tasks"), {
                ...taskData,
                listId,
                isActive: true,
            });
            setTasks((prevTasks) => [...prevTasks, { id: docRef.id, ...taskData }]);
            setIsOpenAddTaskPopup(false);
        } catch (error) {
            console.error("Помилка при додаванні завдання", error);
        }
    };

    const handleAddContributor = async (userId: string, role: "admin" | "user") => {
        try {
            await addDoc(collection(db, "contributors"), {
                listId,
                userId,
                role,
            });
            setContributors((prev) => [...prev, { userId, role }]);
            setIsOpenAddContributorPopup(false);
        } catch (error) {
            console.error("Помилка при додаванні співучасника", error);
        }
    };

    return (
        <>
            <main className="flex flex-col px-24 py-12 items-center">
                <div className="flex flex-col">
                    {list && (
                        <>
                            <h2 className="text-6xl uppercase text-center font-bold mb-10">{list.title}</h2>
                            <p className="w-[40vw] text-xl">{list.description}</p>
                        </>
                    )}
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
            <div className='flex flex-col gap-4 w-[15vw]'>
                <Button
                    variant="contained"
                    className="absolute bottom-8 left-8"
                    color="success"
                    onClick={() => setIsOpenAddTaskPopup(true)}
                >
                    Додати завдання
                </Button>
                <Button
                    variant="contained"
                    className="absolute bottom-8 left-8"
                    color='secondary'
                    onClick={() => setIsOpenAddContributorPopup(true)}
                >
                    Додати співучасника
                </Button>
            </div>
            <AddTaskPopup isOpen={isOpenAddTaskPopup} setIsOpen={setIsOpenAddTaskPopup} handleAddTask={handleAddTask} />
            <AddContributorPopup isOpen={isOpenAddContributorPopup}></AddContributorPopup>
        </>
    );
}
