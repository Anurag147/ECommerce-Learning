import { Product } from '../../app/models/Product';
import {Button} from '@mui/material';
import ProductList from './ProductList';
import { useState,useEffect } from 'react';

const Catalog = () => {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(()=>{
        fetch('https://localhost:7023/Products')
        .then(response=>response.json())
        .then(data=>setProducts(data));
    },[]);

    const addProduct = () => {
        alert('adding product');
    }

    return (
        <>      
                <ProductList products={products}/>
                <Button sx={{marginTop:'10px',marginBottom:'10px'}} variant='contained' onClick={addProduct}>
                    Add Product
                </Button>
        </>
    )
}

export default Catalog;