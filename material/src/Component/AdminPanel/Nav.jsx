import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Dropdown from "./Dropdown";

const Nav = ({ menu }) => {
    const navDesign = (
        <>
            <ListItem sx={{ py: 0 }}>
                <ListItemButton>
                    <ListItemIcon>
                        <span className="material-icons">{menu.icon}</span>
                    </ListItemIcon>
                    <ListItemText primary={menu.label} />
                </ListItemButton>
            </ListItem>
            {
                menu.isDropdown ? <Dropdown dMenu={menu.dropdownMenu} /> : null
            }
        </>
    );
    return navDesign;
}

export default Nav;