import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Toolbar, Typography,Switch,List,ListItem, IconButton, Badge,Box } from "@mui/material"
import { NavLink } from "react-router-dom";

export interface HeaderProps{
    toggle:()=>void
}

const midLinks = [
    {
        title:'catalog',
        path:'/catalog'
    },
    {
        title:'about',
        path:'/about'
    },
    {
        title:'contact',
        path:'/contact'
    },

];

const rightLinks = [
    {
        title:'login',
        path:'/login'
    },
    {
        title:'register',
        path:'/register'
    },
];

const Header = (props:HeaderProps) => {
    return (
        <AppBar sx={{marginBottom:'20px'}} position="static">
            <Toolbar sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <Box sx={{display:'flex',alignItems:'center'}}>
                    <Typography component={NavLink} to="/" variant="h6" sx={{color:'inherit',textDecoration:'none'}}>
                        RE-STORE
                    </Typography>
                    <Switch size="small" onClick={props.toggle}/>
                </Box>
                <List sx={{display:'flex'}}>
                    {midLinks.map((link)=>{
                        return (
                            <>
                                <ListItem 
                                component={NavLink}
                                exact
                                to={link.path}
                                key={link.path}
                                sx=
                                    {
                                        {
                                            color:'inherit',
                                            typography:'h6',
                                            '&:hover':{
                                                color:'grey.500'
                                            },
                                            '&.active':{
                                                color:'text.secondary'
                                            }
                                        }
                                    }
                                >
                                    {link.title.toUpperCase()}
                                </ListItem>
                            </>
                        )
                    })}
                </List>
                <Box sx={{display:'flex',alignItems:'center'}}>
                <IconButton size="large" sx={{color:'inherit'}}>
                    <Badge badgeContent={4} color='secondary'>
                        <ShoppingCart/>
                    </Badge>
                </IconButton>
                <List sx={{display:'flex'}}>
                    {rightLinks.map((link)=>{
                        return (
                            <>
                                <ListItem 
                                component={NavLink}
                                to={link.path}
                                key={link.path}
                                sx=
                                    {
                                        {
                                            color:'inherit',
                                            typography:'h6',
                                            '&:hover':{
                                                color:'grey.500'
                                            },
                                            '&.active':{
                                                color:'text.secondary'
                                            }
                                        }
                                    }
                                >
                                    {link.title.toUpperCase()}
                                </ListItem>
                            </>
                        )
                    })}
                </List>
            </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header;