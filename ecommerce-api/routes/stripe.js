const Product = require("../models/Product");
const dotenv = require('dotenv');

const router = require("express").Router();

dotenv.config();

const Stripe = require('stripe');
const stripe = Stripe(process.env.SKEY);


router.get("/checkout-session", async(req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.id,{
        expand: ['line_items']
    });
    res.json(session);
})

router.post("/payment", async (req, res) => {

    const ids = req.body.map((item) => (item.id))

    // items from database
    const itemfromdb = await Product.find({ _id: ids })
    // console.log(itemfromdb[1])

    try {
        const session = await stripe.checkout.sessions.create({
            success_url: `${process.env.CLIENT_URL}/success?id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/cart`,
            payment_method_types: ['card'],
            line_items: req.body.map(item => {
                const storeItem = itemfromdb.find((i) => i.id === item.id);
                // console.log(storeItem.img);
                return {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: storeItem.title,
                            images: [storeItem.img], 
                            metadata : {
                                color: item.color,
                                size: item.size
                            }
                        },
                        unit_amount: storeItem.price*100,
                    },
                    quantity: item.quantity
                }
            }),
            mode: 'payment'
        });
        res.json({url: session.url})
    }
    catch (err) {
        // console.log({error : err.message});
        res.status(500).json({error : err.message});
    }
})

module.exports = router;