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

const fetchData = async () => {
    let url = '';
    if(process.env.NODE_ENV=='development'){
        url = 'http://localhost:8888/.netlify/functions/randomRecipe';
    } else {
        url = 'https://radiant-basbousa-209352.netlify.app/.netlify/functions/randomRecipe';
    }
    const res  = await fetch(url, {cache: 'no-store'});

    if(!res.ok){
        throw new Error('could not fetch data');
    }
    return res.json();
};

async function getData() {
    let url = ''
    if(process.env.NODE_ENV=='development'){
        url = 'http://localhost:8888/.netlify/functions/randomRecipe'
    } else {
        url = 'https://radiant-basbousa-209352.netlify.app/.netlify/functions/randomRecipe'
    }
    axios.get(url)
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
    //getData()
    const data = await fetchData();
    const recipe = JSON.parse(data.recipe);
    const ingredients = JSON.parse(data.ingredients);
    const steps = JSON.parse(data.steps)
   
    return (
        <>
        <div className='container mx-auto'>
            <div className='columns-2'>
                <p className='text-5xl'>#{recipe.id}: {recipe.name}</p>
                <div className='justify-end'>
                    <NewRecipeButton />
                </div>
            </div>
            <div className='columns-2'>
                <p className='text-2xl'>{recipe.meal_type} </p>
            </div>
        </div>
        <RecipeDisplay 
            ingredients={ingredients}
            steps={steps}
            />
        </>
    )
  }