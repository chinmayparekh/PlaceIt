import { Box, Typography } from "@mui/material";
import React from "react";

function Description({ heading, body }) {
  return (
    <Box
      sx={{
        margin: "1vh 0 1vh 0vw",
        padding: "1vh 0 1vh 0vh",
      }}
    >
      <Typography gutterBottom variant="h8" component="div">
        {heading}
      </Typography>
      <Typography variant="body3" color="text.secondary">
        {body}
      </Typography>
    </Box>
  );
}

export default Description;
