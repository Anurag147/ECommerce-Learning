import { TableContainer, Typography, Table, TableHead,TableRow, TableBody, TableCell, IconButton, Box, Grid, Button } from "@mui/material";
import Paper from '@mui/material/Paper';
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../app/context/StoreContext";
import agent from "../../app/api/agent";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { addBasketItemAsync, removeBasketItemAsync} from "./BasketSlice";

const BasketPage = () => {
    const {basket} = useAppSelector(state=>state.basket);
    const dispatch = useAppDispatch(); 

    if(!basket) return <Typography variant="h3">No items in Basket</Typography>

    return (
        <>
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="right">SubTotal</TableCell>
                    <TableCell align="right"></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {basket.items.map((item) =>(
                    <TableRow
                    key={item.productId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        <Box display="flex" alignItems="center">
                            <img src={item.pictureUrl} alt={item.name} style={{height:50, marginRight:20}}/>
                            <span>{item.name}</span>
                        </Box>
                    </TableCell>
                    <TableCell align="right">${(item.price/100).toFixed(2)}</TableCell>
                    <TableCell align="center">
                        <IconButton onClick={()=>dispatch(removeBasketItemAsync({productId:item.productId, quantity:1}))} color="error">
                            <Remove/>
                        </IconButton>
                        {item.quantity}
                        <IconButton onClick={()=>dispatch(addBasketItemAsync({productId:item.productId, quantity:1}))} color="error">
                            <Add/>
                        </IconButton>
                    </TableCell>
                    <TableCell align="right">${((item.price * item.quantity)/100).toFixed(2)}</TableCell>
                    <TableCell align="right">
                        <IconButton onClick={()=>dispatch(removeBasketItemAsync({productId:item.productId, quantity:item.quantity}))} color='error'>
                            <Delete/>
                        </IconButton>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
         </TableContainer>
         <Grid container>
            <Grid item xs = {6}/>
            <Grid item xs = {6}>
                <BasketSummary/>
                <Button fullWidth style={{marginTop:'10px'}} component={Link} to={`/checkout`} variant="contained">Checkout</Button>
            </Grid>
         </Grid>
       </>
    )
}

export default BasketPage;