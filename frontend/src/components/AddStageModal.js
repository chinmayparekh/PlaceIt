import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  Fade,
  Modal,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import LoadingButton from "@mui/lab/LoadingButton";
import { addNewJobStageAPICall } from "../connections";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  height: "60vh",
  overflowY: "scroll",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const columns = [
  { field: "rollNumber", headerName: "Roll Number", width: 150 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "email", headerName: "College Email", width: 300 },
];

function AddStageModal({ open, setOpen, prevStage, setReload }) {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const jwt = useSelector((state) => state.loginReducer.token);

  const handleClose = () => {
    setOpen(false);
  };

  const addStage = async (e) => {
    setLoading(true);
    console.log("SELECTED STUDENTS :", selectedStudents);
    const stage = {
      jobId: prevStage?.jobId,
      stageNumber: prevStage?.stageNumber + 1,
      studentList: [...selectedStudents],
    };
    const response = await addNewJobStageAPICall(stage, jwt);
    setSelectedStudents([]);
    setOpen(false);
    setLoading(false);
    setReload(true);
  };
  const handleStudentSelect = (vals) => {
    // console.log("IN HANDLE STUDENT SELECT, VAL:", vals);
    let students = [];
    for (let val in vals) {
      students.push((prevStage?.studentList[val]).rollNumber);
    }
    setSelectedStudents([...students]);
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography paddingBottom="3vh" variant="h6" component="h2">
              Select students to add to next stage.{" "}
            </Typography>
            <DataGrid
              style={{ maxHeight: "35vh" }}
              getRowId={(val) => val.rollNumber}
              rows={prevStage?.studentList}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5, 10, 50, 100]}
              checkboxSelection
              disableRowSelectionOnClick
              onRowSelectionModelChange={handleStudentSelect}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                padding: "2vh 0 0 0",
              }}
            >
              <Button variant="outlined" color="error" onClick={handleClose}>
                Cancel
              </Button>
              {/* {loading ? (
              <LoadingButton variant="outlined" onClick={addStage}>
                Add Stage
              </LoadingButton>
            ) : ( */}
              <Button variant="outlined" onClick={addStage}>
                Add Stage
              </Button>
              {/* )} */}
            </Box>
          </Box>
        </Fade>
      </Modal>
      <Backdrop
        // sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={() => setLoading(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default AddStageModal;
