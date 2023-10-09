import {
    AppBar,
    Box,
    Collapse,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Stack,
    Toolbar,
} from "@mui/material";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import adminMenu from '../../Json-Api/Admin-menu.json';

const AdminPanel = () => {

    const [active, setActive] = useState(true);
    const [width, setWidth] = useState(250);
    const [collapse, setCollapse] = useState(false);

    const controlDrawer = () => {
        return (
            // setActive(!active),
            // active ? setWidth(0) : setWidth(250);
            width === 250 ? setWidth(70) : setWidth(250)
        )
    }

    const MenuList = ({ item }) => {
        const menuDesign = (
            <div>
                <List
                    subheader={<ListSubheader>{item.cat}</ListSubheader>}
                >
                    {
                        item.menus.map((menu, index) => {
                            return <Nav key={index} menu={menu} />
                        })
                    }
                </List>
            </div>
        );
        return menuDesign;
    }

    const Nav = ({ menu }) => {
        const navDesign = (
            <div>
                <ListItem sx={{ py: 0 }}>
                    <ListItemButton
                        LinkComponent={Link}
                        to={menu.link ? menu.link : false}
                        onClick={menu.isDropdown ? () => setCollapse(!collapse) : null}
                    >
                        <ListItemIcon>
                            <span className="material-icons">{menu.icon}</span>
                        </ListItemIcon>
                        <ListItemText primary={menu.label} />
                        {
                            menu.isDropdown
                                ?
                                <span className="material-icons">expand_more</span>
                                :
                                null
                        }
                    </ListItemButton>
                </ListItem>
                {
                    menu.isDropdown ? <Dropdown dMenu={menu.dropdownMenu} /> : null
                }
            </div>
        );
        return navDesign;
    }

    const Dropdown = ({ dMenu }) => {
        const dropdownDesign = (
            <div>
                <Collapse
                    in={collapse}
                    sx={{
                        pl: 4
                    }}
                >
                    {
                        dMenu.map((menu, index) => {
                            return <Nav key={index} menu={menu} />
                        })
                    }
                </Collapse>
            </div>
        );
        return dropdownDesign;
    }

    const design = (
        <>
            <Stack>
                <Drawer
                    variant="persistent"
                    open={active}
                    onMouseOver={() => setWidth(250)}
                    sx={{
                        width: width,
                        "& .MuiDrawer-paper": {
                            width: width,
                            bgcolor: '#fff',
                            transition: "0.3s"
                        }
                    }}
                >
                    <List
                        subheader={<ListSubheader
                            sx={{
                                mt: 3,
                                mb: 0
                            }}
                        >
                            <img src="images/LOGO.png" width={200} alt="brannd-logo" />
                        </ListSubheader>}
                    />
                    {
                        adminMenu.map((item, index) => {
                            return <MenuList key={index} item={item} />
                        })
                    }
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
                    <Outlet />
                </Stack>
            </Stack>
        </>
    );
    return design;
}

export default AdminPanel;