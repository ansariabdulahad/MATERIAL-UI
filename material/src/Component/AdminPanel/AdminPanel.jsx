import logo from '../AdminPanel/LOGO.png';
import {
    AppBar,
    Avatar,
    Breadcrumbs,
    Collapse,
    Drawer,
    FormControlLabel,
    FormGroup,
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
    Switch,
    Toolbar,
    Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import {
    Link,
    Outlet,
    useResolvedPath,
    useMatch,
    useLocation,
    useNavigate
} from "react-router-dom";
import { deepOrange } from "@mui/material/colors";
import MediaQuery from 'react-responsive';
import {
    useDispatch,
    useSelector
} from 'react-redux';

import adminMenu from '../../Json-Api/Admin-menu.json';
import { logoutRequest } from "../Login/login.action";
import styled from '@emotion/styled';

const AdminPanel = () => {

    const [active, setActive] = useState(true);
    const [activeOnMobile, setActiveOnMobile] = useState(false);
    const [width, setWidth] = useState(250);
    const [collapse, setCollapse] = useState(false);
    const [parent, setParent] = useState(null);
    const [user, setUser] = useState(null);
    const [mode, setMode] = useState('Light');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loginReducer, adminReducer } = useSelector(response => response);
    const location = useLocation();
    const routing = location.pathname.split('/');
    const open = Boolean(parent);

    useEffect(() => {
        showUserInfo();
        checkForLogout();
    }, [user, loginReducer]);

    const darkMode = (e) => {
        if (e.target.checked) {
            dispatch({
                type: 'dark'
            })
            return setMode('Dark');
        }
        else {
            dispatch({
                type: 'light'
            })
            return setMode('Light');
        }
    }

    const checkForLogout = () => {
        if (loginReducer.isLogout) {
            dispatch({
                type: 'light'
            })
            return navigate('/login')
        }
    }

    const showUserInfo = () => {
        if (!user) {
            let userInfo = JSON.parse(sessionStorage.getItem('user'));
            return setUser(userInfo);
        }
    }

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
                        // bgcolor: '#fff',
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
                        <img src={logo} width={200} alt="brannd-logo" />
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
                        // bgcolor: '#fff',
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
                        <img src={logo} width={200} alt="brannd-logo" />
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

    const MaterialUISwitch = styled(Switch)(({ theme }) => ({
        width: 62,
        height: 34,
        padding: 7,
        '& .MuiSwitch-switchBase': {
            margin: 1,
            padding: 0,
            transform: 'translateX(6px)',
            '&.Mui-checked': {
                color: '#fff',
                transform: 'translateX(22px)',
                '& .MuiSwitch-thumb:before': {
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                        '#fff',
                    )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
                },
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
                },
            },
        },
        '& .MuiSwitch-thumb': {
            backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
            width: 32,
            height: 32,
            '&:before': {
                content: "''",
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: 0,
                top: 0,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
            },
        },
        '& .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            borderRadius: 20 / 2,
        },
    }));

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
                                    <IconButton>
                                        <span className="material-icons-outlined">email</span>
                                    </IconButton>
                                    <IconButton>
                                        <span className="material-icons-outlined">web_asset</span>
                                    </IconButton>
                                    <IconButton>
                                        <span className="material-icons-outlined">star_outline</span>
                                    </IconButton>
                                </MediaQuery>
                                <MediaQuery maxWidth={1224}>
                                    <IconButton
                                        onClick={controlDrawerOnMobile}
                                    >
                                        <span className="material-icons-outlined">menu</span>
                                    </IconButton>
                                </MediaQuery>
                            </Stack>
                        </Toolbar>
                        <Toolbar>
                            <Stack
                                direction={"row"}
                                alignItems={"center"}
                                spacing={"12px"}
                            >
                                <FormGroup sx={{ color: adminReducer.dark ? '#fff' : 'inherit' }}>
                                    <FormControlLabel control={<Switch onChange={darkMode} />} label={mode} />
                                </FormGroup>
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
                                            >person</span> {user && user.name}
                                        </ListItemIcon>
                                    </MenuItem>
                                    <MenuItem>
                                        <ListItemIcon>
                                            <span
                                                style={{ marginRight: "12px" }}
                                                className="material-icons-outlined"
                                            >email</span> {user && user.email}
                                        </ListItemIcon>
                                    </MenuItem>
                                    <MenuItem>
                                        <ListItemIcon>
                                            <span
                                                style={{ marginRight: "12px" }}
                                                className="material-icons-outlined"
                                            >phone</span> {user && user.mobile}
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
                                        <ListItemIcon
                                            onClick={() => dispatch(logoutRequest())}
                                        >
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
                        backgroundColor: adminReducer.dark ? 'inherit' : '#f5f5f5',
                        minHeight: '100vh'
                    }}
                >
                    <Breadcrumbs sx={{ my: 4 }}>
                        {
                            routing.map((item, index) => {
                                // return index > 0 ? <Link to={item != 'admin-panel' ? item : null} key={index}>{item}</Link> : null
                                return (
                                    index > 0 ? <Typography
                                        key={index}
                                        sx={{
                                            color: deepOrange[500]
                                        }}
                                    >{item}</Typography> : null
                                )
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