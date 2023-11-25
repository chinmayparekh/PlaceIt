import { Box, Chip, Divider, Stack } from "@mui/material";
import React from "react";
import DisplaySelectedJobHeader from "./DisplaySelectedJobHeader";
import DisplaySelectedJobDescription from "./DisplaySelectedJobDescription";

function getChipColor(s) {
  const status = String(s).toLowerCase();
  if (status === "not applied") return "warning";
  else if (status === "rejected") return "error";
  else if (status === "applied") return "info";
  else if (status === "offered") return "success";
  else return "warning";
}

function DisplaySelectedJob({ job }) {
  const chipColor = getChipColor(job?.status);
  console.log("job:", job);
  return job !== undefined || job != null ? (
    <Stack direction="column" boxShadow="5" borderRadius="1%">
      <DisplaySelectedJobHeader
        chipColor={chipColor}
        status={job.status}
        companyName={job.companyName}
        jobRole={job.jobRole}
      />
      <Divider sx={{ margin: "1vh 0 1vh 0" }} />
      <DisplaySelectedJobDescription job={job} />
      <Divider sx={{ margin: "1vh 0 1vh 0" }} />

      {/* <DisplaySelectedJobTabs/> */}
    </Stack>
  ) : (
    <></>
  );
}

export default DisplaySelectedJob;
