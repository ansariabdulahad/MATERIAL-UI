import { Collapse } from "@mui/material";
import Nav from "./Nav";

const Dropdown = ({ dMenu }) => {
    const dropdownDesign = (
        <>
            <Collapse in>
                {
                    dMenu.map((menu, index) => {
                        return <Nav key={index} menu={menu} />
                    })
                }
            </Collapse>
        </>
    );
    return dropdownDesign;
}

export default Dropdown;