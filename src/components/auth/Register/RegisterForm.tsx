import {Button} from "@mui/material";
import Link from 'next/link'

export const RegisterForm = () => {
    return(
        <div className = 'flex flex-col gap-20 w-[40vw]'>
            <h3 className= 'text-3xl font-bold text-center'>
                Реєстрація
            </h3>
            <form className='flex flex-col gap-8'>
                <div className='flex flex-col gap-4'>
                    <input
                        type="text"
                        placeholder="Your name"
                        className='p-4 bg-slate-950 border-b-2 border-slate-800 outline-none w-full focus:border-b-4'
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className='p-4 bg-slate-950 border-b-2 border-slate-800 outline-none w-full focus:border-b-4'
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className='p-4 bg-slate-950 border-b-2 border-slate-800 outline-none w-full focus:border-b-4'
                    />
                </div>
                <Button variant="contained">
                    Register
                </Button>
            </form>
        </div>
    )
}