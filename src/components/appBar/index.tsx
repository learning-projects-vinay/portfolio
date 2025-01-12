"use client"

import { memo } from "react"
import { Toolbar } from '@mui/material';
import { useRouter } from 'next/navigation';

import { CustomMuiAppBar, MenuNavigateButton } from "./appBar.style";


const CustomAppBar = () => {
  const router = useRouter();
    
  const navigate = (path: string): void => {
    router.push(path);
  };

    return (
        <CustomMuiAppBar>
            <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
              <MenuNavigateButton onClick={() => navigate('/')}>
                Home
              </MenuNavigateButton>
              <MenuNavigateButton onClick={() => navigate('/experience')}>
                Experience
              </MenuNavigateButton>
              <MenuNavigateButton onClick={() => navigate('/education')}>
                Education
              </MenuNavigateButton>
              <MenuNavigateButton onClick={() => navigate('/contact')}>
                Contact
              </MenuNavigateButton>
            </Toolbar>
          </CustomMuiAppBar>
    )
}

export default memo(CustomAppBar);
