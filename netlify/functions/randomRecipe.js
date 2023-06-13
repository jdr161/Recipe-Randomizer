const { Client } = require("pg")
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
        const recipe = await client.query('SELECT * FROM \"Recipes\" ORDER BY random() LIMIT 1')
        const recipeID = recipe.rows[0].ID
        const ingredients = await client.query('SELECT \"I\".\"Name\", \"IiR\".\"IngredientAmount\", \"IiR\".\"MeasurementType\" FROM ' + 
        '\"IngredientInRecipe\" AS \"IiR\" INNER JOIN \"Ingredients\" as \"I\" ' +
            'ON (\"IiR\".\"IngredientID\" = \"I\".\"ID\") ' +
        'WHERE \"IiR\".\"RecipeID\" = $1 ' + //REPLACE 1 with recipeID
        'ORDER BY \"IiR\".\"IngredientNumber\" ASC', [recipeID])
        const steps = await client.query('SELECT \"Steps\".\"Text\", \"Steps\".\"StepNumber\" ' +
            'FROM \"Steps\" ' +
            'WHERE \"Steps\".\"RecipeID\" = $1 ' +
            'ORDER BY \"Steps\".\"StepNumber\" ASC', [recipeID])
        await client.end()
        return {
            statusCode: 200,
            body: JSON.stringify({
                recipe: JSON.stringify(recipe),
                ingredientList: JSON.stringify(ingredients),
                stepList: JSON.stringify(steps),
            })
          }
    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            body: JSON.stringify({error}),
          };
    }
  };