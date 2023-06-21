const { Client } = require("pg")
const format = require('pg-format');

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
  };

exports.handler = async function (event, context) {
    try {
        const client = new Client({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT
        })
        let data = JSON.parse(event.body)
        let recipeName = data.recipeName
        let mealType = data.mealType
        let ingredientsArr = JSON.parse(data.ingredients)
        let stepsArr = JSON.parse(data.steps)

        try {
            client.connect()
            await client.query('BEGIN')

            // add the recipe to the recipe database
            let recipeSQL = format('insert into recipes (name, meal_type) values (%L, %L) returning id', recipeName, mealType)
            let res = await client.query(recipeSQL)
            let newRecipeID = res.rows[0].id

            // add the ingredients to the ingredients database
            let ingredientsValues = ingredientsArr.map((object) => Object.values(object).splice(0, 1))
            let ingredientsSQL = format('WITH ' +
                    'val (name) AS ' +
                        '( VALUES %L' + //rows to be inserted
                        '), ' +
                    'ins AS ' +
                        '( INSERT INTO ' +
                            'ingredients (name) ' +
                        'SELECT name FROM val ' +
                        'ON CONFLICT (name) DO NOTHING ' +
                        'RETURNING id, name ' + //only the inserted ones
                        ') ' +
                'SELECT COALESCE(ins.id, ingredients.id) AS id, ' +
                        'val.name ' +
                'FROM val ' +
                    'LEFT JOIN ins ON ins.name = val.name ' +
                    'LEFT JOIN ingredients ON ingredients.name = val.name ;', ingredientsValues)
            res = await client.query(ingredientsSQL)

            //PROBLEM HERE AT MAP
            //add the relevant ingredients to the ingredients_in_recipe table
            let ingredientsInRecipeValues = res.rows.map((row) => {
                let ingredientName = row.name
                let ingredient = ingredientsArr.find(item=>item.name==ingredientName) //name, amount, measurementType
                let index = ingredientsArr.indexOf(ingredient)
                let val = Object.values(ingredient)
                val.splice(0,1) //remove name from array
                val.unshift(index)
                val.unshift(row.id)
                val.unshift(newRecipeID)
                return val
            })
            let iirSQL = format('insert into ingredient_in_recipe (recipe_id, ingredient_id, ingredient_number, ingredient_amount, measurement_type) values %L', ingredientsInRecipeValues)
            await client.query(iirSQL)

            //add the steps
            let stepsValues = stepsArr.map((object, index) => {
                let val = Object.values(object)
                val.unshift(newRecipeID)
                val.push(index + 1)
                return val
            })            
            let stepsSQL = format('insert into steps (recipe_id, text, step_number) values %L', stepsValues)
            await client.query(stepsSQL)
            await client.query('COMMIT')
        } catch (e) {
            await client.query('ROLLBACK')
            throw e
        } finally {
            await client.end()
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({message: "Recipe added Successfully!"})
          }
    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: error,
                message: error.message
            })
        };
    }
};