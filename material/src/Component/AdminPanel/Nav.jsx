import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

const Nav = ({ item }) => {
    const navDesign = (
        <>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <span className="material-icons">{item.icon}</span>
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                </ListItemButton>
            </ListItem>
        </>
    );
    return navDesign;
}

export default Nav;