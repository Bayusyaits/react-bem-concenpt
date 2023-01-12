import React from "react";

import DeliveryForm from './DeliveryFormView'
  
const DeliveryFormContainer = (props: any) => {
    const handlers = {
        ...props
    }
    return (
        <>
            <DeliveryForm 
                {...handlers}
            />
        </>
    )
}
export default DeliveryFormContainer
    