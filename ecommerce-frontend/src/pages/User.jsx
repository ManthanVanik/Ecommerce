import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';
import Annoucements from '../components/Annoucements';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { clearcart, login, logout, logoutuser, updateaddress, updatepassword, updateuser } from '../redux/apiCalls';
import { clearProduct } from '../redux/cartRedux';
import { userRequest } from '../requestMethods';
import { mobile } from '../responsive';

const Container = styled.div`
    box-sizing: border-box;
`;

const Wrapper = styled.div`
    padding: 20px;
`;

const Logout = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 10px 0;
    ${mobile({ justifyContent: "center"})}
    `;

const Button = styled.button`
width: 200px;
padding: 10px;
background-color: black;
color: white;
font-weight: 600;
margin-right: 50px;
${mobile({ marginRight: "0"})}
`;

const Title = styled.h1`
    font-weight: 300;
    margin: 10px 0;
`;

const Information = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    width: 70%;
    ${mobile({width: "95%"})}
`;

const Input = styled.input`
    flex: 1;
    min-width: 70%;
    margin: 10px 0 0;
    padding: 10px;
    font-weight: 800;
    font-size: 15px;
    ${mobile({margin:"5px 0"})}
`;

const Label = styled.span`
    flex: 1;
    min-width: 20%;
    margin: 10px 0;
    padding: 10px;
    ${mobile({margin:"5px 0", padding:"5px"})}
`;
const Buttonupdate = styled.button`
    flex: 1;
    max-width: 200px;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
    margin: 10px 10px;
    ${mobile({margin: "10px 0", width:"100px"})}
`;

const Orders = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Order = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid gray;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
    width: 80%;
    ${mobile({width: "95%", flexDirection: "column"})}
`;

const Product = styled.div`
    display: flex;
    flex: 1;
    `;

const Image = styled.img`
    height: 80px;
    width: 80px;
    padding: 10px;
    `;

const ProductDetail = styled.div`
    padding: 10px;
    font-size: 15px;
`;

const Address = styled.div`
    width: 100%;
    flex: 1;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${mobile({justifyContent:"left"})}
`;

const AddressContent = styled.div`
    flex: 1;
`;

const Status = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
`;
const StatusButton = styled.button`
    width: 100px;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
    margin: 10px 10px;
    border-radius: 10px;
`;

