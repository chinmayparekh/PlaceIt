import React from "react";
import { Button, Paper, TextField, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function HrDetails({ details, onDelete, index }) {
  // console.log("VALUE IN HR DETAILS :", details);
  const { name, contact, email } = details;
  const handleDelete = async (e) => {
    // console.log("Deleting index : ", index);
    onDelete(index);
  };
  return (
    <Paper
      style={{
        padding: "1vh 1.5vw 1vh 1.5vw",
        marginBottom: "2vh",
        backgroundColor: "white",
      }}
    >
      <Stack direction="row">
        <TextField
          style={{ margin: "0.5vh 1vw 0.5vh 1vw" }}
          fullWidth
          label="Name"
          InputProps={{
            readOnly: true,
          }}
          value={name}
        />
        <TextField
          label="Contact"
          fullWidth
          style={{ margin: "0.5vh 1vw 0.5vh 1vw" }}
          value={contact}
          InputProps={{
            readOnly: true,
          }}
        />
      </Stack>
      <Stack direction="row">
        <TextField
          label="Email"
          fullWidth
          style={{ margin: "0.5vh 1vw 0.5vh 1vw" }}
          InputProps={{
            readOnly: true,
          }}
          value={email}
        />
        <Button
          onClick={handleDelete}
          variant="contained"
          style={{
            margin: "0.5vh 1vw 0.5vh 1vw",
            width: "20%",
            backgroundColor: "#DBDBDB",
          }}
        >
          <DeleteIcon style={{ color: "#61615F" }} />
        </Button>
      </Stack>
    </Paper>
  );
}

export default HrDetails;
