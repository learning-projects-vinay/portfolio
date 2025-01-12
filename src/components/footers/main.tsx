import { Box, Typography } from "@mui/material"
import { memo } from "react"

const MainFooter = () => {
    return (
        <Box sx={{ mt: 5, p: 2, bgcolor: 'background.default', textAlign: 'center' }}>
            <Typography variant="body2">
                &copy; {new Date().getFullYear()} Vinay Panwar. All rights reserved.
            </Typography>
        </Box>
    )
}

export default memo(MainFooter);