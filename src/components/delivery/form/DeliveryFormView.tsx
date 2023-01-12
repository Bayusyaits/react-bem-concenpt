import React from 'react'
import styled from 'styled-components';
import { handlePhoneNumber } from 'helper/mixins'
const DeliveryFormHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const DeliveryFormView = ({
  register,
  watchAllFields,
  handleIsDropshipper,
  isDirty,
  errors
}: any) => {
  const {
    delivery: {
      isDropshipper,
      address
    }
  } = watchAllFields
  return (
    <div>
      <DeliveryFormHeaderContainer>
        <h3>Delivery Details</h3>
        <fieldset className="flex align-items_center">
          <input 
            value="1"
            className="checkmark"
            onChange={(e) => handleIsDropshipper(e.target.checked)}          
            type="checkbox"/>
          <label className="label-inline f-12 text-muted mb-0">Send as a Dropshipper</label>
        </fieldset>
      </DeliveryFormHeaderContainer>
      <div className="row">
        <div className="column">
          <fieldset>
            <input 
              {...register('delivery.email')}
              className={`${errors?.delivery?.email?.message ? 
                'input_error' : errors?.delivery?.email && isDirty ? 
                'input_success' : ''}`}
              type="text" 
              placeholder="Email"/>
          </fieldset>
          <fieldset>
            <input 
              {...register('delivery.phoneNumber', {
                pattern: /[0-9]/
              })}
              onKeyDown={(e) => handlePhoneNumber(e)}
              className={`${errors?.delivery?.phoneNumber?.message ? 
                'input_error' : errors?.delivery?.phoneNumber && isDirty ? 
                'input_success' : ''}`}
              type="text" 
              placeholder="Phone Number"/>
          </fieldset>
          <fieldset>
            <textarea 
              {...register('delivery.address')}
              className={`${errors?.delivery?.address?.message ? 
                'input_error' : errors?.delivery?.address && isDirty ? 
                'input_success' : ''} mb-0`}
              placeholder="Address">
            </textarea>
            <small className="mb-0 float-right text_muted">{address.length}</small>
          </fieldset>
        </div>
       <div className="column">
          <fieldset>
            <input 
              {...register('delivery.dropshipperName', {
                required: isDropshipper
              })}
              className={`${errors?.delivery?.dropshipperName?.message ? 
                'input_error' : errors?.delivery?.dropshipperName && isDirty ? 
                'input_success' : ''}`}
              type="text" 
              placeholder="DropShipper Name"/>
          </fieldset>
          <fieldset>
            <input 
              {...register('delivery.dropshipperPhoneNumber', {
                required: isDropshipper,
                pattern: /[0-9]/
              })}
              className={`${errors?.delivery?.dropshipperPhoneNumber?.message ? 
                'input_error' : errors?.delivery?.dropshipperPhoneNumber && isDirty ? 
                'input_success' : ''}`}
              onKeyDown={(e) => handlePhoneNumber(e)}
              type="text" 
              placeholder="Dropshipper Phone Number"/>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
export default DeliveryFormView
