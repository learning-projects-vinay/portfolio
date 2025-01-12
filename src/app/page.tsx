"use client"

import { Box, Container, Typography } from "@mui/material";
import { memo } from "react";
import dotEnv from "../config/dotEnv";

function Home() {

  console.log("dotEnv.PUBLIC_ASSET_PREFIX => ", dotEnv.PUBLIC_ASSET_PREFIX);

  return (
    <div style={{ padding: "0px", margin: "0px"} }>
      {/* First Container with Image and Name */}
      <Box
        sx={{
          height: '70vh', // 40% of the viewport height
          width: '100%',
          backgroundImage: `url("${dotEnv.APP_URL}${dotEnv.PUBLIC_ASSET_PREFIX}/images/home/background.jpg")`, // Replace with your image path
          backgroundSize: 'cover', // Ensure the image covers the container
          backgroundPosition: 'center', // Center the image
          position: 'relative', // Position the text relative to the image container
          padding: "0px",
          margin: "0px"
        }}

      >{/* Name Text aligned to left and bottom */}
        <Typography
          variant="h3"
          sx={{
            position: 'absolute',
            bottom: '10px', // Adjust to control vertical positioning
            left: '10px', // Adjust to control horizontal positioning
            color: 'white', // Text color
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Add a shadow for readability
          }}
        >
          Your Name
        </Typography>
      </Box>

      {/* Rest of the Content */}
      <Container sx={{ mt: 5 }}>
        <Typography variant="h5" align="center">
          Welcome to My Portfolio
        </Typography>
        {/* Additional Content Goes Here */}
      </Container>
    </div>
  );
}

export default memo(Home);
