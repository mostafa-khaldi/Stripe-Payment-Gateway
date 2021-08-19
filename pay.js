const Stripe = require('stripe')
const express = require('express')
const router = express.Router()

router.post('/api/v1/pay', async (req, res) => {

    const stripe = Stripe(process.env.SECRET_KEY)
    const id = req.body.id

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 100,
            currency: "eur",
            description: "first payment",
            payment_method_types: ['card'],
            payment_method: id,
            confirm: true,
            receipt_email: "mostafa.khaldi@outlook.com"
        })

        console.log(paymentIntent)

        return res.send('paid!')

    } catch (err) {
        res.send('failed')
        console.log(err)
    }

})

module.exports = router