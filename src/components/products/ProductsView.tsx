import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { currencyFormat } from 'helper/mixins'
const ProductsBtn = styled.div`
  margin: 4rem auto 0px;
  text-align:center;
  width: 50vw;
  display: block;
  text-align: center;
`
const ProductsView = ({
  handleAddCart,
  fields,
  totalItems
}: any) => {
  const d: any = []
  const setDom = () => {
    for (let i = 0; i < fields.length; i++) {
      const el = fields[i]
      d.push(
        <li
          key={el.code}
          id={`products-column_${el.code}`}
          className="column card"
        >
          <figure>
            <img src={el.imageUrl}/>
            <figcaption>
              <h4>{el.name}</h4>
              <p>{currencyFormat(Number(el.value))}</p>
            </figcaption>
          </figure>
          <div className="column">
            <small>Stock: {Number(el.stock)}</small>
            <button
              id={`products-column__btn-cart_${el.code}`}
              onClick={(e) => handleAddCart(e, el)}
              type="button"
              title="Add Cart">
                Add to Cart
            </button>
          </div>
        </li>
      )
    }
    return (<ol className="unstyled row">{d}</ol>)
  }
  return (
    <>
      {
        setDom()  
      }
      <ProductsBtn>
        <Link to="/cart" className="button btn_secondary">
          Cart <span>({totalItems} items)</span>
        </Link>
      </ProductsBtn>
    </>
  )
}

export default ProductsView
