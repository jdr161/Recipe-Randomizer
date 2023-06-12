import { Client } from 'pg'
const client = new Client()

exports.handler = async function (event, context) {
    try {
        const client = new Client({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT
        })
 
        await client.connect()
        const res = await client.query('SELECT * FROM Recipes')
        await client.end()
        console.log(res)
        return {
            statusCode: 200,
            body: res,
          };
    } catch (error) {
        console.log(error)
    }
  };