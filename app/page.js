async function getData(){
    const res = await fetch('http://localhost:8888/.netlify/functions/randomRecipe')
    return res.json
}

export default async function Page(){
    const data = getData()
    return (
        <div className="container">
          <Head>
            <title>Next.js Starter!</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
    
          <main>
            <Header title="Test" />
            <p className="description">
              Get started by editing <code>pages/index.js</code>
            </p>
            <p>
                data: {data}
            </p>
          </main>
    
          <Footer />
        </div>
    )
}