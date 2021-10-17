import { useState } from 'react';

import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CreateRecipe() {
    const recipeData = {
        image: null,
        imageUrl: "https://via.placeholder.com/150",
        url: "",
        label: "",
        ingredients: [{ value: '' }],
        vegetarian: false,
        numOfPeople: "",
        likes: 0
    };
    const [recipe, setRecipe] = useState(recipeData);

    function onIngredientChange(index, event) {
        const ingredientsCopy = [...recipe.ingredients];
        const ingredient = event.target.value;
        ingredientsCopy[index] = { value: ingredient };
        setRecipe({ ...recipe, ingredients: ingredientsCopy });
    }

    function onAddIngredient() {
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, { value: '' }] });
    }

    function onRemoveIngredient() {
        const ingredientsCopy = [...recipe.ingredients];
        ingredientsCopy.pop();
        setRecipe({ ...recipe, ingredients: ingredientsCopy })
    }

    const IngredientsList = recipe.ingredients.map((ingredient, index) => {
        return <Form.Control key={index} type="text" placeholder="Add your ingredient" onChange={(event) => onIngredientChange(index, event)} />
    })

    const ingredientsButtons = recipe.ingredients.length > 1 ?
        <>
            <Button variant="primary" type="button" onClick={onAddIngredient}>+</Button>
            <Button variant="primary" type="button" onClick={onRemoveIngredient}>-</Button>
        </>
        :
        <Button variant="primary" type="button" onClick={onAddIngredient}>+</Button>;

    function handleImage(event) {
        const [file] = event.target.files;
        if (!file) return;
        if (file.type.match("image.*")) {
            const fileReader = new FileReader();
            fileReader.addEventListener("load", () => {
                setRecipe({ ...recipe, imageUrl: fileReader.result });
            });
            fileReader.readAsDataURL(file);
            setRecipe({ ...recipe, image: file });
        } else {
            setRecipe({ ...recipe, image: null, imageUrl: "https://via.placeholder.com/150" });
            return alert("Images only!");
        }
    }

    function onSubmitHandler(event) {
        event.preventDefault();

        console.log(recipe);
    };
    return (
        <Form onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3" controlId="formBasicImage">
                <Form.Label>Recipe Image*</Form.Label>
                <Form.Control type="file" onChange={handleImage} />
                <Image className="mt-2 d-block" src={recipe.imageUrl} alt={recipe.label} rounded />
                <Form.Text className="text-muted">
                    JPG/PNG image file only.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUrl">
                <Form.Label>Instructions url*</Form.Label>
                <Form.Control type="text" placeholder="https://example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUrl">
                <Form.Label>Recipe Headline*</Form.Label>
                <Form.Control type="text" placeholder="Italian pizza with cheese" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUrl">
                <Form.Label>Recipe ingredients*</Form.Label>
                {ingredientsButtons}
                {IngredientsList}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Vegetarian?" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default CreateRecipe;