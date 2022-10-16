import {Grid} from '@mui/material';
import { Product } from '../../app/models/Product';
import ProductCard from './ProductCard';


export interface ProductListProps { 
    products: Product[];
}

const ProductList = (props:ProductListProps) => {
    return (
        <Grid container spacing={3}>
                {props.products.map((product:Product)=>{
                    return (
                    <Grid key={product.id} item xs={3}>
                        <ProductCard key={product.id} product={product}/>
                    </Grid>
                    )
                })}
        </Grid>
    )
}

export default ProductList;