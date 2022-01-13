import { Send } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive';

const Container = styled.div`
    height: 60vh;
    background-color: #e2ece9;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    ${mobile({height: "50vh"})}
`;

const Title = styled.h1`
    font-size: 70px;
    margin-bottom: 20px;
    ${mobile({fontSize: "40px"})}
`;

const Description = styled.div`
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 20px;
    ${mobile({ textAlign: "center", fontSize:"18px"})}
`;

const InputContainer = styled.div`
    width: 50%;
    height: 40px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    border: 1 solid lightgrey;
    ${mobile({ width: "80%"})}
`;

const Button = styled.button`
    flex: 1;
    border: none;
    background-color: #bdb2ff;
    color: white;
`;

const Input = styled.input`
    border: none;
    flex: 8;
    padding-left:20px;
`;

const Newsletter = () => {
    return (
        <Container>
            <Title>Newsletter</Title>
            <Description>Get timely updates from your favorite products</Description>
            <InputContainer>
                <Input placeholder='Your email'></Input>
                <Button>
                    <Send />
                </Button>
            </InputContainer>
        </Container>
    )
}

export default Newsletter
