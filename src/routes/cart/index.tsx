import React, { useCallback } from "react";
import { 
    useOrder
} from "store";
import _cloneDeep from "lodash.clonedeep";
import CartError from 'components/checkout/error'
import Cart from './CartView'

  
const CartContainer = () => {
    const itemsState = useOrder(
    useCallback((state: any) => {
        return state.items
    }, []))
    const {
        fields
    } = _cloneDeep(itemsState)
    const handlers = {
        fields
    }
    return (
        <>
            {
                fields && fields.length > 0 ?
            (<Cart 
                {...handlers}
            />) : 
            <CartError />
            } 
        </>
    )
}
export default CartContainer
    