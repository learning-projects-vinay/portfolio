import { AppBar, Button, styled } from "@mui/material";

export const CustomMuiAppBar = styled(AppBar)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    position: "fixed",
    background: theme.palette.mode === 'light' 
        ? 'rgba(255, 255, 255, 0.85)'
        : 'rgba(15, 15, 35, 0.85)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    boxShadow: theme.palette.mode === 'light'
        ? '0 8px 32px rgba(102, 126, 234, 0.1)'
        : '0 8px 32px rgba(0, 0, 0, 0.3)',
    borderBottom: theme.palette.mode === 'light'
        ? '1px solid rgba(255, 255, 255, 0.18)'
        : '1px solid rgba(255, 255, 255, 0.08)',
    transition: 'all 0.3s ease',
    '&:hover': {
        boxShadow: theme.palette.mode === 'light'
            ? '0 8px 32px rgba(102, 126, 234, 0.2)'
            : '0 8px 32px rgba(102, 126, 234, 0.15)',
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
    color: theme.palette.mode === 'light' 
        ? theme.palette.primary.main 
        : theme.palette.text.primary,
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
        background: theme.palette.mode === 'light'
            ? 'rgba(102, 126, 234, 0.08)'
            : 'rgba(102, 126, 234, 0.15)',
    }
}));
