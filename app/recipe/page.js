import Link from 'next/link'
import NewRecipeButton from '../../client-components/new-recipe-button.js';

async function getData() {
    let res = await fetch('http://localhost:8888/.netlify/functions/randomRecipe', { cache: 'no-store' })
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
    let data = await getData()
    let recipe = JSON.parse(data.recipe)
    let ingredients = JSON.parse(data.ingredients)
    let steps = JSON.parse(data.steps)
   
    return (
      <div className="container">
        <main>
            <h1>
                Randomized Recipe: #{recipe.ID} {recipe.Name} 
            </h1>
            <h3>
                Meal Type: {recipe.MealType} 
            </h3>
            <h4>
                Ingredients:
            </h4>
            <ul>
                {ingredients.map(ingredient => {
                    return (
                        <li>{ingredient.IngredientAmount} {ingredient.MeasurementType} {ingredient.Name}</li>
                    )
                })}
            </ul>
            <h4>
                Steps:
            </h4>
            <ul>
                {steps.map(step => {
                    return (
                        <li>{step.StepNumber} {step.Text}</li>
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