import Link from 'next/link'
import NewRecipeButton from '../../client-components/new-recipe-button.js';
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
    axios.get('https://radiant-basbousa-209352.netlify.app/.netlify/functions/randomRecipe')
    .then(function (response) {
        // handle success
        console.log(response);
        let data = response.json()
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
      <div className="container">
        <main>
            <h1>
                Randomized Recipe: #{recipe.id} {recipe.name} 
            </h1>
            <h3>
                Meal Type: {recipe.meal_type} 
            </h3>
            <h4>
                Ingredients:
            </h4>
            <ul>
                {ingredients.map(ingredient => {
                    return (
                        <li>{ingredient.ingredient_amount} {ingredient.measurement_type} {ingredient.name}</li>
                    )
                })}
            </ul>
            <h4>
                Steps:
            </h4>
            <ul>
                {steps.map(step => {
                    return (
                        <li>{step.step_number} {step.text}</li>
                    )
                })}
            </ul>
            <Link href="../">
                <button>return to homepage</button>
            </Link>
            <NewRecipeButton />
        </main>
      </div>
    )
  }