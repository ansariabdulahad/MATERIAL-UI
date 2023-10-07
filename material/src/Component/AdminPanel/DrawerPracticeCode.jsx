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
import {
    Dashboard,
    Login,
    Logout,
    Menu
} from '@mui/icons-material';
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const AdminPanel = () => {

    const [active, setActive] = useState(false);

    const design = (
        <>
            <Drawer open={active} onClick={() => setActive(!active)}>
                <Box
                    sx={{
                        width: 250
                    }}
                >
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton LinkComponent={Link} to={'dashboard'}>
                                <ListItemIcon>
                                    <Dashboard />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton LinkComponent={Link} to={'login'}>
                                <ListItemIcon>
                                    <Login />
                                </ListItemIcon>
                                <ListItemText primary="Login" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Stack>
                <AppBar position="static" sx={{ background: 'white' }}>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                        <Toolbar>
                            <IconButton onClick={() => setActive(!active)}>
                                <Menu />
                            </IconButton>
                        </Toolbar>
                        <Toolbar>
                            <IconButton>
                                <Logout />
                            </IconButton>
                        </Toolbar>
                    </Stack>
                </AppBar>
                <Box sx={{ p: 3 }}>
                    <Outlet />
                </Box>
            </Stack>
        </>
    );
    return design;
}

export default AdminPanel;