import React from "react";
import styled from 'styled-components';
const CheckoutForm = styled.footer`
  margin: auto;
  text-align:center;
`
export default function Footer() {
  return (
  <CheckoutForm className="container">
    <p className="mb-0">created by <span className="text_primary ml-1 fw_bold">Bayu Syaits</span></p>
  </CheckoutForm>
  )
}
