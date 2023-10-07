import {
    AppBar,
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Toolbar,
} from "@mui/material";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import Nav from './Nav';
import adminMenu from '../../Json-Api/Admin-menu.json';

const AdminPanel = () => {

    const [active, setActive] = useState(true);
    const [width, setWidth] = useState(250);

    const controlDrawer = () => {
        return (
            // setActive(!active),
            // active ? setWidth(0) : setWidth(250);
            width === 250 ? setWidth(50) : setWidth(250)
        )
    }

    const design = (
        <>
            <Stack>
                <Drawer
                    variant="persistent"
                    open={active}
                    sx={{
                        width: width,
                        "& .MuiDrawer-paper": {
                            width: width,
                            bgcolor: '#f5f5f5',
                            transition: "0.3s"
                        }
                    }}
                >
                    <List>
                        {
                            adminMenu.map((item, index) => {
                                return <Nav key={index} item={item} />
                            })
                        }
                    </List>
                </Drawer>
                <AppBar
                    position="fixed"
                    color="inherit"
                    sx={{
                        width: `calc(100% - ${width}px)`,
                        transition: '0.3s'
                    }}
                >
                    <Toolbar>
                        <IconButton
                            onClick={controlDrawer}
                        >
                            <span className="material-icons">menu</span>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Stack
                    sx={{
                        ml: `${width}px`,
                        mt: 4,
                        p: 3,
                        transition: '0.3s'
                    }}
                >
                    <h1>Welcome to admin panel</h1>
                </Stack>
            </Stack>
        </>
    );
    return design;
}

export default AdminPanel;