'use client'
import { useRouter } from 'next/navigation'

export default function NewRecipeButton(){
    const router = useRouter()

    return (
        <div>
            <button onClick={() => router.refresh()}>Get New Recipe</button>
        </div>
    )
}