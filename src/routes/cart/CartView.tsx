import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { currencyFormat } from 'helper/mixins'
const CartBtn = styled.div`
  margin: 4rem auto 0px;
  text-align:center;
  width: 50vw;
  display: block;
  text-align: center;
`
const CartView = (
  {
    fields
  }: any
) => {
  const setDom = () => {
    let d = []
    if (fields && fields.length > 0) {
      for (let i = 0; i < fields.length; i++) {
        const el = fields[i]
        d.push(
          <div 
            key={el.code}
            className="row">
            <div className="column">
              <div className="row">
                <h5 className="column">{el.name}</h5>
                <small  className="column">{currencyFormat(el.value)}</small>
              </div>
              <p>Quantity: {el.quantity}</p>
            </div>
          </div>
        )
      }
    }
    return (d)
  }
  return (
    <section className="container">
      <div className="row">
        <div className="column">
          <h4>Cart</h4>
        </div>
      </div>
      {
        setDom()
      }
      <CartBtn>
        <Link to="/checkout" className="button btn_secondary">
        Checkout Now
        </Link>
      </CartBtn>
    </section>)
  }

export default CartView
