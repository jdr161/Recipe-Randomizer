async function getData() {
  const res = await fetch('http://localhost:8888/.netlify/functions/randomRecipe', { cache: 'no-store' })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
 
export default async function Page() {
  const data = await getData()
 
  return (
    <div className="container">
      <main>
        <p className="description">
        {JSON.stringify(data)}
        </p>
        
      </main>
    </div>
  )
}