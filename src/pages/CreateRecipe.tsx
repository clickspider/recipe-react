import CreateRecipeForm from '../components/Forms/CreateRecipeForm';

import { Recipe } from "../common/types";


function CreateRecipe() {
    function addRecipe(recipe: Recipe) {
        console.log(recipe)
        return recipe;
    }
    return (
        <section>
            <h1>Add new recipe</h1>
            <CreateRecipeForm onAddRecipe={addRecipe} />
        </section>
    )
}

export default CreateRecipe;