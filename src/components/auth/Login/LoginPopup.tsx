import { useEffect } from "react";
import { usePathname } from "next/navigation";

import {LoginForm} from "@/components/auth/Login/LoginForm";
import {PopupTemplate} from "@/components/ui/Popups/PopupTemplate/PopupTemplate";

export type TLoginPopup = {
    state: boolean
    setState: (isOpen: boolean) => void
}
export const LoginPopup = ({ state, setState }: TLoginPopup) => {
    const pathname = usePathname();

    useEffect(() => {
        setState(false);
    }, [pathname]);

    return (
        <PopupTemplate
            title='увійти'
            setIsOpen={setState}
            isOpen={state}
            position='right'
        >
            <div className='mx-10 sm:mx-14 md:mx-18 xl:mx-28 w-full'>
                <div className='mb-12'>
                    <LoginForm/>
                </div>
            </div>
        </PopupTemplate>
    )
}