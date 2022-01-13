import { FavoriteBorderOutlined, SearchOutlined } from '@mui/icons-material';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom';

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
`;

const Container = styled.div`
    flex: 1;
    margin: 5px;
    height: 350px;
    min-width: 280px;
    /* max-width: 300px; */
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #dfe7fd;
    flex-direction: column;
    position: relative;
    &:hover ${Info}{
        opacity: 1;
    }
`;

const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
`;

const Image = styled.img`
    height: 75%;
    z-index: 2;
`;

const Icon = styled.div`
    width: 40px;
    height: 40px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease ;

    &:hover{
        background-color: #e9f5f5;
        transform: scale(1.1);
    }
`;

const Data = styled.div`
    width: 280px;
    height: 80px;
    /* background-color: white; */
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Name = styled.p`
    font-size: 20px;
    font-weight: 500;
    text-align: center;
`;

const Price = styled.p`
    font-size: 20px;
    font-weight: 500;
    text-align: center;
`;

const Product = ({item}) => {
    return (
        <Container>
            <Image src={item.img}/>
            <Data>
                <Name>{item.title}</Name>
                <Price>Rs. {item.price}</Price>
            </Data>
            <Info>
                <Icon>
                    <Link to={`/product/${item._id}`}>
                        <SearchOutlined />
                    </Link>
                </Icon>
            </Info>
        </Container>
    )
}

export default Product
