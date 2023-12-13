import React, { useState } from "react";
import {
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
  CardHeader,
  Box,
  Chip,
  Divider,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  CardActions,
  Button,
} from "@mui/material";
import { sendEmailNotification, getAllCompaniesAPICall } from "../connections";
import { useSelector } from "react-redux";


const selectList = ["kritinp@gmail.com"];

function CreateNotification(props) {
  const [listSelected, setListSelected] = useState([]);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [createNoice, setCreateNotice] = useState(true);
  const jwt = useSelector((state) => state.loginReducer.token);

  const select = (e) => {
    const {
      target: { value },
    } = e;
    setListSelected(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const sendNotification = async (e) => {

    e.preventDefault();


    const emailData = {
      recipient: listSelected[0],
      subject: subject,
      body: body,
    };
    console.log(emailData);
    const status = await sendEmailNotification(emailData, jwt);

    // Send notification
    const currTime = new Date();
    alert("Notification sent!");

    setBody("");
    setSubject("");
    setListSelected([]);
    setCreateNotice(true);
  };

  return (
    <>
      <Card
        elevation={8}
        sx={{
          width: "80vw",
          marginLeft: "10vw",
          marginTop: "10vh",
          // height:"60vh"
        }}
      >
        <CardHeader
          title="Create Notification"
          titleTypographyProps={{ fontWeight: "500" }}
        />
        <Divider />
        <CardContent>
          <Stack direction={"column"} spacing="2vh">
            <FormControl>
              <InputLabel id="rl">Recipient List</InputLabel>
              <Select
                multiple
                multiline
                displayEmpty
                input={<OutlinedInput label={"Recipient List"} />}
                value={listSelected}
                onChange={select}
                renderValue={(selected) => {
                  return (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  );
                }}
              >
                {selectList.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    // style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Subject"
              multiline
              maxRows={4}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <TextField
              label="Body"
              multiline
              maxRows={10}
              rows={10}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </Stack>
        </CardContent>
        <CardActions>
          <Stack
            width="100%"
            direction="row"
            justifyContent="space-between"
            padding="0px 2vw 1vh 2vw"
          >
            <FormControlLabel
              control={<Checkbox checked={createNoice} />}
              onChange={(e) => setCreateNotice(!createNoice)}
              label="Create Notice"
            />
            <Button variant="contained" onClick={sendNotification}>
              Send
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </>
  );
}

export default CreateNotification;
