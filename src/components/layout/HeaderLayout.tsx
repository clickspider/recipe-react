import { ReactChild, ReactFragment, ReactPortal } from "react";

interface Props {
    children: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined;
}

function HeaderLayout(props: Props) {
    return (
        <header>
            {props.children}
        </header>
    )
}

export default HeaderLayout;