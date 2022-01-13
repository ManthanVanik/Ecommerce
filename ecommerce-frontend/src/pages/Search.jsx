import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import styled from 'styled-components'
import Annoucements from '../components/Annoucements';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import Products from '../components/Products';
import  {default as Searchicon} from '@mui/icons-material/Search';
import { mobile } from '../responsive';
import {useNavigate} from "react-router-dom";

const Container = styled.div`

`;

const SearchContainer = styled.div `
    border: 1px solid lightgray;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 25px 10%;
    padding: 10px;
`

const Input = styled.input`
    border: none;
    font-size: 18px;
    ${mobile({ width: "50px"})}
    width: 80%;
    &:focus {
        outline: none;
    }
`

const Search = () => {

    const location = useLocation();
    const search = location.pathname.split("/")[2];
    let navigate = useNavigate();

    const [searchenter, setsearch] = useState()

    const handleEnter = (e) => {
        if (e.keyCode == 13) {
            navigate(`/search/${searchenter}`)
            window.location.reload(false);

         }
    }

    const send = () => {
        navigate(`/search/${search}`)
        window.location.reload(false);
    }


    return (
        <Container>
            <Navbar />
            <SearchContainer>
                <Input placeholder='Search' onChange={(e) => setsearch(e.target.value)} onKeyDown={(e) => handleEnter(e) }/>
                <Searchicon style={{ color: "gray", fontSize: 18}}  onClick={send} />
            </SearchContainer>
            <Products
                search={search}
            />
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default Search
