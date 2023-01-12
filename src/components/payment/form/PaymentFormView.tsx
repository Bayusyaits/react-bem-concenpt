import React from 'react'
import styled from 'styled-components';
import paymentList from 'constants/payment'
import courierList from 'constants/courier'
import { currencyFormat } from 'helper/mixins'


const PaymentFormContainer = styled.div`
  padding-right: 8rem;
`;
const FormFormView = ({
  watchAllFields,
  handleSelectShipment,
  handleSelectPayment
}: any) => {
  const {
    payment: {
      code: paymentCode
    },
    shipment: {
      code: shipmentCode
    }
  } = watchAllFields
  const setShipment = () => {
    const d = [];
    for (let i = 0; i < courierList.length; i++) {
      const el = courierList[i]
      d.push(
      <li
        onClick={(e) => handleSelectShipment(e, el)}
        className={`${el.code === shipmentCode ? 'active' : ''} card cursor-pointer`}
        key={`${el.code}-${el.value}`}>
        <div>
          <p className="mb-0 fw_bold">{el.name}</p>
          <h5 className="mb-0 fw_medium">{currencyFormat(el.value)}</h5>
        </div>
      </li>
      )
    }
    return (<ul className="unstyled grid grid_row">{d}</ul>)
  }
  const setPayment = () => {
    const d = [];
    for (let i = 0; i < paymentList.length; i++) {
      const el = paymentList[i]
      d.push(
      <li 
        onClick={(e) => handleSelectPayment(e, el)}
        className={`${el.code === paymentCode ? 'active' : ''} card cursor-pointer`}
        key={`${el.code}-${el.value}`}>
        <div>
          <p className="mb-0 fw_bold">{el.name}</p>
          {el.value ? <h5  className="mb-0 fw_medium">{currencyFormat(el.value)} Left</h5> : null}
        </div>
      </li>
      )
    }
    return (<ul className="unstyled grid grid_row">{d}</ul>)
  }
  return (
    <PaymentFormContainer>
      <fieldset>
        <h3>Shipment</h3>
        {setShipment()}
      </fieldset>
      <fieldset>
        <h3>Payment</h3>
        {setPayment()}
      </fieldset>
    </PaymentFormContainer>
  )
}
export default FormFormView
