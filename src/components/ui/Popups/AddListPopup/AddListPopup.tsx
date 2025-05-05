import { PopupTemplate } from "@/components/ui/Popups/PopupTemplate/PopupTemplate";
import { Button } from "@mui/material";

type AddListPopupProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

export const AddListPopup = ({ isOpen, setIsOpen }: AddListPopupProps) => {
    return (
        <PopupTemplate
            title="Додати список"
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            position="center"
        >
            <div className="mx-10 sm:mx-14 md:mx-18 xl:mx-28 w-full">
                <form className="flex flex-col gap-6">
                    <input
                        placeholder="Введіть назву списку"
                        type="text"
                        className="p-4 bg-slate-950 border-b-2 border-slate-800 outline-none w-full focus:border-b-4"
                    />
                    <textarea
                        placeholder="Введіть опис списку"
                        className="p-4 bg-slate-950 border-b-2 border-slate-800 outline-none w-full focus:border-b-4 h-32 resize-none"
                    />
                    <Button variant="contained" color="success">
                        Створити список
                    </Button>
                </form>
            </div>
        </PopupTemplate>
    );
};
