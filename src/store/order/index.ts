import produce, {Draft} from "immer";
import create, { State, StateCreator } from "zustand";
import { 
  persist,
  devtools
} from 'zustand/middleware';
import lodashMerge from 'lodash.merge'
import { 
  ORDER_SET,
  ORDER_SET_LOADING,
  ORDER_SET_ITEMS,
  ORDER_SET_ITEMS_LOADING
 } from './types';
import {
  ID_ORDER
} from 'constants/id'
import _cloneDeep from "lodash.clonedeep";
type ItemsDetailState = {
  name: string
  code: string
  value: number
  quantity: number
}
export interface OrderState {
  id: string
  isLoading: boolean
  response: {
    id: string
    message: string
    title: string
    code: number
  }
  field: {
    orderId: string | number
    delivery: {
      email: string
      phoneNumber: string | number
      address: string
      dropshipperName: string
      dropshipperPhoneNumber: string | number
      isDropshipper: number
    }
    shipment: {
      name: string
      code: string
      value: number
      estimate?: string
    }
    payment: {
      name: string
      code: string
      value: number
    }
  }
}
export interface ItemsState {
  id: string
  isLoading: boolean
  response: {
    id: string
    message: string
    title: string
    code: number
  }
  fields: ItemsDetailState[]
}
export const INITIAL_STATE: OrderState = {
  id: ID_ORDER,
  isLoading: false,
  response: {
    id: '',
    message: '',
    title: 'Order Notification',
    code: 0
  },
  field: {
    orderId: '',
    delivery: {
      email: '',
      phoneNumber: '',
      address: '',
      dropshipperName: '',
      dropshipperPhoneNumber: '',
      isDropshipper: 0
    },
    shipment: {
      name: '',
      code: '',
      value: 0
    },
    payment: {
      name: '',
      code: '',
      value: 0
    }
  }
};

export const INITIAL_ITEMS_STATE: ItemsState = {
  id: ID_ORDER,
  isLoading: false,
  response: {
    id: '',
    message: '',
    title: 'Order Notification',
    code: 0
  },
  fields: []
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
let useOrderSlice: any = (set: any, get: any) => ({
    ...INITIAL_STATE,
    setOrderLoading: async () => {
      await set((state: any) => {
        state.order.isLoading = true
      }, 
      false, 
      {
        type: ORDER_SET_LOADING
      })
    },
    setOrder: async (payload: any) => {
      await set((state: any) => {
        state.order.field = _cloneDeep(payload)
      }, 
      false, 
      {
        type: ORDER_SET,
        payload
      })
    },
  })
  let useItemsSlice: any = (set: any, get: any) => ({
    ...INITIAL_ITEMS_STATE,
    setItemsLoading: async () => {
      await set((state: any) => {
        state.items.isLoading = true
      }, 
      false, 
      {
        type: ORDER_SET_ITEMS_LOADING
      })
    },
    setItems: async (payload: ItemsDetailState) => {
      const id = ID_ORDER
      try {
        const {
          items: {
            fields
          }
        } = get()
        const arr = _cloneDeep(fields)
        const i = arr.findIndex((el: any) => el.code === payload.code)
        if (i === -1) {
          arr.push({
            ...payload,
            quantity: 1
          })
        } else {
          arr[i].quantity++
        }
        await set((state: any) => {
          state.items.fields = arr
        }, 
        false, 
        {
          type: ORDER_SET_ITEMS,
          payload
        })
      } catch (e) {
        console.log(id, e)
      }
    },
  })
let useOrder: any = (set: any, get: any) => ({
  order: useOrderSlice(set, get),
  items: useItemsSlice(set, get)
});


useOrder = devtools<any>(useOrder, 
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

useOrder = persist(log(useOrder), {
  version: 1, // a migration will be triggered if the version in the storage mismatches this one
  name: 'order',
  getStorage: () => localStorage,
  partialize: (state: any) => ({ 
    order: limitObject(state.order),
    items: limitObject(state.items)
  }),
  merge: (persistedState, currentState) =>
    lodashMerge(currentState, persistedState)
})
export default create(useOrder);
