import React, { useCallback, useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { 
    useOrder
} from "store";
import _cloneDeep from "lodash.clonedeep";
import CheckoutError from 'components/checkout/error'
import Checkout from './CheckoutView'
import { randomString } from "helper/mixins";
  
const CheckoutContainer = () => {
    const [state, setState] = useState<string>('delivery')
    const [step, setStep] = useState<number>(0)
    const fee = 5900
    const [dropShipperFee, setDropshipperFee] = useState<number>(0)
    const itemsState = useOrder(
        useCallback((state: any) => {
            return state.items
        }, []))
    const orderState = useOrder(
        useCallback((state: any) => {
            return state.order
        }, []))
    const setOrder = useOrder(
        useCallback((state: any) => {
            return state.order.setOrder
        }, []))
    const {
        fields
    } = _cloneDeep(itemsState)
    let { field } = _cloneDeep(orderState)
    const courierFee = field.shipment.value
    const totalItems = fields.reduce((a: any, b: any) => {
        return a + b.quantity;
    }, 0)
    const charge = fields.reduce((a: any, b: any) => {
        return a + b.value;
    }, 0)
    const defaultValues = {...field}
    const schema = yup
    .object({
      delivery: yup.object({
        email: yup.string().required(),
        phoneNumber: yup.string().min(6).max(20).required('Phone number harus isi'),
        address: yup.string().required().max(120),
        dropshipperName: yup.string(),
        dropshipperPhoneNumber: yup.string(),
        isDropshipper: yup.string()
      }),
      shipment: yup.object({
        code: yup.string(),
        name: yup.string(),
        value: yup.string()
      }),
      payment: yup.object({
        code: yup.string(),
        name: yup.string(),
        value: yup.string()
      }),
    })
    .required()
    const { 
        register,
        setError, 
        control,
        setValue,
        watch,
        handleSubmit, 
        formState 
    } = useForm({
        defaultValues,
        resolver: yupResolver(schema),
    })
    useEffect(() => {
        if (field && field.orderId) {
            setStep(2)
            setState('finish')
        }
    }, [])
    const watchAllFields = watch()
    const steps = Object.entries({
        1: 'delivery',
        2: 'payment',
        3: 'finish'
    })
    const { 
        errors, 
        dirtyFields,
        isDirty 
    } = formState
    const validateEmail = (val: string)  => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val))
        {
          return (true)
        }
        return (false)
      }
    const validate = (val: any) => {
        let bool = false
        const {
            delivery
        } = val
        if (delivery.email && !validateEmail(delivery.email)) {
            setError('delivery.email', {
                type: 'focus',
                message: 'Format Email tidak valid'
            })
            bool = true
        } else if (errors?.delivery?.email?.message) {
            setError('delivery.email', {
                type: 'focus',
                message: ''
            })
        }
        if (delivery.isDropshipper && !delivery.dropshipperName) {
            setError('delivery.dropshipperName', {
                type: 'focus',
                message: 'Nama harus diisi'
            })
            bool = true
        } else if (errors?.delivery?.dropshipperName?.message) {
            setError('delivery.dropshipperName', {
                type: 'focus',
                message: ''
            })
        }
        if (delivery.isDropshipper && !delivery.dropshipperPhoneNumber) {
            setError('delivery.dropshipperPhoneNumber', {
                type: 'focus',
                message: 'Nama harus diisi'
            })
            bool = true
        } else if (errors?.delivery?.dropshipperPhoneNumber?.message) {
            setError('delivery.dropshipperPhoneNumber', {
                type: 'focus',
                message: ''
            })
        }
        return bool
    }
    const handleSave = (val: any) => {
        const payload = {...val}
        const isError = validate(payload)
        if (step < 2 && !isError) {
            const i = step + 1
            setStep(i)
            setState(steps[i][1])
        } 
        if (step === 1 && !field.orderId && !isError) {
            payload.orderId = randomString(5, '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ')
        }
        if (!isError) {
            setOrder({...payload})
        }
    }
    const handleStep = (e: any, val: string, i: number) => {
        e.preventDefault()
        const s = steps[step][0] === val
        if (!s && val !== state) {
            setStep(i)
            setState(val)
        }
    }
    const handleIsDropshipper = (val: number | string) => {
        setValue('delivery.isDropshipper', val)
    }
    const handleSelectShipment = (e: any, val: any) => {
        e.preventDefault()
        setValue('shipment', {...val})
        setOrder(watchAllFields)
    }
    const handleSelectPayment = (e: any, val: any) => {
        e.preventDefault()
        setValue('payment', {...val})
        setOrder(watchAllFields)
    }
    useEffect(() => {
        if (watchAllFields.delivery.isDropshipper) {
            setDropshipperFee(fee)
        } else {
            setDropshipperFee(0)
        }
    }, [watchAllFields.delivery.isDropshipper])

    const handlers = {
        steps,
        step,
        setState,
        setStep,
        isDirty,
        orderId: field.orderId,
        errors,
        dropShipperFee,
        handleSelectShipment,
        handleSelectPayment,
        register,
        courierFee,
        watchAllFields,
        totalItems,
        charge,
        control,
        state,
        handleStep,
        dirtyFields,
        handleIsDropshipper,
        handleSubmit,
        handleSave
    }
    return (
        <>
            {
                fields && fields.length > 0 ?
            
            (<Checkout 
                {...handlers}
            />) : <CheckoutError />
            } 
        </>
    )
}
export default CheckoutContainer
    