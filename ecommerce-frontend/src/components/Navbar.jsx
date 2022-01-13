import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Search from '@mui/icons-material/Search';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Badge from '@mui/material/Badge';

import { mobile } from '../responsive';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { logout } from '../redux/userRedux';
import { getcart, login } from '../redux/apiCalls';

const Container = styled.div`
    height: 60px;
    ${mobile({ height: "50px" })}
    border-bottom: 2px solid gray;
    background-color: #cddafd;
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${mobile({ padding: "10px 0px" })}
    `
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    ${mobile({ flex: "2" })}
`
const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({ display: "none" })}
`
const SearchContainer = styled.div`
    border: 1px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
    background-color: white;
`

const Input = styled.input`
    border: none;
    ${mobile({ width: "50px" })}
    &:focus {
        outline: none;
    }
`
const Logo = styled.h1`
    font-weight: bold;
    ${mobile({ fontSize: "24px" })}
`

const Center = styled.div`
    flex: 1;
    text-align: center;
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ flex: 2, justifyContent: "end", paddingRight: "10px" })}
`

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}
    text-decoration-line: none;
`

const Navbar = () => {

    const currentUser = useSelector(state => state.user.currentUser)
    // console.log(currentUser)
    const dispatch = useDispatch();

    // useEffect(() => {
    //     getcart(dispatch, currentUser._id);
    // }, [currentUser])
    // const token = localStorage.getItem('token');
    // useEffect(() => {
    //    currentUser && getcart(dispatch, currentUser._id);
    // }, [token])

    // currentUser && token && getcart(dispatch,currentUser?._id);

    const quantity = useSelector(state => state.cart?.products?.products?.length) || 0
    // console.log(quantity)
    let navigate = useNavigate();
    const [searchenter, setsearch] = useState()

    const handleEnter = (e) => {
        if (e.keyCode == 13) {
            navigate(`/search/${searchenter}`)
        }
    }

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder='Search' onChange={(e) => setsearch(e.target.value)} onKeyDown={(e) => handleEnter(e)} />
                        <Search style={{ color: "gray", fontSize: 16 }} />
                    </SearchContainer>
                </Left>
                <Center>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <Logo>SHOP.</Logo>
                    </Link>
                </Center>
                <Right>
                    {!currentUser
                        ? <>
                            <Link to="/register" style={{ textDecorationLine: "none" }}>
                                <MenuItem>
                                    REGISTER
                                </MenuItem>
                            </Link>
                            <Link to="/login" style={{ textDecorationLine: "none" }}>
                                <MenuItem>
                                    SIGN IN
                                </MenuItem>
                            </Link>
                        </>
                        :
                        <>
                            <Link to="/user">
                                <MenuItem>
                                    <AccountCircleIcon style={{ fontSize: "30px" }} />
                                </MenuItem>
                            </Link>
                            <Link to="/cart">
                                <MenuItem>
                                    <Badge
                                        badgeContent={currentUser ? quantity : 0}
                                        color="primary">
                                        <ShoppingCartOutlined />
                                    </Badge>
                                </MenuItem>
                            </Link>
                        </>
                    }
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar
