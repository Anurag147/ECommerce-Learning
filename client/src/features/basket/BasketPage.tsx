import { TableContainer, Typography, Table, TableHead,TableRow, TableBody, TableCell, IconButton } from "@mui/material";
import Paper from '@mui/material/Paper';
import { Delete } from "@mui/icons-material";
import { useStoreContext } from "../../app/context/StoreContext";

const BasketPage = () => {
    const StoreContext = useStoreContext();
    if(!StoreContext?.basket) return <Typography variant="h3">No items in Basket</Typography>

    return (
        <>
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">SubTotal</TableCell>
                    <TableCell align="right"></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {StoreContext?.basket.items.map((item) => (
                    <TableRow
                    key={item.productId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {item.name}
                    </TableCell>
                    <TableCell align="right">${(item.price/100).toFixed(2)}</TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">${((item.price * item.quantity)/100).toFixed(2)}</TableCell>
                    <TableCell align="right">
                        <IconButton color='error'>
                            <Delete/>
                        </IconButton>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
         </TableContainer>
       </>
    )
}

export default BasketPage;