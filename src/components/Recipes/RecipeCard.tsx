import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Recipe } from "../../common/types";

function RecipeCard({ recipe }: { recipe: Recipe }) {
    return <Row sm={1} md={12}>
        <Col>
            <Card>
                <Card.Img variant="top" src={recipe.imageUrl} />
                <Card.Body>
                    <Card.Title>{recipe.label}</Card.Title>
                    <Card.Link className='btn btn-primary' href={recipe.url} target="_blank">Insructions</Card.Link>
                </Card.Body>
            </Card>
        </Col>
    </Row>
};

export default RecipeCard;