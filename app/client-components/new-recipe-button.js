'use client'
import { useRouter } from 'next/navigation'

export default function NewRecipeButton(){
    const router = useRouter()

    return (
        <div>
            <button className='btn btn-neutral' onClick={() => router.refresh()}>Get New Recipe</button>
        </div>
    )
}