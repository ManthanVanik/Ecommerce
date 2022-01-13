import React, { useState } from 'react'
import styled from 'styled-components'
import { getcart, login } from '../redux/apiCalls';
import { mobile } from '../responsive';
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom"

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: #fad2e1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Name = styled.h1`
    margin-bottom: 20px;
    font-size: 50px;
    ${mobile({ fontSize: "40px"})}
    `;

const Wrapper = styled.div`
    padding: 20px;
    width: 25%;
    background-color: white;
    ${mobile({ width: "75%"})};
    border-radius: 10px;
    border: 10px solid #bdb2ff;
`;

const Title = styled.h1`
     font-size: 24px;
    font-weight: 500;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0 ;
    padding: 10px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin: 0 auto;
    margin-bottom: 10px;
    &:disabled{
        background-color: gray;
        cursor: not-allowed;
    }
`;

const Error = styled.span`
  color:red;  
`;

const Login = () => {

    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const dispatch = useDispatch();

    const {isFetching, error} = useSelector(state => state.user)

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, {username, password})
    }


    return (
            <Container>
            <Name>SHOP.</Name>
                <Wrapper>
                    <Title>SIGN IN</Title>
                    <Form>
                        <Input placeholder='Username' onChange={(e) => setusername(e.target.value)}/>
                        <Input placeholder='Password' type="password" onChange={(e) => setpassword(e.target.value)}/>
                        <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
                        {error && <Error>Something went wrong...</Error>}
                        <Link to="/register" style={{fontSize: "12px", cursor: "pointer", margin: "5px 0"}}>DO NOT YOU REMEMBER THE PASSWORD?</Link>
                        <Link to="/register" style={{fontSize: "12px", cursor: "pointer", margin: "5px 0"}}>CREATE A NEW ACCOUNT</Link>
                    </Form>
                </Wrapper>
            </Container>
    )
}

export default Login
