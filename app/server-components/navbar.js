import Link from 'next/link'
import LoginButton from '../client-components/login-button'

export default function NavBar(){
    return (
        <div className="navbar bg-accent">
            <Link href='/' className='navbar-start'>
                <div className="btn btn-ghost normal-case text-xl">Home</div>
            </Link>
            <div className='navbar-center'>
                <div className=''>Recipe Randomizer</div>
            </div>
            <div className='navbar-end'>
                <Link href="/add-recipe">
                    <div className='btn btn-secondary'>Add a Recipe</div>
                </Link>
                <LoginButton /> 
            </div>
        </div>
    )
}