import axios from 'axios';
import React, { useState, useEffect} from 'react'
import styled from 'styled-components'
import { popularProducts } from '../data';
import { publicRequest } from '../requestMethods';
import Product from './Product';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({cat, filters, sort, search}) => {
    
    const [products, setproducts] = useState([]);
    const [filteredproducts, setfilteredproducts] = useState([]);

    useEffect(() => {
        const getProducts = async () =>{
            try{
                let getlink;
                if(cat){
                    getlink = `/products?category=${cat}`
                }
                if(search){
                    getlink = `/products/search?query=${search}`
                }
                if(!cat && !search){
                    getlink = `/products/`
                }
                const res = await publicRequest.get(getlink);
                setproducts(res.data);
            }
            catch(err){
                
            }
        }
        getProducts();
    }, [cat])

    useEffect(() => {
        cat && setfilteredproducts(
           products.filter(item => Object.entries(filters).every(([key,value]) => 
            item[key].includes(value)
           )
        )
        );
    }, [products ,cat, filters]);

    useEffect(() => {
        if(sort === "newest"){
            setfilteredproducts((prev) => 
                [...prev].sort((a,b) => a.createdAt - b.createdAt)
            )
        }
        else if(sort === "asc"){
            setfilteredproducts((prev) => 
                [...prev].sort((a,b) => a.price - b.price)
            )
        }
        else{
            setfilteredproducts((prev) => 
                [...prev].sort((a,b) => b.price - a.price)
            )
        }
    }, [sort])

    return (
        <Container>
            {cat ? filteredproducts.map((item) => (
                <Product item={item} key={item.id}/>
             ))
            :search ? products.map((item) => (
                <Product item={item} key={item.id}/>
             ))
            :products.slice(0,8).map((item) => (
                <Product item={item} key={item.id}/>
             ))
            }
        </Container>
    )
}

export default Products
