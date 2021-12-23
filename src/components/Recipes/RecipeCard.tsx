import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";

import { Recipe } from "../../common/types";

import classes from "./RecipeCard.module.css";

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Card className="text-center">
      <Card.Img variant="top" src={recipe.imageUrl} height="350" />
      <Card.Body>
        <Card.Title className={classes.recipeTitle}>
          <h1 className={`${classes.recipeTitle__overflow} h5`}>
            {recipe.label}
          </h1>
        </Card.Title>
        <Card.Text>
          <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="1">
              <Accordion.Header>Ingredients</Accordion.Header>
              <Accordion.Body>
                <ListGroup variant="flush">
                  {recipe.ingredients.map((ingredient) => (
                    <ListGroup.Item key={ingredient.value}>
                      {ingredient.value}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card.Text>
        <Card.Link
          className="btn btn-primary"
          href={recipe.url}
          target="_blank"
        >
          Insructions
        </Card.Link>
      </Card.Body>
      <Card.Footer className="text-muted">Created on {recipe.date}</Card.Footer>
    </Card>
  );
}

export default RecipeCard;
