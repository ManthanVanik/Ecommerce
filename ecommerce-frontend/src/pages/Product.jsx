import { Add, Remove } from '@mui/icons-material';
import React from 'react'
import styled from 'styled-components'
import Annoucements from '../components/Annoucements';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import { mobile } from '../responsive';
import { useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { publicRequest } from '../requestMethods';
import { addProduct } from '../redux/cartRedux';
import { useDispatch, useSelector } from 'react-redux'; 
import { addtocart } from '../redux/apiCalls';

const Container = styled.div`

`;

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({ padding: "10px", flexDirection: "column"})}
`;

const ImgContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    ${mobile({ padding: "10px"})}
`;

const Image = styled.img`
    width: auto;
    height: 80vh;
    object-fit: cover;
    ${mobile({height: "40vh",padding: "5px"})}
`;

const Title = styled.h1`
    font-weight: 200;
`;

const Desc = styled.p`
    margin: 20px 0px;
`;

const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`;

const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    ${mobile({ width: "100%"})}
`;

const Filter = styled.div`
    display: flex;
    align-items: center;
`;

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`;

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
    margin: 0 5px;
    cursor: pointer;
`;

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`;

const FilterSizeOption = styled.option`

`;

const AddContainer = styled.div`
    display: flex;
    align-items: center;
    width: 50%;
    justify-content: space-between;
    ${mobile({ width: "100%"})}
`;

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`;

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`;

const Button = styled.button`
    padding: 15px;
    border: 2px solid black;
    background-color: white;
    cursor: pointer;
    font-weight: 500;
    &:hover {
        background-color: #f8f4f4;
    }
`;

const Product = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const [product, setproduct] = useState({});
    const [quantity, setquantity] = useState(1);
    const [color, setcolor] = useState("");
    const [size, setsize] = useState("");
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get("/products/find/" + id);
                setproduct(res.data);
            } catch {}
        };
        getProduct();
    }, [id]);

    const handleQuantity = (type) => {
        if(type === "dec"){
            quantity > 1 && setquantity(quantity - 1)
        }
        else{
            setquantity(quantity + 1)
        }
    }

    const handleClick = () => {
        const data = {
            userId: user.currentUser._id,
            products : {
                productId: product._id,
                title: product.title,
                img: product.img,
                price: product.price,
                quantity,
                color,
                size
            }
        }
        addtocart(dispatch,data);
    }

    return (
        <Container>
            <Navbar />
            {/* <Annoucements /> */}
            <Wrapper>
                <ImgContainer>
                    <Image src={product.img} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>
                    {product.desc}
                    </Desc>
                    <Price>Rs {product.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {product.color?.map((c) => (
                                <FilterColor color={c} key={c} onClick={() => setcolor(c)}/>
                            ))}
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={(e) => setsize(e.target.value)}>
                            {product.size?.map((s) => (
                                <FilterSizeOption key={s} >{s}</FilterSizeOption>
                            ))}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={() => handleQuantity("dec")} />
                            <Amount>{quantity}</Amount>
                            <Add onClick={() => handleQuantity("inc")}/>
                        </AmountContainer>
                        <Button onClick={() => {handleClick()}}>ADD TO CART</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default Product
