import { AppBar, Button, styled } from "@mui/material";

export const CustomMuiAppBar = styled(AppBar)(({ theme }) => ({
    position: "fixed",
    background: theme.palette.mode === 'light'
        ? 'rgba(244, 245, 247, 0.85)'
        : 'rgba(18, 21, 28, 0.85)',
    backdropFilter: 'blur(16px) saturate(160%)',
    WebkitBackdropFilter: 'blur(16px) saturate(160%)',
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundImage: 'none',
    [theme.breakpoints.down('md')]: {
        '& .desktop-menu': { display: 'none' },
        '& .desktop-actions': { display: 'none' },
        '& .mobile-menu': { display: 'flex' }
    },
    [theme.breakpoints.up('md')]: {
        '& .desktop-menu': { display: 'flex' },
        '& .desktop-actions': { display: 'flex' },
        '& .mobile-menu': { display: 'none' }
    }
}));

export const MenuNavigateButton = styled(Button)(({ theme }) => ({
    color: theme.palette.text.secondary,
    paddingLeft: "14px",
    paddingRight: "14px",
    fontWeight: 500,
    fontSize: '0.9rem',
    borderRadius: 8,
    '&:hover': {
        color: theme.palette.text.primary,
        background: theme.palette.mode === 'light'
            ? 'rgba(15, 23, 42, 0.04)'
            : 'rgba(148, 163, 184, 0.08)',
    }
}));