const User = () => {
    const token = localStorage.getItem('token');
    // console.log(token);

    const [firstname, setfirstname] = useState("")
    const [lastname, setlastname] = useState("")
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [oldpassword, setoldpassword] = useState("")
    const [newpassword, setnewpassword] = useState("")
    const [house, sethouse] = useState("")
    const [area, setarea] = useState("")
    const [landmark, setlandmark] = useState("")
    const [city, setcity] = useState("")
    const [state, setstate] = useState("")
    const [pincode, setpincode] = useState("")

    const dispatch = useDispatch();

    const logout = () => {
        // dispatch(clearProduct());
        clearcart(dispatch);
        logoutuser(dispatch);
        // dispatch(logout());
    }
    const user = useSelector(state => state.user);
    // console.log(user);
    const userid = user.currentUser._id;

    const handleuserupdate = (e) => {
        e.preventDefault();
        var fn, ln, un, em;
        firstname === '' ? fn = user.currentUser.firstname : fn = firstname;
        lastname === '' ? ln = user.currentUser.lastname : ln = lastname;
        username === '' ? un = user.currentUser.username : un = username;
        email === '' ? em = user.currentUser.email : em = email;
        updateuser(dispatch, userid, { firstname: fn, lastname: ln, username: un, email: em })
    }

    const handleaddressupdate = (e) => {
        e.preventDefault();
        var h, a, c, l, s, p;
        house === '' ? h = user.currentUser.address.house : h = house;
        area === '' ? a = user.currentUser.address.area : a = area;
        city === '' ? c = user.currentUser.address.city : c = city;
        landmark === '' ? l = user.currentUser.address.landmark : l = landmark;
        state === '' ? s = user.currentUser.address.state : s = state;
        pincode === '' ? p = user.currentUser.address.pincode : p = pincode;
        updateaddress(dispatch, userid, { house: h, area: a, landmark: l, city: c, state: s, pincode: p });
    }

    const handlepasswordupdate = (e) => {
        e.preventDefault();
        updatepassword(dispatch, userid, { oldpassword, newpassword })
    }

    const [order, setorder] = useState()

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await userRequest.get(`/orders/find/${user.currentUser._id}`);
                setorder(res.data);
            }
            catch (err) { }
        }
        getOrders();
    }, [])

    // console.log(order?.userId);

    return (
        <Container>
            <Navbar />
            <Wrapper>
                <Logout>
                    <Button onClick={logout}>LOGOUT</Button>
                </Logout>
                <Title>Information</Title>
                <Information>
                    <Form>
                        <Label>First Name:</Label>
                        <Input placeholder='First Name' defaultValue={user.currentUser.firstname} onChange={(e) => setfirstname(e.target.value)}></Input>
                        <Label>Last Name:</Label>
                        <Input placeholder='Last Name' defaultValue={user.currentUser.lastname} onChange={(e) => setlastname(e.target.value)}></Input>
                        <Label>Username:</Label>
                        <Input placeholder='Username' defaultValue={user.currentUser.username} onChange={(e) => setusername(e.target.value)}></Input>
                        <Label>Email Id:</Label>
                        <Input placeholder='Email' defaultValue={user.currentUser.email} onChange={(e) => setemail(e.target.value)}></Input>
                        <Label>Password</Label>
                        <Input placeholder='Old Password' onChange={(e) => setoldpassword(e.target.value)}></Input>
                        <Label></Label>
                        <Input placeholder='New Password' onChange={(e) => setnewpassword(e.target.value)}></Input>
                        <Buttonupdate style={{ alignSelf: "center" }} onClick={handleuserupdate}>UPDATE</Buttonupdate>
                    </Form>
                </Information>
                <Title>Update Password</Title>
                <Information>
                    <Form>
                        <Label>Password</Label>
                        <Input placeholder='Old Password' onChange={(e) => setoldpassword(e.target.value)}></Input>
                        <Label></Label>
                        <Input placeholder='New Password' onChange={(e) => setnewpassword(e.target.value)}></Input>
                        <Buttonupdate style={{ alignSelf: "center" }} onClick={handlepasswordupdate}>UPDATE</Buttonupdate>
                    </Form>
                </Information>
                <Title>Address</Title>
                <Information>
                    <Form>
                        <Label>Address</Label>
                        <Input placeholder='House No, Society name' defaultValue={user.currentUser.address.house} onChange={(e) => sethouse(e.target.value)}></Input>
                        <Label>Area:</Label>
                        <Input placeholder='Area' defaultValue={user.currentUser.address.area} onChange={(e) => setarea(e.target.value)}></Input>
                        <Label>Landmark:</Label>
                        <Input placeholder='Landmark' defaultValue={user.currentUser.address.landmark} onChange={(e) => setlandmark(e.target.value)}></Input>
                        <Label>City:</Label>
                        <Input placeholder='city' defaultValue={user.currentUser.address.city} onChange={(e) => setcity(e.target.value)}></Input>
                        <Label>State:</Label>
                        <Input placeholder='State' defaultValue={user.currentUser.address.state} onChange={(e) => setstate(e.target.value)}></Input>
                        <Label>Pin code:</Label>
                        <Input placeholder='Pin code' defaultValue={user.currentUser.address.pincode} onChange={(e) => setpincode(e.target.value)}></Input>
                        <Buttonupdate style={{ alignSelf: "center" }} onClick={handleaddressupdate}>UPDATE</Buttonupdate>
                    </Form>
                </Information>
                <Title>Orders</Title>
                {order &&
                    <Orders>
                        {order[0].orders.map((item) => (
                            <Order>
                                <Product>
                                    <Image src={item.img}></Image>
                                    <ProductDetail>
                                        <p style={{fontWeight: "700", margin:"5px"}}>{item.title}</p>
                                        <p style={{margin:"5px"}}>{item.color} {item.size}</p>
                                        <p style={{margin:"5px"}}>Quantity: {item.quantity}</p>
                                        <p style={{margin:"5px"}}>Amount: {item.price * item.quantity} Rs</p>
                                        <p style={{fontWeight: "700", margin:"5px"}}>Order Id: #{item._id}</p>
                                        <p style={{fontWeight: "700", margin:"5px"}}>Date: {item.date_added}</p>
                                    </ProductDetail>
                                </Product>
                                <Address>
                                    <AddressContent>
                                    <p style={{fontWeight: "700", margin:"5px"}}>Address:</p>
                                    <p style={{margin:"5px"}}>{item.address.house}</p>
                                    <p style={{margin:"5px"}}>{item.address.area}</p>
                                    <p style={{margin:"5px"}}>{item.address.landmark}</p>
                                    <p style={{margin:"5px"}}>{item.address.city}, {item.address.state}</p>
                                    <p style={{margin:"5px"}}>{item.address.pincode}</p>
                                    </AddressContent>
                                    <Status>
                                        <p>Status: {item.status}</p>
                                        <StatusButton>Cancle</StatusButton>
                                    </Status>
                                </Address>
                            </Order>
                        ))}
                    </Orders>
                }
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default User
