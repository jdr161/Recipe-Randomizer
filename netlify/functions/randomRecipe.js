const { Client } = require("pg")

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
        const formattedRecipe = recipe.rows[0]
        const recipeID = recipe.rows[0].ID
        
        const ingredients = await client.query('SELECT \"I\".\"Name\", \"IiR\".\"IngredientAmount\", \"IiR\".\"MeasurementType\" FROM ' + 
        '\"IngredientInRecipe\" AS \"IiR\" INNER JOIN \"Ingredients\" as \"I\" ' +
            'ON (\"IiR\".\"IngredientID\" = \"I\".\"ID\") ' +
        'WHERE \"IiR\".\"RecipeID\" = $1 ' + //REPLACE 1 with recipeID
        'ORDER BY \"IiR\".\"IngredientNumber\" ASC', [recipeID])
        const formattedIngredients = ingredients.rows

        const steps = await client.query('SELECT \"Steps\".\"Text\", \"Steps\".\"StepNumber\" ' +
            'FROM \"Steps\" ' +
            'WHERE \"Steps\".\"RecipeID\" = $1 ' +
            'ORDER BY \"Steps\".\"StepNumber\" ASC', [recipeID])
        formattedSteps = steps.rows

        await client.end()
        return {
            statusCode: 200,
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
            body: JSON.stringify({error}),
          };
    }
  };