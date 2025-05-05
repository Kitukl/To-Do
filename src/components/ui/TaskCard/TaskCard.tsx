import { Button, Checkbox } from "@mui/material";
import {useRouter} from "next/navigation";

type TaskCardProps = {
    listId: string;
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    setActive: (active: boolean) => void;
};

export const TaskCard = ({listId ,id, name, description, isActive, setActive }: TaskCardProps) => {

    const router = useRouter();

    return (
        <section className="flex flex-row justify-between bg-slate-900 hover:bg-slate-800 border-2 rounded-xl p-6 border-white py-4 cursor-pointer w-[45vw]" onClick={() => router.push(`${listId}/tasks/${id}`)}>
            <div className='flex flex-col'>
                <span className="text-2xl font-semibold">{name}</span>
                <p className='text-md overflow-hidden text-ellipsis line-clamp-1'>
                    {description}
                </p>
            </div>
            <div className="flex flex-row gap-4">
                <label className="flex items-center gap-2">
                    <span>{isActive ? "Активне" : "Неактивне"}</span>
                    <Checkbox
                        checked={isActive}
                        onChange={() => setActive(!isActive)}
                    />
                </label>
                <Button variant="outlined" color="error">
                    Видалити
                </Button>
            </div>
        </section>
    );
};
