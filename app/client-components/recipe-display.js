//'use client'

export default function RecipeDisplay({ingredients, steps}){
    return (
        <>
        <div className="container mx-auto">
            <div className="columns-1 max-w-fit">
                <div className="collapse bg-base-200">
                    <input type="checkbox" defaultChecked /> 
                    <div className="collapse-title text-xl font-medium">
                        Ingredients
                    </div>
                    <div className="collapse-content"> 
                    <div className="overflow-x-auto">
                        <ul className="list-disc list-outside">
                            {ingredients.map((ingredient, index) => {
                                return (
                                    <li>
                                        {ingredient.ingredient_amount} {ingredient.measurement_type} {ingredient.name}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    </div>
                </div>
                <div className="collapse bg-base-200">
                    <input type="checkbox" defaultChecked /> 
                    <div className="collapse-title text-xl font-medium">
                        Steps
                    </div>
                    <div className="collapse-content">
                        <div className="overflow-x-auto max-w-fit">
                            <ol className="list-decimal list-outside">
                                {steps.map((step, index) => {
                                    return (
                                        <li key={"step-"+index+1}>{step.text}</li>
                                    )
                                })}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}