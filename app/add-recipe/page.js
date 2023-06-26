'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
const axios = require('axios')

export default function Page() {
    //VARIABLES
    const [recipeName, setRecipeName] = useState("")
    const [mealType, setMealType] = useState("Pick One")
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

    //RESET FUNCTION
    const resetForm = () => {
        setRecipeName("")
        setMealType("Pick One")
        setIngredientFields([{ name: '', amount: '', measurementType: ''}])
        setStepFields([{ text: '' }])
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
            success: () => {
                resetForm()
                return 'Recipe added successfully'
            },
            error: (e) => {
                console.log(e)
                return e.response.data.message
            },
        })
    }

    return (
        <div className="container mx-auto">
            <Toaster />
            <p className='text-5xl text-center'>Add a New Recipe:</p>
            <div className='grid grid-cols-1'>
                <p className='text-2xl col-span-4'>Recipe Information:</p>
            </div>
            <form method="post" onSubmit={handleSubmit}>
                <div className="grid grid-cols-4 gap-4">
                    {/* RECIPE NAME */}
                    <div className="form-control w-full col-span-3">
                        <label className="label">
                            <span className="label-text">Recipe Name</span>
                        </label>
                        <input 
                        name='rname'
                        onChange={event => handleRecipeNameChange(event)}
                        value={recipeName}
                        type="text" 
                        placeholder="Type here" 
                        className="input input-bordered w-full" 
                        />
                        <label className="label">
                            <span className="label-text-alt" hidden>error text</span>
                        </label>
                    </div>
                    {/* MEAL TYPE */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Select meal type</span>
                        </label>
                        <select 
                        className="select select-bordered"
                        name='mealType'
                        placeholder='Meal Type...'
                        onChange={event => handleMealTypeChange(event)}
                        value={mealType}
                        >
                            <option disabled>Pick one</option>
                            <option>Breakfast</option>
                            <option>Lunch</option>
                            <option>Dinner</option>
                            <option>Desert</option>
                        </select>
                        <label className="label">
                            <span className="label-text-alt" hidden>error text</span>
                        </label>
                    </div>
                    <hr className='col-span-4'/>
                </div>
                <div className='grid grid-cols-1'>
                    <p className='text-2xl col-span-4'>Ingredients:</p>
                </div>
                {ingredientFields.map((ingredient, index) => {
                return (
                <div key={"ingredient-" + index} className='grid grid-cols-5 gap-4 items-center'>
                    {/* INGREDIENT NAME */}
                    <div className="form-control w-full col-span-2">
                        <label className="label">
                            <span className="label-text">Ingredient Name</span>
                        </label>
                        <input 
                        name='name'
                        placeholder='Name'
                        onChange={event => handleIngredientFieldChange(event, index)}
                        value={ingredient.name}
                        type="text" 
                        className="input input-bordered w-full" 
                        />
                        <label className="label">
                            <span className="label-text-alt" hidden>error text</span>
                        </label>
                    </div>
                    {/* INGREDIENT AMOUNT */}
                    <div className="form-control w-full col-span-1">
                        <label className="label">
                            <span className="label-text">Amount</span>
                        </label>
                        <input 
                        name='amount'
                        placeholder='Amount'
                        onChange={event => handleIngredientFieldChange(event, index)}
                        value={ingredient.amount}
                        type="text" 
                        className="input input-bordered w-full" 
                        />
                        <label className="label">
                            <span className="label-text-alt" hidden>error text</span>
                        </label>
                    </div>
                    {/* INGREDIENT MEASUREMENT TYPE */}
                    <div className="form-control w-full col-span-1">
                        <label className="label">
                            <span className="label-text">Measurement Type</span>
                        </label>
                        <input 
                        name='measurementType'
                        placeholder='Measurement Type'
                        onChange={event => handleIngredientFieldChange(event, index)}
                        value={ingredient.measurementType}
                        type="text" 
                        className="input input-bordered w-full" 
                        />
                        <label className="label">
                            <span className="label-text-alt" hidden>error text</span>
                        </label>
                    </div>
                    <div className='col-span-1'>
                        <button className='btn btn-sm' type="button" onClick={() => removeIngredientFields(index)}>Remove</button>
                    </div>
                </div>
                )
            })}
            <button className='btn btn-md' type="button" onClick={addIngredientFields}>Add More Ingredients..</button>
            <hr />
            <div className='grid grid-cols-1'>
                <p className='text-2xl col-span-4'>Steps:</p>
            </div>
            {stepFields.map((step, index) => {
                return (
                <div key={"step-" + index} className='grid grid-cols-5 gap-3 items-center'>
                    <div className="form-control w-full col-span-2">
                        <label className="label">
                            <span className="label-text">Step Text</span>
                        </label>
                        <input 
                        name='text'
                        placeholder='Step Text'
                        onChange={event => handleStepFieldChange(event, index)}
                        value={step.text}
                        type="text" 
                        className="input input-bordered w-full" 
                        />
                        <label className="label">
                            <span className="label-text-alt" hidden>error text</span>
                        </label>
                    </div>
                    <div className='col-span-1'>
                        <button className='btn btn-sm' type="button" onClick={() => removeStepFields(index)}>Remove</button>
                    </div>
                </div>
                )
            })}
            <button className='btn btn-md' type="button" onClick={addStepFields}>Add More Steps..</button>
            </form>
            <br />
            <button className='btn btn-success' type='submit' onClick={handleSubmit}>Submit</button>
            <button className='btn btn-info' type='button' onClick={resetForm}>reset</button>
        </div>
    );
}

