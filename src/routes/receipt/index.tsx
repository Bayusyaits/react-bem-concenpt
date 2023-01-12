import React, { useState } from "react";
import { 
    useOrder
} from "store";
import _cloneDeep from "lodash.clonedeep";
import ReceiptError from 'components/checkout/error'
import Receipt from './ReceiptView'
import { useEffect } from "react";

  
const ReceiptContainer = () => {
    const [state, setState] = useState<string>('delivery')
    const itemsState = useOrder((state: any) => state.items)
    const orderState = useOrder((state: any) => state.order)
    const fee = 5900
    const [dropShipperFee, setDropShipperFee] = useState<number>(0)
    const {
        fields
    } = _cloneDeep(itemsState)
    const {
        field
    } = _cloneDeep(orderState)
    const totalItems = fields.reduce((a: any, b: any) => {
        return a + b.quantity;
    }, 0)
    const charge = fields.reduce((a: any, b: any) => {
        return a + b.value;
    }, 0)
    useEffect(() => {
        if (field.delivery.isDropshipper) {
            setDropShipperFee(fee)
        }
    }, [field])
    const handlers = {
        state,
        totalItems,
        charge,
        dropShipperFee,
        setState,
        fields,
        field
    }
    return (
        <>
            {
                fields && fields.length > 0 ?
            (<Receipt 
                {...handlers}
            />) : <ReceiptError />
            } 
        </>
    )
}
export default ReceiptContainer
    