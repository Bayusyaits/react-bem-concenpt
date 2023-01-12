import React from "react";
import Footer from './FooterView'
  
const FooterContainer = (props: any) => {
    const handler = {
    ...props
    }
    return (
        <>
            <Footer {...handler} />
        </>
    )
}
export default FooterContainer
    