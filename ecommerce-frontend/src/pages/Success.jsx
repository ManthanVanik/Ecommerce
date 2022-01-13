import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { deletecart } from "../redux/apiCalls";
import { userRequest } from "../requestMethods";
import { useDispatch } from 'react-redux';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import {Link} from 'react-router-dom';

const Success = () => {
  // const location = useLocation();

  // const data = location.state.stripeData;
  // const cart = location.state.cart;
  
  // var params = new URLSearchParams(window.location.search);
  // var id = params.get('id');
  // var session;
  // useEffect(() => {
    //   const createOrder = async () => {
      //     try {
        //       const res = await userRequest.get("/checkout/checkout-session?id="+id);
        //       session = res.data.line_items.data.map((item) => item.description);
        //       console.log(session)
        //     } catch {}
        //   };
        //   createOrder();
        // }, []);
        
  const [orderId, setOrderId] = useState(null);
  const currentUser = useSelector((state) => state.user.currentUser);
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch();

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          orders: cart.products.products.map((item) => ({
            ...item,
            address: currentUser.address
          }))
        });
        setOrderId(res.data._id);
      } catch { }
    };
    cart && createOrder();
  }, [cart]);

useEffect(() => {
  deletecart(dispatch, currentUser._id)
}, [orderId])

  return (
    <>
    <Navbar />
    <div
      style={{
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
      {orderId
      ? `Order has been created successfully. Your order number is ${orderId}`
      : `Successfull. Your order is being prepared...`}
      <Link to="/">
      <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
      </Link>
    </div>
    <Newsletter />
    <Footer />
    </>
  );
};

export default Success;