import { AppBar, Button, styled } from "@mui/material";

export const CustomMuiAppBar = styled(AppBar)(() => ({
    display: "flex",
    justifyContent: "center",
    position: "fixed",
    backgroundColor: "#2f5597"
}))

export const MenuNavigateButton = styled(Button)(() => ({
    color: "inherit",
    paddingLeft: "10px",
    paddingRight: "10px"
}))
