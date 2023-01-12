import React from 'react'
import { Link } from 'react-router-dom'
import Summary from 'components/summary'
import Stepper from 'components/stepper'
import Delivery from 'components/delivery/form'
import Payment from 'components/payment/form'
import Finish from 'components/finish/form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';
const CheckoutForm = styled.form`
    margin-top: 3rem;
`;
const CheckoutFormSummary = styled.div`
    display: block;
    flex: 1 1 auto;
    padding: 0 1rem;
    margin-left: 0;
    max-width: 100%;
    width: 100%;
`;
const CheckoutStepperContainer = styled.div`
  position:absolute;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0px;
  right: 0px;
  max-height: 20px;
`;
const CheckoutStepperContainerBtn = styled.div`
  max-width: 50vw;
  background-color: #FFFAE6;
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 50vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
`;
const CheckoutView = (
  {
    step,
    steps,
    state,
    setStep,
    setState,
    handleStep,
    handleSubmit,
    handleSave,
    ...obj
  }: any
) => {
  const setComponent = () => {
    let d = <Delivery
      {...obj}
    />
    switch(state) {
      case 'payment':
        d = <Payment
          {...obj}
        />
        break;
      case 'finish':
          d = <Finish
            {...obj}
          />
          break;
    }
    return (d)
  }
  const setSteps = () => {
    const d = []
    for (let i = 0; i < steps.length; i++) {
      const el = steps[i]
      d.push(
      <button
        key={el[1]}
        id={`checkout-form__step-btn__stepper`}
        type="button"
        title={el[0]}
        disabled={Number(step+1) < Number(el[0])}
        onClick={(e) => handleStep(e, el[1], Number(el[0]-1))}
        className={`${el[1] === state ? '' : 'btn_disabled'} btn_rounded`}
      >
       {el[0]} 
      </button>
      )
    }
    return (d)
  }
  return (
  <section className="checkout container bg_white">
    <Link to={'/cart'} className="checkout-header fw_bold text_gray">
      <FontAwesomeIcon icon={faArrowLeftLong} size="sm"/>
      <span className="ml-1">Back to Cart</span>
    </Link>
    <CheckoutForm onSubmit={handleSubmit(handleSave)} className="checkout-form row">
      <CheckoutStepperContainer>
        <CheckoutStepperContainerBtn className={`grid grid_row`}>
          { setSteps() }
        </CheckoutStepperContainerBtn>
      </CheckoutStepperContainer>
      <div className="column mb-0">
        <Stepper
          state={state}
          {...obj}
          children={setComponent()}
        >
        </Stepper>
      </div>
      <CheckoutFormSummary className="checkout-form_summary">
        <Summary 
          step={step}
          state={state}
          setState={setState}
          handleStep={handleStep}
          {...obj}
        />
      </CheckoutFormSummary>
    </CheckoutForm>
  </section>)
  }

export default CheckoutView
