import { useRef, useState } from 'react';

import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const recipeData = {
    image: null,
    imageUrl: "https://via.placeholder.com/150",
    ingredients: [{ value: '' }],
};

function CreateRecipeForm(props) {

    const [recipe, setRecipe] = useState(recipeData);
    const urlInputRef = useRef();
    const labelInputRef = useRef();
    const checkboxInputRef = useRef();
    const selectInputRef = useRef();

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

    function handleImage(event) {
        const [file] = event.target.files;
        if (!file) return;
        if (file.type.match("image.*")) {
            const fileReader = new FileReader();
            fileReader.addEventListener("load", () => {
                updateImageUrl(fileReader.result)
            });
            fileReader.readAsDataURL(file);
            return updateImage(file);
        }
        return alert("Images only!");
    }

    function submitHandler(event) {
        event.preventDefault();
        const enteredUrl = urlInputRef.current?.value;
        const enteredLabel = labelInputRef.current?.value;
        const enteredCheckbox = checkboxInputRef.current?.checked;
        const enteredSelect = selectInputRef.current?.value;

        const recipeData = {
            ...recipe,
            url: enteredUrl,
            label: enteredLabel,
            vegetarian: enteredCheckbox,
            numOfPeople: enteredSelect,
        };

        props.onAddRecipe(recipeData);
    };

    const IngredientsList = recipe.ingredients.map((ingredient, index) => {
        return <Form.Control key={index} type="text" placeholder="Add your ingredient" onChange={(event) => updateIngredient(ingredient, event.target.value)} />
    })

    function ingredientsButtons() {
        if (recipe.ingredients.length > 1) {
            return (
                <>
                    <Button variant="primary" type="button" onClick={addIngredient}>+</Button>
                    <Button variant="primary" type="button" onClick={removeIngredient}>-</Button>
                </>
            )
        };
        return <Button variant="primary" type="button" onClick={addIngredient}>+</Button>;
    };

    return (
        <Form onSubmit={submitHandler}>

            <Form.Group className="mb-3">
                <Form.Label>Recipe Image*</Form.Label>
                <Form.Control type="file" onChange={handleImage} />
                <Image className="mt-2 d-block" src={recipe?.imageUrl} alt={labelInputRef.current?.value} rounded />
                <Form.Text className="text-muted">
                    Images files only.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Instructions url*</Form.Label>
                <Form.Control type="text" placeholder="https://example.com" ref={urlInputRef} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Recipe Headline*</Form.Label>
                <Form.Control type="text" placeholder="Italian pizza with cheese" ref={labelInputRef} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Recipe ingredients*</Form.Label>
                {ingredientsButtons()}
                {IngredientsList}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Number of diners?*</Form.Label>
                <Form.Select aria-label="Number of diners?*" ref={selectInputRef}>
                    <option disabled>Number of diners?*</option>
                    <option value="1-2">1-2</option>
                    <option value="3-6">3-6</option>
                    <option value="6+">6+</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Check type="checkbox" label="Vegetarian?" ref={checkboxInputRef} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default CreateRecipeForm;