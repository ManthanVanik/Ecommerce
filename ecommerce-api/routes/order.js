const Order = require("../models/Order");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

// CREATE
router.post("/", verifyToken, async (req, res) => {
  const userid = req.body.userId;
  try {
    const order = await Order.findOne({userId: userid});
    if (order) {
      req.body.orders.forEach(e => {
        order.orders.push(e)
      });
      const returnorder = await order.save();
      // console.log(returnorder);
      return res.status(201).json(returnorder);
    }
    else {
      // // no cart exists, create one
      const newOrder = await Order.create({
        userId: req.body.userId,
        orders: req.body.orders,
      });
      // const savedCart = await newCart.save();
      // console.log(newOrder)
      res.status(201).send(newOrder)
    }
  }
  catch (err) {
    // console.log({error : err.message});
    res.status(500).json({ Error: err.message });
  }
})

// get user orders
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id })
    res.status(200).json(orders);
  }
  catch (err) {
    // console.log({Error: err.message})
    res.status(500).json(err);
  }
});

// update
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
      $set: req.body
    },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id)
    res.status(200).json("Order has been deleted...")
  }
  catch (err) {
    res.status(500).json(err);
  }
});


// get all ordres
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  }
  catch (err) {
    res.status(500).json(err);
  }
})

// get monthly income
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(date.setMonth(date.getMonth() - 2));
  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount"
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router