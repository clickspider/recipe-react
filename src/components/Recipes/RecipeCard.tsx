import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';

import { Recipe } from "../../common/types";

function RecipeCard({ recipe }: { recipe: Recipe }) {
    return (
        <Card>
            <Card.Img variant="top" src={recipe.imageUrl} height={350} />
            <Card.Body>
                <Card.Title>{recipe.label}</Card.Title>
                <Card.Text>
                    <Accordion defaultActiveKey="1">
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Ingredients</Accordion.Header>
                            <Accordion.Body>
                                <ListGroup variant="flush">
                                    {recipe.ingredients.map((ingredient) => (
                                        <ListGroup.Item key={ingredient.value}>{ingredient.value}</ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Card.Text>
                <Card.Link className='btn btn-primary' href={recipe.url} target="_blank">Insructions</Card.Link>
            </Card.Body>
        </Card>
    )
};

export default RecipeCard;