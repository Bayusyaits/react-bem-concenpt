import React, { useCallback } from "react";
import { 
    useOrder
} from "store";
import Home from './HomeView'
  
const HomeContainer = (props: any) => {
    const orderState = useOrder(
        useCallback((state: any) => {
            return state.order
    }, []))
    const {
        items
    } = orderState
    const handlers = {
        items
    }
    return (
        <>
            <Home 
                {...handlers}
            />
        </>
    )
}
export default HomeContainer
    