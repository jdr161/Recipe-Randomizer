'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
const axios = require('axios')

export default function Page() {
    //VARIABLES
    const router = useRouter()
    const [recipeName, setRecipeName] = useState("")
    const [mealType, setMealType] = useState("")
    const [ingredientFields, setIngredientFields] = useState([
        { name: '', amount: '', measurementType: ''},
    ])
    const [stepFields, setStepFields] = useState([
        { text: '' },
    ])

    //INPUT VALUE CHANGE HANDLERS
    const handleRecipeNameChange = (event) => {
        setRecipeName(event.target.value);
    }
    const handleMealTypeChange = (event) => {
        setMealType(event.target.value);
    }
    const handleIngredientFieldChange = (event, index) => {
        let data = [...ingredientFields];
        data[index][event.target.name] = event.target.value;
        setIngredientFields(data);
    }
    const handleStepFieldChange = (event, index) => {
        let data = [...stepFields];
        data[index][event.target.name] = event.target.value;
        setStepFields(data);
    }
    
    //ADD INPUT BOX HANDLERS
    const addIngredientFields = () => {
        let object = { 
            name: '', 
            amount: '', 
            measurementType: ''
        }

        setIngredientFields([...ingredientFields, object])
    }
    const addStepFields = () => {
        let object = {
            text: ''
        }

        setStepFields([...stepFields, object])
    }

    //REMOVE INPUT BOX HANDLERS
    const removeIngredientFields = (index) => {
        let data = [...ingredientFields];
        data.splice(index, 1)
        setIngredientFields(data)
    }
    const removeStepFields = (index) => {
        let data = [...stepFields];
        data.splice(index, 1)
        setStepFields(data)
    }

    //SUBMISSION RELATED FUNCTIONS
    async function doPost() {
        //return await axios.post('https://radiant-basbousa-209352.netlify.app/.netlify/functions/addRecipe', {
        return await axios.post('http://localhost:8888/.netlify/functions/addRecipe', {
            recipeName: recipeName,
            mealType: mealType,
            ingredients: JSON.stringify(ingredientFields),
            steps: JSON.stringify(stepFields)
            })
            .then(function (response) {
                
            })

    }

    async function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        const promise = doPost()

        toast.promise(promise, {
            loading: 'Loading...',
            success: 'Recipe added successfully',
            error: (e) => {
                console.log(e)
                return e.response.data.message
            },
        })
    }

    return (
        <div className="container">
            <Toaster />
            <form method="post" onSubmit={handleSubmit}>
                <h1>Recipe Information:</h1>
                <label>
                    Recipe Name-
                    <input
                    name='rname'
                    placeholder='Recipe Name...'
                    onChange={event => handleRecipeNameChange(event)}
                    value={recipeName}
                    />
                </label>
                <label>
                    Meal Type-
                    <input
                    name='mealType'
                    placeholder='Meal Type...'
                    onChange={event => handleMealTypeChange(event)}
                    value={mealType}
                    />
                </label>
                <hr />
                <h1>
                    Ingredients:
                </h1>
            {ingredientFields.map((ingredient, index) => {
                return (
                <div key={"ingredient-" + index}>
                    <label>
                        Name-
                        <input
                        name='name'
                        placeholder='Name'
                        onChange={event => handleIngredientFieldChange(event, index)}
                        value={ingredient.name}
                        />
                    </label>
                    <label>
                        Amount-
                        <input
                        name='amount'
                        placeholder='Amount'
                        onChange={event => handleIngredientFieldChange(event, index)}
                        value={ingredient.amount}
                        />
                    </label>
                    <label>
                        Measurement Type-
                        <input
                        name='measurementType'
                        placeholder='Measurement Type'
                        onChange={event => handleIngredientFieldChange(event, index)}
                        value={ingredient.measurementType}
                        />
                    </label>
                    <button type="button" onClick={() => removeIngredientFields(index)}>Remove</button>
                </div>
                )
            })}
            <button type="button" onClick={addIngredientFields}>Add More Ingredients..</button>
            <hr />
            <h1>
                Steps:
            </h1>
            {stepFields.map((step, index) => {
                return (
                <div key={"step-" + index}>
                    <label>
                        Text-
                        <input
                        name='text'
                        placeholder='Step Text'
                        onChange={event => handleStepFieldChange(event, index)}
                        value={step.text}
                        />
                    </label>
                    <button type="button" onClick={() => removeStepFields(index)}>Remove</button>
                </div>
                )
            })}
            <button type="button" onClick={addStepFields}>Add More Steps..</button>
            </form>
            <br />
            <button type='submit' onClick={handleSubmit}>Submit</button>
            <button onClick={() => router.push("../")}>return to homepage</button>
        </div>
    );
}

