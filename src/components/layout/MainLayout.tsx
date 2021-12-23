import classes from "./MainLayout.module.css";
import { ReactChild, ReactFragment, ReactPortal } from "react";
import Container from "react-bootstrap/Container";
interface Props {
  children:
    | boolean
    | ReactChild
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
}

function MainLayout(props: Props) {
  return (
    <main className={classes.main}>
      <Container>{props.children}</Container>
    </main>
  );
}

export default MainLayout;
