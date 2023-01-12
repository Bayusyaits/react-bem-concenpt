import produce, {Draft} from "immer";
import create, { State, StateCreator } from "zustand";
import { 
  persist,
  devtools
} from 'zustand/middleware';
import lodashMerge from 'lodash.merge'
import _cloneDeep from "lodash.clonedeep";
import productList from 'constants/products'
import { 
  PRODUCTS_SET,
  PRODUCTS_RESET,
  PRODUCTS_SET_LOADING
 } from './types';
import {
  ID_PRODUCTS
} from 'constants/id'
type ProductDetailState = {
  imageUrl: string
  name: string
  code: string
  value: number
  stock: number
}
export interface ProductsState {
  id: string
  isLoading: boolean
  response: {
    id: string
    message: string
    title: string
    code: number
  }
  fields: ProductDetailState[]
}
export const INITIAL_STATE: ProductsState = {
  id: ID_PRODUCTS,
  isLoading: false,
  response: {
    id: '',
    message: '',
    title: 'Products Notification',
    code: 0
  },
  fields: _cloneDeep(productList)
};
const log =
<T extends State>(config: StateCreator<T>): StateCreator<T> =>
(set, get, api) =>
  config(
    (partial, replace) => {
      const nextState: any =
        typeof partial === "function"
          ? produce(partial as (state: Draft<T>) => T)
          : (partial as T);
      return set(nextState, replace);
    },
    get,
    api
)
let useProductsSlice: any = (set: any, get: any) => ({
    ...INITIAL_STATE,
    setProductsLoading: async () => {
      await set((state: any) => {
        state.products.isLoading = true
      }, 
      false, 
      {
        type: PRODUCTS_SET_LOADING
      })
    },
    setProducts: async (payload: any, operator: string = '-') => {
      const {
        products: {
          fields
        }
      } = get()
      const arr = _cloneDeep(fields)
      const i = arr.findIndex((el: any) => el.code === payload.code)
      if (arr[i] && operator === '+') {
        arr[i].stock++
      } else {
        arr[i].stock--
      }
      await set((state: any) => {
        state.products.fields = arr
      }, 
      false, 
      {
        type: PRODUCTS_SET,
        payload
      })
    },
    resetProducts: async () => {
      await set((state: any) => {
        state.products.fields = productList
      }, 
      false, 
      {
        type: PRODUCTS_RESET
      })
    },
    
  })
let useProducts: any = (set: any, get: any) => ({
  products: useProductsSlice(set, get)
});


useProducts = devtools<any>(useProducts, 
  { 
    enabled: import.meta.env.NODE_ENV === 'development' 
  }
)

const limitObject = (state: any, arr: string[] = 
  ['isLoading', 'response']) => {
  const a = arr
  const k = Object.keys(state)
  if (k.length > 0) {
    const d = Object.fromEntries(
    Object.entries(state).filter(([key]) => 
    !a.includes(key)))
    return d
  }
}

useProducts = persist(log(useProducts), {
  version: 1, // a migration will be triggered if the version in the storage mismatches this one
  name: 'products',
  getStorage: () => localStorage,
  partialize: (state: any) => ({ 
    products: limitObject(state.products)
  }),
  merge: (persistedState, currentState) =>
    lodashMerge(currentState, persistedState)
})
export default create(useProducts);
