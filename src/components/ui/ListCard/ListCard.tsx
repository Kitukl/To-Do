import {useRouter} from "next/navigation";

type ListCard = {
    id: string;
    title: string;
    description: string;
}
export const ListCard = ({id, title, description} : ListCard) => {

    const router = useRouter()

    return (
        <section className='w-[45vw] border-2 border-sky-200 p-6 rounded-xl bg-slate-900 hover:bg-slate-800 duration-200' onClick={() => router.push(`/${id}`)}>
            <h3 className='text-3xl font-semibold mb-4'>{title}</h3>
            <p className='text-xl text-ellipsis overflow-hidden line-clamp-1'>{description}</p>
        </section>
    )
}