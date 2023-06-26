import NewRecipeButton from '../client-components/new-recipe-button.js';
import RecipeDisplay from '../client-components/recipe-display.js';
const axios = require('axios')

var recipe = {
    id: 'loading',
    name: 'loading',
    meal_type: 'loading',
}
var ingredients = [{
    name: 'loading',
    ingredient_amount: 'loading',
    measurement_type: 'loading'
}]
var steps = [{
    text: 'loading',
    step_number: 'loading',
}]


async function getData() {
    axios.get('http://localhost:8888/.netlify/functions/randomRecipe')
    .then(function (response) {
        // handle success
        let data = response.data
        recipe = JSON.parse(data.recipe)
        ingredients = JSON.parse(data.ingredients)
        steps = JSON.parse(data.steps)
        return 
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });
  }
   
export default async function Page() {
    getData()
   
    return (
        <>
        <p></p>
        <h1>
            Randomized Recipe: #{recipe.id} {recipe.name} 
        </h1>
        <h3>
            Meal Type: {recipe.meal_type} 
        </h3>
        <RecipeDisplay 
            ingredients={ingredients}
            steps={steps}
            />
        <NewRecipeButton />
        </>
    )
  }