import { Avatar,CardHeader,Card,CardMedia,Typography,CardContent,CardActions,Button } from '@mui/material';
import { Product } from '../../app/models/Product';

export interface ProductCardProps {
    product:Product;
}
const ProductCard = (props:ProductCardProps) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
            avatar={
                <Avatar sx={{bgcolor:'secondary.main'}}>
                    {props.product.name.charAt(0).toUpperCase()}
                </Avatar>
            }
            title={props.product.name}
            titleTypographyProps={{
                sx:{fontWeight:'bold',color:'primary.main'}
            }}
            />
            <CardMedia
            component="img"
            sx={{height:260,backgroundSize:'contained',bgcolor:'primary.light'}}
            image={props.product.pictureUrl}
            alt= {props.product.name}
            />
            <CardContent>
                <Typography gutterBottom color='secondary' variant="h5">
                    ${((props.product.price)/100).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.product.brand} / {props.product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Add to Cart</Button>
                <Button size="small">View</Button>
                </CardActions>
        </Card>
    )
}

export default ProductCard;