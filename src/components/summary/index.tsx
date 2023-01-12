import React from "react";

import Summary from './SummaryView'
  
const SummaryContainer = (props: any) => {
    const watchAllFields = props.watchAllFields
    const checkPayment = () => {
        let bool = false
        const {
            payment,
            shipment
        } = watchAllFields 
        if (!payment?.code || !shipment?.code) {
            bool = true
        }
        return bool
    }
    const handlers = {
        ...props,
        checkPayment
    }
    return (
        <>
            <Summary 
                {...handlers}
            />
        </>
    )
}
export default SummaryContainer
    