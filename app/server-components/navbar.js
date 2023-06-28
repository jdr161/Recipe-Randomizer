import Link from 'next/link'
import LoginButton from '../client-components/login-button'

export default function NavBar(){
    return (
        <div className="navbar bg-accent">
            <Link href='/' className='navbar-start'>
                <div className="btn btn-ghost normal-case text-xl">Home</div>
            </Link>
            <Link href='/recipe' className='navbar-center'>
                <div className='text-xl font-bold'>Recipe Randomizer</div>
            </Link>
            <div className='navbar-end'>
                <Link href="/add-recipe">
                    <div className='btn btn-secondary'>Add a Recipe</div>
                </Link>
                <LoginButton /> 
            </div>
        </div>
    )
}