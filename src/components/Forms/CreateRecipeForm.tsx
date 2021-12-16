import { useRef, useState } from 'react';

import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


import { Recipe } from "../../common/types";
interface Props {
    onAddRecipe: (recipe: Recipe) => Recipe;
}

function CreateRecipeForm(props: Props) {

    const [image, setImage] = useState<object | null>(null);
    const [imageUrl, setImageUrl] = useState("https://via.placeholder.com/150");
    const [ingredients, setIngredients] = useState([{ value: "" }]);
    const urlInputRef = useRef<HTMLInputElement>(null);
    const titleInputRef = useRef<HTMLInputElement>(null);
    const checkboxInputRef = useRef<HTMLInputElement>(null);
    const selectInputRef = useRef<HTMLSelectElement>(null);

    function updateIngredients(ingredientToUpdateValue: string) {
        setIngredients(prevIngredients => prevIngredients.map(ingredient => ingredient.value === ingredientToUpdateValue ? { value: ingredientToUpdateValue } : ingredient));
    };

    function addIngredients() {
        setIngredients(prevIngredients => [...prevIngredients, { value: '' }]);
    };

    function removeIngredients() {
        setIngredients((prevIngredients) => {
            const copyIngredients = [...prevIngredients];
            copyIngredients.pop();
            return copyIngredients;
        })
    };

    function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
        if (!file) return;
        if (file.type.match("image.*")) {
            const fileReader = new FileReader();
            fileReader.addEventListener("load", () => {
                setImageUrl(fileReader.result as string);
            });
            fileReader.readAsDataURL(file);
            return setImage(file);
        }
        return alert("Images only!");
    }

    function submitHandler(event: { preventDefault: () => void; }) {
        event.preventDefault();
        const enteredUrl = urlInputRef.current?.value;
        const enteredLabel = titleInputRef.current?.value;
        const enteredCheckbox = checkboxInputRef.current?.checked;
        const enteredSelect = selectInputRef.current?.value;

        const recipeData = {
            image,
            imageUrl,
            ingredients,
            url: enteredUrl,
            label: enteredLabel,
            vegetarian: enteredCheckbox,
            numOfPeople: enteredSelect,
        };

        props.onAddRecipe(recipeData as Recipe);
    };

    const ingredientsList = ingredients.map((ingredient, index) => {
        return <Form.Control key={index} type="text" placeholder="Add your ingredient" onChange={(event) => updateIngredients(event.target.value)} />
    })

    function ingredientsButtons() {
        if (ingredients.length > 1) {
            return (
                <>
                    <Button variant="primary" type="button" onClick={addIngredients}>+</Button>
                    <Button variant="primary" type="button" onClick={removeIngredients}>-</Button>
                </>
            )
        };
        return <Button variant="primary" type="button" onClick={addIngredients}>+</Button>;
    };

    return (
        <Form onSubmit={submitHandler}>

            <Form.Group className="mb-3">
                <Form.Label>Recipe Image*</Form.Label>
                <Form.Control type="file" onChange={handleImage} />
                <Image className="mt-2 d-block" src={imageUrl} alt={titleInputRef.current?.value} rounded />
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
                <Form.Control type="text" placeholder="Italian pizza with cheese" ref={titleInputRef} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Recipe ingredients*</Form.Label>
                {ingredientsButtons()}
                {ingredientsList}
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