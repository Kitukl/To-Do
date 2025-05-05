import { PopupTemplate } from "@/components/ui/Popups/PopupTemplate/PopupTemplate";
import { Button } from "@mui/material";
import { useState } from "react";

type AddContributorPopupProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    handleAddContributor: (userId: string, role: "admin" | "user") => void;
};

export const AddContributorPopup = ({
                                        isOpen,
                                        setIsOpen,
                                        handleAddContributor,
                                    }: AddContributorPopupProps) => {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim()) return;
        try {
            await handleAddContributor(email.trim(), "user");
        } catch (err) {
            console.error("Помилка додавання:", err);
        }
    };

    return (
        <PopupTemplate
            title="Додати співучасника"
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            position="center"
        >
            <div className="mx-10 sm:mx-14 md:mx-18 xl:mx-28 w-full">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <input
                        placeholder="Введіть пошту співучасника"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-4 bg-slate-950 border-b-2 border-slate-800 outline-none w-full focus:border-b-4"
                    />
                    <Button variant="contained" color="success" type="submit">
                        Додати співучасника
                    </Button>
                </form>
            </div>
        </PopupTemplate>
    );
};
