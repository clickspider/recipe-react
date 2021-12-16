import classes from './MainLayout.module.css';
import { ReactChild, ReactFragment, ReactPortal } from "react";

interface Props {
    children: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined;
}

function MainLayout(props: Props) {
    return (
        <main className={classes.main}>
            {props.children}
        </main>
    )
}

export default MainLayout;