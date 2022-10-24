import React, { useState, useEffect } from 'react' // eslint-disable-line
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../CheckoutForm/CheckoutForm'
import Container from 'react-bootstrap/esm/Container'

const stripePromise = loadStripe('pk_test_51LulbPIqj2ZSlvPhFc2tZcwLaUNPI6AeDUVQ0suCtRgkZ0TuLXuJesW8TZDo8e5Pb8xnqNAXePovJcu99SR3rWR000zolZnAxO')

export default function CardStripe (props) {
  const { totalAmount } = props.match.params
  return (
    <Container fluid style={{ height: '100vh' }} className='d-flex justify-content-center align-items-center'>
      <Elements stripe={stripePromise}>
        <div className='container p-4'>
          <div className='row'>
            <div className='col-md-4 offset-md-4'>
              <CheckoutForm totalAmount={totalAmount} />
            </div>
          </div>
        </div>
      </Elements>
    </Container>
  )
}
