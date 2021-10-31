import CreateRecipeForm from '../components/Forms/CreateRecipeForm';

function CreateRecipe() {
    function addRecipe(recipe) {
        console.log(recipe)
    }
    return (
        <section>
            <h1>Add new recipe</h1>
            <CreateRecipeForm onAddRecipe={addRecipe} />
        </section>
    )
}

export default CreateRecipe;