import { AppBar, Button, styled } from "@mui/material";

export const CustomMuiAppBar = styled(AppBar)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    position: "fixed",
    backgroundColor: "#2f5597",
    [theme.breakpoints.down('md')]: {
        '& .desktop-menu': {
            display: 'none'
        },
        '& .mobile-menu': {
            display: 'flex'
        }
    },
    [theme.breakpoints.up('md')]: {
        '& .desktop-menu': {
            display: 'flex'
        },
        '& .mobile-menu': {
            display: 'none'
        }
    }
}));

export const MenuNavigateButton = styled(Button)(() => ({
    color: "inherit",
    paddingLeft: "10px",
    paddingRight: "10px"
}));
