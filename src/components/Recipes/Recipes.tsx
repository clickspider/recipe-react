import { useState } from 'react';

import RecipeCard from './RecipeCard';
import RecipesData from '../../mockdata/recipes.json';

import classes from './Recipes.module.css';


function Recipes() {
    const [recipes] = useState(RecipesData.recipes);
    const listRecipes = recipes.map((recipe) => <RecipeCard recipe={recipe} key={recipe.id} />);
    return (
        <section className={classes.recipesView}>
            {listRecipes}
        </section>
    )
}

export default Recipes;