import { AppBar, Button, styled } from "@mui/material";

export const CustomMuiAppBar = styled(AppBar)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    position: "fixed",
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.1)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.18)',
    transition: 'all 0.3s ease',
    '&:hover': {
        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.2)',
    },
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

export const MenuNavigateButton = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.main,
    paddingLeft: "16px",
    paddingRight: "16px",
    fontWeight: 600,
    fontSize: '0.95rem',
    position: 'relative',
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 0,
        height: '2px',
        background: 'linear-gradient(90deg, #667eea, #764ba2)',
        transition: 'width 0.3s ease',
    },
    '&:hover::after': {
        width: '80%',
    },
    '&:hover': {
        background: 'rgba(102, 126, 234, 0.08)',
    }
}));
