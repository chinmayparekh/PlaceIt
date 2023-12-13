import { Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const columns = [
  { field: "rollNumber", headerName: "Roll Number", width: 150 },
  { field: "name", headerName: "Student Name", width: 150 },
  { field: "email", headerName: "College Email", width: 300 },
  {
    headerName: "Action",
    sortable: false,
    renderCell: (params) => {
      console.log("PRINTING PARAMETERS IN THE LIST", params);
      return (
        <IconButton
          onClick={(e) => console.log("CLICKED TO DELETE idx:", params.id - 1)}
        >
          <DeleteIcon />
        </IconButton>
      );
    },
  },
];

function DisplaySelectedStage({ stage }) {
  console.log("STAGE IN DISPLAY STAGE:", stage);
  const { stageNumber, jobId, studentList } = stage
    ? stage
    : { stageNumber: undefined, jobId: undefined, studentList: [] };
  return (
    <Box
      sx={{
        // maxHeight: "100%",
        padding: "0 2vw 2vh 2vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "flow",
      }}
    >
      <DataGrid
        sx={{ width: "70%" }}
        getRowId={(val) => val.rollNumber}
        rows={studentList}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 50, 100]}
        // checkboxSelection
        // disableRowSelectionOnClick
        // onRowSelectionModelChange={handleStudentSelect}
      />
    </Box>
  );
}

export default DisplaySelectedStage;
