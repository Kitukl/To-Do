import {Button} from "@mui/material";
import Link from 'next/link'

export const LoginForm = () => {
    return(
        <div className = 'flex flex-col gap-24'>
            <h3 className= 'text-3xl font-bold text-center'>
                Увійдіть
            </h3>
            <form className='flex flex-col gap-8'>
                <div className='flex flex-col gap-4'>
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
                <span className='flex flex-row gap-2'>
                    Не маєте акаунта?
                    <Link href='/register' className='text-sky-600'>Реєструйтесь!</Link>
                </span>
                <Button variant="contained">
                    Login
                </Button>
            </form>
        </div>
    )
}