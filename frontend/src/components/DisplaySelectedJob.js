import { Box, Divider, Stack, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import DisplaySelectedJobHeader from "./DisplaySelectedJobHeader";
import DisplaySelectedJobDescription from "./DisplaySelectedJobDescription";
import { useSelector } from "react-redux";
import { getJobStagesAPICall } from "../connections";
import AddIcon from "@mui/icons-material/Add";
import AddStageModal from "./AddStageModal";
import DisplaySelectedStage from "./DisplaySelectedStage";

function getChipColor(s) {
  const status = String(s).toLowerCase();
  if (status === "not applied") return "warning";
  else if (status === "rejected") return "error";
  else if (status === "applied") return "info";
  else if (status === "offered") return "success";
  else return "warning";
}

function DisplaySelectedJob({ job }) {
  // console.log("JOB:", job);
  const [reload, setReload] = useState(false);
  const chipColor = getChipColor(job?.status);
  const jwt = useSelector((state) => state.loginReducer.token);
  const role = useSelector((state) => state.loginReducer.role);
  const [stages, setStages] = useState([]);
  const [selectedStage, setSelectedStage] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const openAddStageModal = async (e) => {
    setOpenModal(true);
  };

  // const appendStage = (stage) => {
  //   setStages([...stages, stage]);
  //   // TODO call backend to add stage with students
  // };

  const fetchData = async () => {
    try {
      const fetchedJobStages = await getJobStagesAPICall(jwt, job.jobId);
      // console.log("JobStages FOUND :", fetchedJobStages);
      setStages([...fetchedJobStages]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchData();
  }, [reload]);

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

      {/* JOB stages */}
      <Box display="flex" flexDirection="column">
        {stages.length > 0 ? (
          <>
            <Tabs
              value={selectedStage}
              onChange={(e, newSelectedStage) =>
                setSelectedStage(newSelectedStage)
              }
              sx={{
                borderRight: 1,
                borderColor: "divider",
              }}
              centered
            >
              {stages.map((val, idx) => {
                return <Tab key={idx} label={"Stage " + val.stageNumber} />;
              })}
              {(role === "admin" || role === "super-admin") && (
                <Tab icon={<AddIcon />} onClick={openAddStageModal} />
              )}
            </Tabs>
            {/* {console.log("STAGE SENT:", stages[selectedStage])} */}
          </>
        ) : (
          <></>
        )}
      </Box>
      <DisplaySelectedStage stage={stages[selectedStage]} />

      <AddStageModal
        open={openModal}
        setReload={setReload}
        setOpen={setOpenModal}
        // appendStage={appendStage}
        prevStage={stages[stages.length - 1]}
      />
    </Stack>
  ) : (
    <></>
  );
}

export default DisplaySelectedJob;
