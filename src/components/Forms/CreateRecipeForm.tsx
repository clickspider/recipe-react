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


    function updateIngredients(indexToUpdate: number, ingredientToUpdateValue: string) {
        const newIngredients = [...ingredients];
        newIngredients[indexToUpdate].value = ingredientToUpdateValue;
        setIngredients(newIngredients);
    };

    function addIngredients() {
        setIngredients([...ingredients, { value: "" }]);
    };

    function removeIngredients() {
        setIngredients(prevIngredients => prevIngredients.slice(0, -1));
    };

    function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
        if (!file) return;
        if (file.type.match("image.*")) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImage(file);
                setImageUrl(reader.result as string);
            };
            return;
        }
        return alert("Images only!");
    };

    function submitHandler(event: { preventDefault: () => void; }) {
        event.preventDefault();
        const recipe: Recipe = {
            image,
            imageUrl,
            ingredients,
            url: urlInputRef.current!.value,
            label: titleInputRef.current!.value,
            vegetarian: checkboxInputRef.current!.checked,
            numOfPeople: selectInputRef.current!.value,
            id: "",
            likes: 0,
            date: new Date().toISOString(),
            creatorId: "",
        };
        props.onAddRecipe(recipe);
    };

    const ingredientsList = ingredients.map((ingredient, index) => {
        return (
            <Form.Control
                key={index}
                type="text"
                placeholder="Ingredient"
                value={ingredient.value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => updateIngredients(index, event.target.value)}
            />
        );
    });

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
                <div className="d-flex">
                    <Button variant="success" onClick={addIngredients}>Add</Button>
                    {ingredients.length > 1 && <Button variant="danger" onClick={removeIngredients}>Remove</Button>}
                </div>
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