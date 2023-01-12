import React from "react";
import Header from './HeaderView'
const HeaderContainer = (props: any) => {
    const handler = {
    ...props
    }
    return (
        <>
            <Header {...handler} />
        </>
    )
}
export default HeaderContainer
    