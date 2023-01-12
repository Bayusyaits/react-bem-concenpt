import React, {useEffect} from 'react'
import _cloneDeep from 'lodash.clonedeep';
import { 
  useProducts,
  useOrder
} from "store";
import LayoutView from './LayoutView'

const LayoutContainer = ({ children }: any) => {
  const itemsState = useOrder((state: any) => (state.items))
  const resetProducts = useProducts((state: any) => (state.products.resetProducts))
  const {
    fields
  } = _cloneDeep(itemsState)
  useEffect(() => {
    if (fields.length === 0) {
      resetProducts()
    }
  }, [fields])
  return (
    <>
      <LayoutView>
        {children}
      </LayoutView>
    </>
  )
}

export default LayoutContainer
