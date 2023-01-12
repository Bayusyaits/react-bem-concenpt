import { currencyFormat } from 'helper/mixins'
import { capitalize, upperCase } from 'lodash'
import React from 'react'
const SummaryView = (
  {
    step,
    state,
    isDirty,
    dropShipperFee,
    watchAllFields,
    totalItems,
    checkPayment,
    charge
  }: any
) => {
  const {
    delivery,
    payment,
    shipment,
  } = watchAllFields
  const payMethod = payment?.name ? payment?.name : '-'
  const courierName = shipment?.name ? shipment?.name : '-'
  const courierEstimate = shipment?.estimate ? shipment?.estimate : '-'
  const courierFee = shipment?.value ? Number(shipment?.value) : 0
  const isDisabled = checkPayment()
  return (<>
    <div className="summary-header">
      <h4>
        Summary
      </h4>
      <p>{totalItems} items purchased</p>
    </div>
    {
      step > 0 && (
        <>
          <div>
            <p className="mb-0 fw_regular text_grat">Delivery Estimation</p>
            <h5 className="text_secondary fw_bold">{capitalize(courierEstimate)
            } by <span>{upperCase(courierName)}</span></h5>
          </div>
          <div>
            <p className="mb-0 fw_regular text_grat">Payment Method</p>
            <h5 className="text_secondary fw_bold">{upperCase(payMethod)}</h5>
          </div>
        </>
      )
    }
    <div className="summary-content">
      <ul className="unstyled">
        <li className="flex justify-content_between align-items_center">
          <p className="mb-0 fw_regular text_grat">Cost of Goods</p>
          <p className="fw_bold mb-0">{currencyFormat(charge)}</p>
        </li>
        <li className="flex justify-content_between align-items_center">
          <p className="mb-0 fw_regular text_grat">Dropshipping Fee</p>
          <p className="fw_bold mb-0">{currencyFormat(dropShipperFee)}</p>
        </li>
        {courierName ? <li className="flex justify-content_between align-items_center">
          <p className="mb-0 fw_regular text_grat">{upperCase(courierName)} Shipment</p>
          <p className="fw_bold mb-0">{currencyFormat(courierFee)}</p>
        </li> : null}
      </ul>
      <div className="flex align-items_center justify-content_between w_100">
        <h4>
          Total
        </h4>
        <h4 className="float-right">
          {currencyFormat(Number(charge)+Number(dropShipperFee)+courierFee)}
        </h4>
      </div>
      {
        state === 'delivery' ? 
        (<button 
          id="summary-content__btn-payment"
          className="w_100 block"
          disabled={!isDirty && (!delivery.name && !delivery.address)}
          title="Continue"
          type="submit"
        >
            Continue to Payment
        </button>) : state === 'payment' ? 
        (

        <button 
          disabled={step < 1 || isDisabled}
          id="summary-content__btn-waller"
          className="w_100 block"
          title="Continue"
          type="submit"
        >
            Pay with {payMethod}
        </button>
        ) : null
      }
    </div>
  </>)
}

export default SummaryView
