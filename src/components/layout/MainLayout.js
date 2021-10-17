import classes from './MainLayout.module.css';

function MainLayout(props) {
    return (
        <main className={classes.main}>
            {props.children}
        </main>
    )
}

export default MainLayout;