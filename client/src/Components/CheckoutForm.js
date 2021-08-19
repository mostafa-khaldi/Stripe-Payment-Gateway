import React, { useState } from 'react'
import axios from 'axios'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import LoadingScreen from './LoadingScreen';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loadingScreen, setLoadingScreen] = useState(false)

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
    const cardElementContainer = document.querySelector('.StripeElement');

    let cardElementEmpty = cardElementContainer.classList.contains('StripeElement--complete');

    if (cardElementEmpty)
      setLoadingScreen(true)

    // const clientData = await axios.get('http://localhost:8080/api/v1/me/infos')

    // const { address, email, name, phone } = clientData

    const address = {
      city: 'Biskra',
      country: 'DZ',
      line1: '12 Str Saada Ibrahim',
      line2: 'dist Ferhat',
      state: 'Biskra',
      postal_code: '07000'
    }
    const email = 'mostafa.khaldi@outlook.com'
    const name = 'Khaldi Mostafa'
    const phone = '+213774173410'

    console.log(cardElement)
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      billing_details: {
        address: {
          city: address.city,
          country: address.country,
          line1: address.line1,
          line2: address.line2,
          state: address.state,
          postal_code: address.postal_code
        },
        email,
        name,
        phone
      },
      card: cardElement,
    });

    if (error) {
      setLoadingScreen(false)
      console.log('[error]', error);
    } else {
      console.log(paymentMethod)
      axios.post('http://localhost:8080/api/v1/pay', { id: paymentMethod.id })
        .then(data => {
          console.log(data)
          window.location = '/'
        }).catch(err => {
          console.log(err)
        })
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <CardElement options={{
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
            hidePostalCode: true,
          }} />
          <button disabled={!stripe}>
            Pay Now
          </button>
        </form>
      </div>
      {loadingScreen && <LoadingScreen />}
    </>
  );
};
