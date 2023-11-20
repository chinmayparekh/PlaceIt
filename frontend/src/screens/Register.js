import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  CardActions,
  Button,
} from "@mui/material";
import { FormControl, Input } from "@mui/base";
import { useState } from "react";
import Papa from "papaparse";
import { registerAPICall } from "../connections";

function Register(props) {
  const [file, setFile] = useState();
  const [, setParsedData] = useState([]);
  const [, setTableRows] = useState([]);
  const [values, setValues] = useState([]);

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOnSend = (e) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];
        results.data.forEach((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });
        setParsedData(results.data);
        setTableRows(rowsArray[0]);
        setValues(valuesArray);
      },
    });
    uploadData();
  };

  const uploadData = () => {
    values.forEach(processData);
  };

  const processData = async (value) => {
    const res = await registerAPICall(
      value[0],
      value[1],
      value[2],
      value[3],
      value[4],
      value[5],
      value[6],
      value[7],
      value[8],
      value[9]
    );
    console.log(res);
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
          title="Register Users"
          titleTypographyProps={{ fontWeight: "500" }}
        />
        <CardContent>
          <Stack direction={"column"} spacing="2vh">
            <FormControl>
              <Input
                type={"file"}
                id={"csvFileInput"}
                accept={".csv"}
                onChange={handleOnChange}
              ></Input>
            </FormControl>
          </Stack>
        </CardContent>
        <CardActions>
          <Stack
            width="100%"
            direction="row"
            justifyContent="space-between"
            padding="0px 2vw 1vh 2vw"
          >
            <Button variant="contained" onClick={handleOnSend}>
              Send
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </>
  );
}

export default Register;
