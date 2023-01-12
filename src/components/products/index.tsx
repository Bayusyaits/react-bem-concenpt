import React, { useCallback } from "react";
import { 
    useOrder,
    useProducts
} from "store";
import Products from './ProductsView'
import _cloneDeep from "lodash.clonedeep";
  
const ProductsContainer = () => {
    const setItems = useOrder(
        (state: any) =>  state.items.setItems)
    const setProducts = useProducts(
        (state: any) =>  state.products.setProducts)
    const productsState = useProducts(
        (state: any) =>  state.products)
    const handleAddCart = useCallback((e: any, val: any) => {
        e.preventDefault()
        setItems(val)
        setProducts(val, '-')
    }, [setItems])
    const orderState = useOrder(
        useCallback((state: any) => {
            return state.items
    }, []))
    const {
        fields: items
    } = _cloneDeep(orderState)
    const {
        fields
    } = _cloneDeep(productsState)
    const totalItems = items.reduce((a: any, b: any) => {
        return a + b.quantity;
    }, 0)
    const handlers = {
        handleAddCart,
        fields,
        totalItems
    }
    return (
        <>
            <Products 
                {...handlers}
            />
        </>
    )
}
export default ProductsContainer
    