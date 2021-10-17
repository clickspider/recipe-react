import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function RecipeCard({ recipe }) {
    return <Row sm={1} md={12}>
        <Col>
            <Card>
                <Card.Img variant="top" src={recipe.image} />
                <Card.Body>
                    <Card.Title>{recipe.title}</Card.Title>
                    <Card.Text>{recipe.text}</Card.Text>
                    <Card.Link className='btn btn-primary' href={recipe.url} target="_blank">Insructions</Card.Link>
                </Card.Body>
            </Card>
        </Col>
    </Row>
};

export default RecipeCard;