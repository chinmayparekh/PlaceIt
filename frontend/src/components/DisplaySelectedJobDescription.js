import {
  Box,
  Card,
  CardContent,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import Description from "./Description";

function DisplaySelectedJobDescription({ job }) {
  const {
    jobId,
    jobRole,
    companyName,
    companyId,
    eligibility,
    addiInfo,
    appDeadline,
    salaryBreakup,
    spocDetails,
    status,
  } = job;
  return (
    <Box
      sx={{
        maxHeight: "20vh",
        overflowY: "scroll",
      }}
    >
      <Description heading={"Eligibility"} body={eligibility} />
      <Description heading={"Salary Breakup"} body={salaryBreakup} />
      <Description heading={"Additional Information"} body={addiInfo} />
      <Description heading={"Spoc Details"} body={spocDetails} />
      <Description heading={"Deadline"} body={appDeadline} />
    </Box>
  );
}

export default DisplaySelectedJobDescription;
