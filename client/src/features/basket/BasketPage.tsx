import { Typography } from "@mui/material";
import { useState,useEffect } from "react";
import agent from "../../app/api/agent";
import { Basket } from "../../app/models/Basket";
import { LoadingButton } from '@mui/lab';

const BasketPage = () => {

    const [loading, setLoading] = useState(true);
    const [basket, setBasket] = useState<Basket|null>(null);
    
    useEffect(()=>
    {
            agent.Basket.get()
            .then((res)=>setBasket(res))
            .catch((err)=>console.log(err))
            .finally(()=>setLoading(false));
    },[])

    if(loading) return <Typography variant="h3">Loading..</Typography>
    if(!basket) return <Typography variant="h3">No items in Basket</Typography>
    return (
        <>
        <h1>Buyer Id: {basket.buyerId}</h1>
        </>
    )
}

export default BasketPage;