import {
    AppBar,
    Avatar,
    Breadcrumbs,
    Collapse,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Menu,
    MenuItem,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import { useState } from "react";
import {
    Link,
    Outlet,
    useResolvedPath,
    useMatch,
    useLocation
} from "react-router-dom";
import { deepOrange } from "@mui/material/colors";
import MediaQuery from 'react-responsive';

import adminMenu from '../../Json-Api/Admin-menu.json';

const AdminPanel = () => {

    const [active, setActive] = useState(true);
    const [activeOnMobile, setActiveOnMobile] = useState(false);
    const [width, setWidth] = useState(250);
    const [collapse, setCollapse] = useState(false);
    const [parent, setParent] = useState(null);

    const location = useLocation();
    const routing = location.pathname.split('/');
    const open = Boolean(parent);

    const openProfileMenu = (e) => {
        const el = e.currentTarget;
        return setParent(el);
    }

    const controlDrawerOnDesktop = () => {
        return (
            // setActive(!active),
            // active ? setWidth(0) : setWidth(250)
            width === 250 ? setWidth(80) : setWidth(250)
        )
    }

    const controlDrawerOnMobile = () => {
        return (
            setActiveOnMobile(!activeOnMobile),
            activeOnMobile ? setWidth(0) : setWidth(250)
            // width === 250 ? setWidth(80) : setWidth(250)
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
        const resolvedPath = useResolvedPath(menu.link ? menu.link : false);
        const activeLink = useMatch({
            path: resolvedPath.pathname,
            end: false
        });
        const navDesign = (
            <div>
                <ListItem sx={{ py: 0 }}>
                    <ListItemButton
                        LinkComponent={Link}
                        to={menu.link ? menu.link : null}
                        onClick={menu.isDropdown ? () => setCollapse(!collapse) : null}
                        sx={{
                            bgcolor: activeLink && menu.link ? deepOrange[500] : null,
                            color: activeLink && menu.link ? 'white' : null,
                            borderRadius: '10px',
                            "&:hover": {
                                bgcolor: activeLink && menu.link ? deepOrange[300] : null
                            }
                        }}
                    >
                        <ListItemIcon>
                            <span
                                className="material-icons-outlined"
                                style={{
                                    color: activeLink && menu.link ? "white" : null
                                }}
                            >{menu.icon}</span>
                        </ListItemIcon>
                        <ListItemText primary={menu.label} />
                        {
                            menu.isDropdown
                                ?
                                <span className="material-icons-outlined">expand_more</span>
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

    const DesktopDrawer = () => {
        const tmp = (
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
        );
        return tmp;
    }

    const MobileDrawer = () => {
        const tmp = (
            <Drawer
                variant="temporary"
                open={activeOnMobile}
                onClick={controlDrawerOnMobile}
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
        );
        return tmp;
    }

    const design = (
        <>
            <Stack>
                <MediaQuery minWidth={1224}>
                    <DesktopDrawer />
                </MediaQuery>
                <MediaQuery maxWidth={1224}>
                    <MobileDrawer />
                </MediaQuery>
                <AppBar
                    elevation={2}
                    position="fixed"
                    color="inherit"
                    sx={{
                        width: {
                            xs: "100%",
                            md: `calc(100% - ${width}px)`
                        },
                        transition: '0.3s'
                    }}
                >
                    <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <Toolbar>
                            <Stack
                                direction={"row"}
                                spacing={"12px"}
                            >
                                <MediaQuery minWidth={1224}>
                                    <IconButton
                                        onClick={controlDrawerOnDesktop}
                                    >
                                        <span className="material-icons-outlined">menu</span>
                                    </IconButton>
                                </MediaQuery>
                                <MediaQuery maxWidth={1224}>
                                    <IconButton
                                        onClick={controlDrawerOnMobile}
                                    >
                                        <span className="material-icons-outlined">menu</span>
                                    </IconButton>
                                </MediaQuery>
                                <IconButton>
                                    <span className="material-icons-outlined">email</span>
                                </IconButton>
                                <IconButton>
                                    <span className="material-icons-outlined">web_asset</span>
                                </IconButton>
                                <IconButton>
                                    <span className="material-icons-outlined">star_outline</span>
                                </IconButton>
                            </Stack>
                        </Toolbar>
                        <Toolbar>
                            <Stack
                                direction={"row"}
                                alignItems={"center"}
                                spacing={"12px"}
                            >
                                <IconButton>
                                    <span className="material-icons-outlined">notifications</span>
                                </IconButton>
                                <IconButton>
                                    <span className="material-icons-outlined">shopping_cart</span>
                                </IconButton>
                                <IconButton>
                                    <span className="material-icons-outlined">search</span>
                                </IconButton>
                                <IconButton
                                    onClick={openProfileMenu}
                                >
                                    <Avatar src="https://mui.com/static/images/avatar/3.jpg">A</Avatar>
                                </IconButton>
                                <Menu
                                    open={open}
                                    onClick={() => setParent(null)}
                                    anchorEl={parent}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&:before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem>
                                        <ListItemIcon>
                                            <span
                                                style={{ marginRight: "12px" }}
                                                className="material-icons-outlined"
                                            >home</span> Home
                                        </ListItemIcon>
                                    </MenuItem>
                                    <MenuItem>
                                        <ListItemIcon>
                                            <span
                                                style={{ marginRight: "12px" }}
                                                className="material-icons-outlined"
                                            >person</span> Profile
                                        </ListItemIcon>
                                    </MenuItem>
                                    <MenuItem>
                                        <ListItemIcon>
                                            <span
                                                style={{ marginRight: "12px" }}
                                                className="material-icons-outlined"
                                            >person_add</span> Add another account
                                        </ListItemIcon>
                                    </MenuItem>
                                    <MenuItem>
                                        <ListItemIcon>
                                            <span
                                                style={{ marginRight: "12px" }}
                                                className="material-icons-outlined"
                                            >settings</span> Settings
                                        </ListItemIcon>
                                    </MenuItem>
                                    <MenuItem>
                                        <ListItemIcon>
                                            <span
                                                style={{ marginRight: "12px" }}
                                                className="material-icons-outlined"
                                            >logout</span> Logout
                                        </ListItemIcon>
                                    </MenuItem>
                                </Menu>
                            </Stack>
                        </Toolbar>
                    </Stack>
                </AppBar>
                <Stack
                    sx={{
                        ml: {
                            xs: 0,
                            md: `${width}px`
                        },
                        mt: 4,
                        p: 3,
                        transition: '0.3s',
                        backgroundColor: '#f5f5f5',
                        minHeight: '100vh'
                    }}
                >
                    <Breadcrumbs sx={{ my: 4 }}>
                        {
                            routing.map((item, index) => {
                                // return index > 0 ? <Link to={item != 'admin-panel' ? item : null} key={index}>{item}</Link> : null
                                return index > 0 ? <Typography key={index}>{item}</Typography> : null
                            })
                        }
                    </Breadcrumbs>
                    <Outlet />
                </Stack>
            </Stack>
        </>
    );
    return design;
}

export default AdminPanel;