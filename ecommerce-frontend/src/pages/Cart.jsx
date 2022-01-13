import { useState, useEffect } from 'react'
import { Add, Remove } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'
import Annoucements from '../components/Annoucements'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { mobile } from '../responsive'
import { useSelector } from "react-redux";
// import { userRequest } from '../requestMethods'
import { useDispatch } from 'react-redux';
import { updateProduct } from '../redux/cartRedux';
import { publicRequest, userRequest } from '../requestMethods'
import { deletefromcart, getcart, updatecart } from '../redux/apiCalls'
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom"

const Container = styled.div`

`;

const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
    font-weight: 100;
    text-align: center;
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props => props.type === "filled" && "none"};
    background-color: ${props => props.type === "filled" ? "black" : "transparent"};
    color: ${props => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
   ${mobile({ display: "none" })}
`;

const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0 10px;
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
    flex: 3;
`;

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
    `;

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
    ${mobile({alignItems:"center", flexDirection:"column"})}
`;

const Image = styled.img`
    width: 200px;
`;

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const ProductName = styled.span`

`;

const ProductId = styled.span`

`;

const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
`;

const ProductSize = styled.span`

`;

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    ${mobile({flexDirection: "row", alignItems:"center", justifyContent:"space-around"})}
`;

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    ${mobile({marginBottom: "0"})}
`;

const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
`;

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`;

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 0%;
    /* overflow: hidden; */
`;

const SummaryTitle = styled.h1`
    font-weight: 200;
`;

const SummaryItem = styled.div`
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    font-weight: ${props => props.type === "total" && "500"};
    font-size: ${props => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
    &:disabled{
        background-color: gray;
        cursor: not-allowed;
    }
`;

// const KEY = process.env.REACT_APP_STRIPE;

const Cart = () => {

    const dispatch = useDispatch();
    
    const user = useSelector(state => state.user);
    
    const cart = useSelector(state => state.cart)
    // console.log(cart);

    // const pro = cart.products.products.map((item) => ({
    //     ...item,
    //     address: user.currentUser.address
    //   }))
    //   console.log(pro);

    const data = cart?.products?.products?.map((a) => ({id:a.productId,quantity:a.quantity,color:a.color,size:a.size}))
    // console.log(data)
    
    // const [response, setresponse] = useState()
    // console.log(response);

    const address = user.currentUser.address;
    var isaddress;
    if(address.house && address.city && address.area && address.pincode && address.state){
        // console.log("Address");
        isaddress=true
    }
    else{
        // console.log("no address");
        isaddress=false
    }


    const makeRequest = async () => {
        try {
            const res = await publicRequest.post("/checkout/payment",data);
            // setresponse(res);
            // console.log(res);
            window.location = res.data.url
        }
        catch (err) {
            console.log(err);
        }
    };

const handleQuantity = (e, type, quantity, id) => {
    // console.log("quantity callled")
    if (type === "dec") {
        quantity > 1 && (quantity = quantity - 1)
        updatecart(dispatch, user.currentUser._id, { quantity, id })
    }
    else {
        quantity = quantity + 1
        updatecart(dispatch, user.currentUser._id, { quantity, id })
    }
}

const handleDelete = (e,id) => {
    // console.log("delete callled")
    deletefromcart(dispatch, user.currentUser._id, id)
}

useEffect(() => {
    getcart(dispatch, user.currentUser._id);
}, [])

return (
    cart && <Container>
        <Navbar />
        {/* <Annoucements /> */}
        <Wrapper>
            <Title>YOUR BAG</Title>
            <Top>
                <Link to="/"><TopButton>CONTINUE SHOPPING</TopButton></Link>
                <TopButton type='filled'>CHECKOUT NOW</TopButton>
            </Top>
            <Bottom>
                <Info>
                    {cart?.products?.products?.map(product => (
                        <>
                            <Product>
                                <ProductDetail>
                                    <Image src={product.img} />
                                    <Details>
                                        <ProductName>
                                            <b>Product:</b> {product.title}
                                        </ProductName>
                                        <ProductId>
                                            <b>ID:</b> {product.productId}
                                        </ProductId>
                                        <ProductColor color={product.color} />
                                        <ProductSize>
                                            <b>Size:</b> {product.size}
                                        </ProductSize>
                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    <DeleteIcon style={{ margin: "10px" }} onClick={(e) => handleDelete(e, product.productId)} />
                                    <ProductAmountContainer>
                                        <Remove onClick={(e) => handleQuantity(e,"dec", product.quantity, product.productId)} />
                                        <ProductAmount>{product.quantity}</ProductAmount>
                                        <Add onClick={(e) => handleQuantity(e,"inc", product.quantity, product.productId)} />
                                    </ProductAmountContainer>
                                    <ProductPrice>Rs. {product.price * product.quantity}</ProductPrice>
                                </PriceDetail>
                            </Product>
                            <Hr />
                        </>
                    ))}
                </Info>
                <Summary>
                    <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>Subtotal</SummaryItemText>
                        <SummaryItemPrice>Rs. {cart?.products?.bill}</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Estimated Shipping</SummaryItemText>
                        <SummaryItemPrice>Rs. 50</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Shipping Discount</SummaryItemText>
                        <SummaryItemPrice>Rs. -50</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem type="total">
                        <SummaryItemText>Total</SummaryItemText>
                        <SummaryItemPrice>Rs. {cart?.products?.bill}</SummaryItemPrice>
                    </SummaryItem>
                    <Button onClick={makeRequest} disabled={!isaddress}>CHECKOUT NOW</Button>
                    {!isaddress && <p style={{color: "red", marginTop: "10px"}}>Please complete address from profile option.</p>}
                </Summary>
            </Bottom>
        </Wrapper>
        <Footer />
    </Container>
)
}

export default Cart
