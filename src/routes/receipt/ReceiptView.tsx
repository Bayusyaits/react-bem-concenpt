import React from 'react'
import styled from 'styled-components';
import { upperCase } from 'lodash'
import { Link } from 'react-router-dom'
import { currencyFormat } from 'helper/mixins'
const ReceiptBtn = styled.div`
  margin: 4rem auto 0px;
  text-align:center;
  width: 50vw;
  display: block;
  text-align: center;
`
const ReceiptView  = (
  {
    fields,
    field,
    totalItems,
    charge,
    dropShipperFee,
  }: any
) => {
    const setReceipt = () => {
      let d = []
      if (fields && fields.length > 0) {
        for (let i = 0; i < fields.length; i++) {
          const el = fields[i]
          d.push(
            <li 
              key={el.code}
              className="row card">
              <div className="column">
                <div className="flex justify-content_between align-items_center">
                  <p className="mb-0 fw_bold">{el.name}</p>
                  <small  className="mb-0 f-14 fw_medium">{currencyFormat(el.value)}</small>
                </div>
                <small className="mb-0 f-12 text_muted">Quantity: {el.quantity}</small>
              </div>
            </li>
          )
        }
      }
      return (<ol className="unstyled">{d}</ol>)
    }
    return (
      <section className="container">
        <div className="row">
          <div className="column">
            <h4>Receipt</h4>
          </div>
        </div>
        {
          setReceipt()
        }
        {field?.shipment?.name && (<div className="row">
          <div className="column">
            <h5 className="fw_bold text_primary">
              Courier
            </h5>
            <div className="card flex justify-content_between align-items_center">
              <p className="mb-0 fw_medium">{upperCase(field?.shipment?.name)}</p>
              <small className="text_muted">{currencyFormat(field?.shipment?.value)}</small>
            </div>
          </div>
        </div>)}
        {field?.payment?.name && (<div className="row">
          <div className="column">
            <div className="card flex justify-content_between align-items_center">
              <p className="mb-0 fw_medium">Payment</p>
              <small className="text_muted">{upperCase(field?.payment?.name)}</small>
            </div>
          </div>
        </div>)}
        {field?.shipment?.value && Number(charge) && field?.payment?.name && (<div className="row">
          <div className="column">
            <div className="card flex justify-content_between align-items_center">
              <p className="mb-0 fw_bold text_secondary">Total <span>({totalItems} items)</span></p>
              <p className="fw_bold text_secondary mb-0">{
                currencyFormat(Number(charge)+Number(field?.shipment?.value)+Number(dropShipperFee))}
              </p>
            </div>
          </div>
        </div>)}
        <ReceiptBtn>
          <Link to="/" className="button btn_secondary">
            Go to Home Page
          </Link>
      </ReceiptBtn>
      </section>
    )
  }

export default ReceiptView
