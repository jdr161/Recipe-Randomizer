import Link from 'next/link'

export default function Page() {
  return (
    <>
      <div className="hero min-h-[90vh]" style={{backgroundImage: 'url("https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/health/wp-content/uploads/2022/01/foods_to_eat_to_lose_weight.jpeg")'}}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome to the homepage</h1>
            <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <Link href="/recipe">
              <button className='btn btn-primary'>Get a randomized recipe</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}