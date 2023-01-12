import produce, {Draft} from "immer";
import create, { State, StateCreator } from "zustand";
import { 
  persist,
  devtools
} from 'zustand/middleware';
import lodashMerge from 'lodash.merge'
import { 
  STEPPER_SET,
  STEPPER_SET_LOADING
 } from './types';
import {
  ID_STEPPER
} from 'constants/id'
export interface StepperState {
  id: string
  isLoading: boolean
  response: {
    id: string
    message: string
    title: string
    code: number
  }
}
export const INITIAL_STATE: StepperState = {
  id: ID_STEPPER,
  isLoading: false,
  response: {
    id: '',
    message: '',
    title: 'Stepper Notification',
    code: 0
  },
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
let useStepperSlice: any = (set: any, get: any) => ({
    ...INITIAL_STATE,
    setStepperLoading: async () => {
      await set((state: any) => {
        state.stepper.isLoading = true
      }, 
      false, 
      {
        type: STEPPER_SET_LOADING
      })
    },
    setStepper: async (val: boolean) => {
      await set((state: any) => {
        state.stepper.isLoggedIn = val
      }, 
      false, 
      {
        type: STEPPER_SET
      })
    },
  })
let useStepper: any = (set: any, get: any) => ({
  stepper: useStepperSlice(set, get)
});


useStepper = devtools<any>(useStepper, 
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

useStepper = persist(log(useStepper), {
  version: 1, // a migration will be triggered if the version in the storage mismatches this one
  name: 'stepper',
  getStorage: () => localStorage,
  partialize: (state: any) => ({ 
    stepper: limitObject(state.stepper)
  }),
  merge: (persistedState, currentState) =>
    lodashMerge(currentState, persistedState)
})
export default create(useStepper);
