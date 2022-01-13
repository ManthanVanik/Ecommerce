import React, {useState} from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive';
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom"
import { register } from '../redux/apiCalls';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: #fad2e1;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Name = styled.h1`
    margin-bottom: 20px;
    font-size: 50px;
    ${mobile({ fontSize: "40px"})}
    `;

const Wrapper = styled.div`
    padding: 20px;
    width: 40%;
    background-color: white;
    ${mobile({ width: "75%"})}
    border-radius: 10px;
    border: 10px solid #bdb2ff;
    `;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 500;
    ${mobile({ fontSize: "20px"})}
    `;

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    `;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0 0;
    padding: 10px;
`;

const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin: 0 auto;
    &:disabled{
        background-color: gray;
        cursor: not-allowed;
    }
`;

const Register = () => {

    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const dispatch = useDispatch();

    const {isFetching, error} = useSelector(state => state.user)

    const handleClick = (e) => {
        e.preventDefault();
        register(dispatch, {firstname, lastname, username, email, password})
    }

    return (
        <Container>
            <Name>SHOP.</Name>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input placeholder='Fisrt Name' onChange={(e) => setfirstname(e.target.value)}/>
                    <Input placeholder='Last name' onChange={(e) => setlastname(e.target.value)}/>
                    <Input placeholder='User name' onChange={(e) => setusername(e.target.value)}/>
                    <Input placeholder='Email' onChange={(e) => setemail(e.target.value)}/>
                    <Input placeholder='Password' type="password" onChange={(e) => setpassword(e.target.value)}/>
                    <Input placeholder='Confirm password' type="password" />
                    <Agreement>
                        By creating an account, I consent to the processing of my personal
                        data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Button onClick={handleClick} disabled={isFetching}>CREATE</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Register
