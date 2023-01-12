import React from "react";

import CheckoutError from './CheckoutErrorView'
import { Link } from "react-router-dom";
  
const CheckoutErrorContainer = () => {
    return (
        <>
            <section className="container bg_white text_center">
                <div className="row">
                    <div className="column">
                        <h5>
                            Not Found
                        </h5>
                        <Link to="/" className="button btn_primary">
                            Mulai Belanja
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
export default CheckoutErrorContainer
    