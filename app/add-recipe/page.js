'use client'

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
const axios = require('axios')

export default function Page() {
    //VARIABLES
    const [recipeName, setRecipeName] = useState({value: '', inputState: ''})
    const [mealType, setMealType] = useState({value: 'Breakfast', inputState: ''})
    const [ingredientFields, setIngredientFields] = useState([
        { name: '', 
        nameInputState: '', 
        amount: '', 
        amountInputState: '',
        amountErrorText: 'not set', 
        measurementType: '', 
        measurementTypeInputState: ''},
    ])
    const [stepFields, setStepFields] = useState([{ 
        text: '', 
        textInputState: '' },
    ])
    const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Desert']

    //INPUT VALUE CHANGE HANDLERS
    const handleRecipeNameChange = (event) => {
        setRecipeName({value: event.target.value, inputState: recipeName.inputState});
    }
    const handleMealTypeChange = (event) => {
        setMealType({value: event.target.value, inputState: mealType.inputState});
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
        setRecipeName({value: '', inputState: ''})
        setMealType({value: 'Breakfast', inputState: ''})
        setIngredientFields([{ name: '', nameInputState: '', amount: '', amountInputState: '', amountErrorText: 'not set', measurementType: '', measurementTypeInputState: ''}])
        setStepFields([{ text: '', textInputState: '' }])
    }
    
    //ADD INPUT BOX HANDLERS
    const addIngredientFields = () => {
        let object = { 
            name: '', 
            nameInputState: '',
            amount: '', 
            amountInputState: '',
            amountErrorText: 'not set',
            measurementType: '',
            measurementTypeInputState: '',
        }

        setIngredientFields([...ingredientFields, object])
    }
    const addStepFields = () => {
        let object = {
            text: '',
            textInputState: '',
        }

        setStepFields([...stepFields, object])
    }

    //REMOVE INPUT BOX HANDLERS
    const removeIngredientFields = (index) => {
        if(ingredientFields.length > 1){
            let data = [...ingredientFields];
            data.splice(index, 1)
            setIngredientFields(data)
        }
        else {
            toast.error("Must have at least one ingredient")
        }
    }
    const removeStepFields = (index) => {
        if(stepFields.length > 1){
            let data = [...stepFields];
            data.splice(index, 1)
            setStepFields(data)
        }
        else {
            toast.error("Must have at least one step")
        }
    }
    //SUBMISSION RELATED FUNCTIONS
    function validateIngredient(ingredient, index){
        let bool = true
        if(ingredient.name==''){
            bool=false
            ingredient.nameInputState='input-error'
        } else {
            ingredient.nameInputState=''
        }
        if(ingredient.amount==''){
            bool=false
            ingredient.amountErrorText='Required'
            ingredient.amountInputState='input-error'
        } else if(isNaN(Number(ingredient.amount))){
            bool=false
            ingredient.amountErrorText='Amount must be a number'
            ingredient.amountInputState='input-error'
        } else{
            ingredient.amountInputState=''
        }
        if(ingredient.measurementType==''){
            bool=false
            ingredient.measurementTypeInputState='input-error'
        } else{
            ingredient.measurementTypeInputState=''
        }
        return true
    }

    async function validateStep(step, index){
        let bool = true
        if(step.text==''){
            bool=false
            step.textInputState='input-error'
        } else{
            step.textInputState=''
        }
        return bool
    }

    function validateData() {
        //Clone all the data because setState() is not immediate 
        let data = {
            recipeName: structuredClone(recipeName),
            mealType: structuredClone(mealType),
            ingredientFields: structuredClone(ingredientFields),
            stepFields: structuredClone(stepFields)
        }
        let bool = true
        if(data.recipeName.value == ''){
            bool = false
            data.recipeName={value: data.recipeName.value, inputState: 'input-error'}
        } else{
            data.recipeName={value: data.recipeName.value, inputState: ''}
        }
        if(!mealTypes.includes(data.mealType.value)){
            bool = false
            data.mealType={value: data.mealType.value, inputState: 'select-error'}
        } else{
            data.mealType={value: data.mealType.value, inputState: ''}
        }
        data.ingredientFields.map((ingredient, index) => {
            if(!validateIngredient(ingredient, index)){
                bool = false
            }
        })
        data.stepFields.map((step, index) => {
            if(!validateStep(step, index)){
                bool = false
            }
        })
        setRecipeName(data.recipeName)
        setMealType(data.mealType)
        setIngredientFields(data.ingredientFields)
        setStepFields(data.stepFields)
        return bool
    }

    async function doPost() {
        let url = ''
        if(process.env.NODE_ENV=='development'){
            url = 'http://localhost:8888/.netlify/functions/addRecipe'
        } else {
            url = 'https://radiant-basbousa-209352.netlify.app/.netlify/functions/addRecipe'
        }
        let ingredientsData = ingredientFields.map(({name, amount, measurementType}) => ({name, amount, measurementType}))
        let stepData = stepFields.map(({text}) => ({text}))
        return await axios.post(url, {
            recipeName: recipeName.value,
            mealType: mealType.value,
            ingredients: JSON.stringify(ingredientsData),
            steps: JSON.stringify(stepData)
            })
            .then(function (response) {
                
            })

    }

    async function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        if(validateData()){
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
                        value={recipeName.value}
                        type="text" 
                        placeholder="Type here" 
                        className={`input input-bordered ${recipeName.inputState} w-full`}
                        />
                        <label className="label">
                            {recipeName.inputState=="input-error" && <span className="label-text-alt">
                                    <p className='text-red-500'>Required</p>
                                </span>}
                        </label>
                    </div>
                    {/* MEAL TYPE */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Select meal type</span>
                        </label>
                        <select 
                        className={`select select-bordered ${mealType.inputState}`}
                        name='mealType'
                        placeholder='Meal Type...'
                        onChange={event => handleMealTypeChange(event)}
                        value={mealType.value}
                        >
                            <option disabled>Pick one</option>
                            <option>Breakfast</option>
                            <option>Lunch</option>
                            <option>Dinner</option>
                            <option>Desert</option>
                            {/* {mealTypes.map((meal) => {
                                return (
                                <option>{meal}</option>
                                )
                            })} */}
                        </select>
                        <label className="label">
                            {mealType.inputState=="select-error" && <span className="label-text-alt">
                                <p className='text-red-500'>Required</p>
                            </span>}
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
                        className={`input input-bordered ${ingredient.nameInputState} w-full`}
                        />
                        <label className="label">
                            {ingredient.nameInputState=="input-error" && <span className="label-text-alt">
                                <p className='text-red-500'>Required</p>
                            </span>}
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
                        className={`input input-bordered ${ingredient.amountInputState} w-full`} 
                        />
                        <label className="label">
                            {ingredient.amountInputState=="input-error" && <span className="label-text-alt">
                                    <p className='text-red-500'>{ingredient.amountErrorText}</p>
                                </span>}
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
                        className={`input input-bordered ${ingredient.measurementTypeInputState} w-full`}
                        />
                        <label className="label">
                            {ingredient.measurementTypeInputState=="input-error" && <span className="label-text-alt">
                                <p className='text-red-500'>Required</p>
                            </span>}
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
                        className={`input input-bordered ${step.textInputState} w-full`}
                        />
                        <label className="label">
                            {step.textInputState=="input-error" && <span className="label-text-alt" >
                            <p className='text-red-500'>Required</p>
                            </span>}
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

