import Link from 'next/link'

export default function Page() {
  return (
    <div className="container">
      <main>
        <p>
          Welcome to the homepage
        </p>
        <Link href="/recipe" prefetch={false}>
          <button>Get a randomized recipe</button>
        </Link>
        <Link href="/add-recipe">
          <button>Add a Recipe to the Database</button>
        </Link>
      </main>
    </div>
  )
}