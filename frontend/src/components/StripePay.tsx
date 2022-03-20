import React from "react";
import { useDispatch } from 'react-redux';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { payOrder } from '../actions/orderActions'
import { Button } from 'react-bootstrap';

interface TStripe{
    email:string,
    orderId:string
}

function StripePay({ email, orderId }:TStripe) {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      dispatch(payOrder(orderId,
        {
          id: paymentMethod.id,
          status: "COMPLETED",
          update_time: paymentMethod.created,
          payer: {
            email_address: email
          }
        }
      ));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <Button type="submit" style={{ marginTop: 15 }} disabled={!stripe}>
        Pay
            </Button>
    </form>
  );
};

export default StripePay 