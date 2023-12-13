import { Card, CardHeader, Avatar, IconButton } from "@mui/material";
import React from "react";

function JobCard({ details, onSelect }) {
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
  } = details;

  const onClick = async (e) => {
    onSelect(details);
  };

  return (
    <Card
      style={{
        width: "100%",
        // maxWidth: "25vw",
        overflowX: "scroll",
        padding: "1vh 0vw 1vh 0vw",
        margin: "1vh 0.5vw 1vh 0.5vw",
      }}
    >
      <CardHeader
        onClick={onClick}
        avatar={<Avatar>{jobId}</Avatar>}
        title={companyName}
        titleTypographyProps={{ fontWeight: "bold" }}
        subheader={eligibility}
      />
    </Card>
  );
}

export default JobCard;
