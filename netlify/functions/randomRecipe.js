const { Client } = require("pg")
const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
};

exports.handler = async function (event, context) {
    if (event.httpMethod === 'OPTIONS') {
        return {
          statusCode: 200,
          headers: CORS_HEADERS,
        }
    }
    try {
        const client = new Client({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT
        })
 
        await client.connect()
        const recipe = await client.query('SELECT * FROM recipes ORDER BY random() LIMIT 1')
        const formattedRecipe = recipe.rows[0]
        const recipeID = recipe.rows[0].id
        
        const ingredients = await client.query('SELECT i.name, iir.ingredient_amount, iir.measurement_type FROM ' + 
        'ingredient_in_recipe AS iir INNER JOIN ingredients as i ' +
            'ON (iir.ingredient_id = i.id) ' +
        'WHERE iir.recipe_id = $1 ' +
        'ORDER BY iir.ingredient_number ASC', [recipeID])
        const formattedIngredients = ingredients.rows

        const steps = await client.query('SELECT steps.text, steps.step_number ' +
            'FROM steps ' +
            'WHERE steps.recipe_id = $1 ' +
            'ORDER BY steps.step_number ASC', [recipeID])
        const formattedSteps = steps.rows

        await client.end()
        return {
            statusCode: 200,
            headers: {
                ...CORS_HEADERS
            },
            body: JSON.stringify({
                recipe: JSON.stringify(formattedRecipe),
                ingredients: JSON.stringify(formattedIngredients),
                steps: JSON.stringify(formattedSteps),
            })
          }
    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            headers: {
                ...CORS_HEADERS
            },
            body: JSON.stringify({error}),
          };
    }
  };