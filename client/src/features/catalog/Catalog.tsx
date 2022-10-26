import { Product } from '../../app/models/Product';
import {Button} from '@mui/material';
import ProductList from './ProductList';
import { useState,useEffect } from 'react';
import agent from '../../app/api/agent';

const Catalog = () => {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(()=>{
        agent.Catalog.list().then(products=>setProducts(products));
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