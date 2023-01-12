import { faArrowLeftLong, faArrowRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { capitalize, upperCase } from 'lodash'
import React from 'react'
import { Link } from 'react-router-dom'

const FinishFormView = ({
  watchAllFields,
  orderId
}: any) => {
  const {
    shipment
  } = watchAllFields 
  const courierName = shipment?.name ? shipment?.name : '-'
  const courierEstimate = shipment?.estimate ? shipment?.estimate : '-'
  return (
      <div className="container">
        <div className="row">
          <div className="column">
            <h2>Thank You</h2>
            <p className="fw_medium mb-0">Order ID: <span>{orderId}</span></p>
            <p className="text_muted">{`Your order will be delivered ${capitalize(courierEstimate)} with ${upperCase(courierName)}`}</p>
            <div className="flex justify-content_between align-items_center">
              <Link to={'/'} className="text_gray fw_bold">
                <FontAwesomeIcon icon={faArrowLeftLong} size="lg"/>
                <span className="ml-1">Go to Home Page</span>
              </Link>
              <Link to={'/receipt'} className="text_gray fw_bold">
                <FontAwesomeIcon icon={faArrowRightLong} size="lg"/>
                <span className="ml-1">Go to Receipt</span>
              </Link>
            </div>
          </div>
        </div>
    </div>
  )
}

export default FinishFormView
