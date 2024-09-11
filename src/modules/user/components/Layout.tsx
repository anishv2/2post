import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Item from "../../../components/Item";
import { mainListItems } from "./sidebar/ListItem";
import useMediaQuery from "@mui/material/useMediaQuery";

const Layout = () => {
  const leftSection = useMediaQuery("(min-width:900px)");
  const rightSection = useMediaQuery("(min-width: 988px)");
  return (
    <Box sx={{ flexGrow: 1, background: "#fff" }}>
      <Grid container sx={{ my: 2 }}>
        <Grid item xs={12} md={3}>
          {leftSection && (
            <Item>
              {mainListItems}
            </Item>
          )}
        </Grid>
       <Grid item xs={12} md={ rightSection ? 7 : 9} p={2} sx={{ overflow: 'auto'}}>
        <Outlet />
        </Grid>
        {/* {rightSection && <Grid item xs={12} md={ rightSection ? 2 : 0}>
          <Item>
          {rightListItems}
          </Item>
        </Grid>} */}
      </Grid>
    </Box>
  );
};

export default Layout;
