import CreateRecipeForm from '../components/Forms/CreateRecipeForm';

interface Recipe {
    image: object | null;
    imageUrl: string;
    ingredients: { value: string; }[];
    url: string;
    label: string;
    vegetarian: boolean;
    numOfPeople: string;
    id: string;
    likes: number;
    date: string;
    creatorId: string;
}


function CreateRecipe() {
    function addRecipe(recipe: Recipe) {
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