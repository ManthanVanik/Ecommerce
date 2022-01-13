const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

// CREATE
router.post("/", verifyToken, async (req, res) => {
    // const newCart = new Cart(req.body);
    const userid = req.body.userId;
    const cart_item = req.body.products.productId;
    // console.log(req.body.products.productId);

    try {
        const cart = await Cart.findOne({userId: userid});
        // console.log(cart)
        // console.log(cart.products.productId);
        if (cart) {
            // console.log("exist called")
            const exist = cart.products.findIndex((item) => item.productId === cart_item);
            if (exist === -1) {
                // console.log("exist called")
                cart.products.push(req.body.products);
            }
            else {
                return res.status(404).send('Item already exist');
            }
            cart.bill += req.body.products.quantity * req.body.products.price;
            // console.log(cart.bill);
            const returncart = await cart.save();
            return res.status(201).json(returncart);
        }
        else {
            // console.log("not exist called")
            // no cart exists, create one
            const newCart = await Cart.create({
                userId: req.body.userId,
                products : req.body.products,
                bill: req.body.products.quantity * req.body.products.price
            });
            // const savedCart = await newCart.save();
            res.status(201).send(newCart)
        }
    }
    catch (err) {
        // console.log({Error: err.message})
        res.status(500).json(err);
    }
})

// update
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    const quantity= req.body.quantity;
    const productId= req.body.id;
    const userId = req.params.id;
    try {
        const cart = await Cart.findOne({userId:userId});
        if (cart) {
            const exist = cart.products.findIndex((item) => item.productId === productId);
            if (exist === -1) {
                return res.status(404).send('Item dont exist');
            }
            else {
                cart.bill -= (cart.products[exist].quantity * cart.products[exist].price)
                let productItem = cart.products[exist];
                productItem.quantity = quantity;
                cart.products[exist] = productItem;
                cart.bill += cart.products[exist].price * quantity;
            }
            const returncart = await cart.save();
            return res.status(201).json(returncart);
        }
        else {
            // no cart exists, create one
            return res.status(404).send('cart dont exist');
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// delete
router.delete("/:id/:productid", verifyTokenAndAuthorization, async (req, res) => {
    const productId= req.params.productid;
    const userId = req.params.id;
    try {
        const cart = await Cart.findOne({userId:userId});
        const index = cart.products.findIndex((item) => item.productId === productId);
        if(index > -1)
        {
            let productItem = cart.products[index];
            cart.bill -= productItem.quantity*productItem.price;
            cart.products.splice(index,1);
        }
        const returncart = await cart.save();
        return res.status(201).json(returncart);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      await Cart.findOneAndDelete({userId:req.params.id});
      res.status(200).json("Cart has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });

// get
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.id })
        // console.log(cart)
        res.status(200).json(cart);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// get all
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router