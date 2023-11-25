import React from "react";
import { Avatar, Box, Chip, Stack } from "@mui/material";

function DisplaySelectedJobHeader({ companyName, jobRole, chipColor, status }) {
  return (
    <Stack direction="row">
      <Box
        sx={{
          width: "20%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Solid_grey.svg/2048px-Solid_grey.svg.png" />
      </Box>
      <Box sx={{ width: "60%" }}>
        <p
          style={{
            margin: "1vh 0 0 0",
            padding: "0 0 0 0",
            fontWeight: "bold",
          }}
        >
          {companyName}
        </p>
        <p
          style={{
            margin: "1vh 0 0 0 ",
            padding: "0 0 0 0",
            fontWeight: "lighter",
          }}
        >
          {jobRole}
        </p>
      </Box>
      <Box
        width="20%"
        display="flex"
        flexDirection="column"
        justifyContent="center"

        // paddingLeft="20%"
      >
        <Chip
          sx={{ margin: "0 15% 0 15%" }}
          color={chipColor}
          variant="outlined"
          size="small"
          label={status}
        />
      </Box>
    </Stack>
  );
}

export default DisplaySelectedJobHeader;
