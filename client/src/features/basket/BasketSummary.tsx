import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useStoreContext } from "../../app/context/StoreContext";
import { useAppSelector } from "../../app/store/store";

export default function BasketSummary() {

    const {basket} = useAppSelector(state=>state.basket);
    const [subtotal,setSubTotal] = useState(0);
    const [deliveryFee,setDeliveryFee] = useState(0);

    useEffect(()=>{
       let sb = 0; 
       basket?.items.forEach((item)=>{
        sb+=(item.quantity*item.price);
       });
       setSubTotal(sb);
       sb>10000?setDeliveryFee(500):setDeliveryFee(0);
    },[basket?.items])

    return (
        <>
            <TableContainer style={{marginTop:'20px'}} component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">${(subtotal/100).toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">${(deliveryFee/100).toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">${((subtotal + deliveryFee)/100).toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{fontStyle: 'italic'}}>*Orders over $100 qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}