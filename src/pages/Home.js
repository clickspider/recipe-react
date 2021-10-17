import { useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import RecipesData from '../mockdata/recipes.json';

function Home() {
    const [recipes] = useState(RecipesData);
    const listRecipes = recipes.map((recipe) => <RecipeCard recipe={recipe} key={recipe.id} />);
    return (
        <>
            <h1>Home Page</h1>
            <section className='d-flex recipes-view'>

                {listRecipes}
            </section>
        </>
    );
}

export default Home;