import React from "react";

import FinishForm from './FinishFormView'
  
const FinishFormContainer = (props: any) => {
    const handlers = {
        ...props
    }
    return (
        <>
            <FinishForm 
                {...handlers}
            />
        </>
    )
}
export default FinishFormContainer
    