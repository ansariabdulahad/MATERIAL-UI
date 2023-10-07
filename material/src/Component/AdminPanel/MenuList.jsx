import { List, ListSubheader } from "@mui/material";
import Nav from "./Nav";

const MenuList = ({ item }) => {
    const menuDesign = (
        <>
            <List
                subheader={<ListSubheader>{item.cat}</ListSubheader>}
            >
                {
                    item.menus.map((menu, index) => {
                        return <Nav key={index} menu={menu} />
                    })
                }
            </List>
        </>
    );
    return menuDesign;
}

export default MenuList;