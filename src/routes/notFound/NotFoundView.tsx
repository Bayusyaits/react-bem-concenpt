import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'
const NotFoundtSection = styled.section`
  text-align: center;
`
const NotFoundSectionBtn = styled.div`
  margin: 4rem auto 0px;
  text-align:center;
  width: 50vw;
  display: block;
  text-center;
`
const NotFoundView = () => (
  <NotFoundtSection className="container">
    <div>
      <h5 className="fw_bold text_primary">Page Not Found</h5>
    </div>
    <NotFoundSectionBtn>
      <Link to="/" className="button btn_secondary">
        Go to Home Page
      </Link>
    </NotFoundSectionBtn>
  </NotFoundtSection>
)

export default NotFoundView
