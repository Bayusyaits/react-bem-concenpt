import React from "react";

import PaymentForm from './PaymentFormView'
  
const PaymentFormContainer = (props: any) => {
    const handlers = {
        ...props
    }
    return (
        <>
            <PaymentForm 
                {...handlers}
            />
        </>
    )
}
export default PaymentFormContainer
    