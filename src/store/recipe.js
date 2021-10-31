import { createContext, useState } from "react";

const recipeData = {
    image: null,
    imageUrl: "https://via.placeholder.com/150",
    ingredients: [{ value: '' }],
};

const RecipeContext = createContext({
    recipe: recipeData,
    updateIngredient: (newIngredients) => { },
    updateImageUrl: (newImageUrl) => { },
    updateImage: (newImage) => { },
    addIngredient: () => { },
    removeIngredient: () => { },
});

export function RecipeContextProvider(props) {
    const [recipe, setRecipe] = useState(recipeData);

    function updateIngredient(ingredientToUpdate, newIngredientValue) {
        setRecipe((prevRecipe) => {
            const newIngredients = [...prevRecipe.ingredients];
            const index = newIngredients.findIndex(prevIngredient => prevIngredient?.value === ingredientToUpdate?.value)
            if (index === -1) return console.error('Could not find ingredient to update');
            newIngredients[index].value = newIngredientValue;
            return {
                ...prevRecipe,
                ingredients: newIngredients
            };
        })
    };

    function updateImageUrl(newImageUrl) {
        setRecipe((prevRecipe) => {
            return { ...prevRecipe, imageUrl: newImageUrl }
        });
    };

    function updateImage(newImage) {
        setRecipe((prevRecipe) => {
            return { ...prevRecipe, image: newImage }
        });
    };

    function addIngredient() {
        setRecipe((prevRecipe) => {
            return {
                ...prevRecipe,
                ingredients: [...prevRecipe.ingredients, { value: '' }]
            };
        })
    };

    function removeIngredient() {
        setRecipe((prevRecipe) => {
            const newIngredients = [...prevRecipe.ingredients];
            newIngredients.pop();
            return {
                ...prevRecipe,
                ingredients: newIngredients
            };
        })
    };

    const context = {
        recipe,
        updateIngredient,
        addIngredient,
        removeIngredient,
        updateImageUrl,
        updateImage
    };


    return (
        <RecipeContext.Provider value={context}>
            {props.children}
        </RecipeContext.Provider>
    );

}

export default RecipeContext;