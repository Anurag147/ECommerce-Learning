import { AppBar, Toolbar, Typography,Switch } from "@mui/material"

export interface HeaderProps{
    toggle:()=>void
}

const Header = (props:HeaderProps) => {
    return (
        <AppBar sx={{marginBottom:'20px'}} position="static">
            <Toolbar>
                <Typography variant="h6">RE-STORE</Typography>
                <Switch size="small" onClick={props.toggle}/>
            </Toolbar>
        </AppBar>
    )
}

export default Header;