import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Divider,
  Stack,
  Alert,
  CardActions,
  Autocomplete,
  Button,
  CardContent,
  TextField,
} from "@mui/material";
import HrDetails from "./HrDetails";
import AddHr from "./AddHr";
import { useSelector } from "react-redux";
import {
  addAndGetCompanyIDAPICall,
  addHRsOfSameCompanyAPICall,
  getAllCompaniesAPICall,
  getAllHrOfCompanyAPICall,
} from "../connections";

function AddCompany(props) {
  const [hrList, setHrList] = useState([]);
  const [company, setCompany] = useState("");
  const [allCompanies, setAllCompanies] = useState([]);
  const [disabledNewCompany, setDisabledNewCompany] = useState(false);
  const jwt = useSelector((state) => state.loginReducer.token);
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const companyList = await getAllCompaniesAPICall(jwt);
      var temp = [];
      for (let i = 0; i < companyList.length; i++) {
        // temp.push({ label: companyList[i].companyName });
        temp.push(companyList[i].companyName);
      }
      await setAllCompanies(temp);
    };
    fetchData();
    console.log("All companies set in the component to :", allCompanies);
  }, [flag]);

  const addHr = async (Name, Contact, Email) => {
    const newHrList = [
      ...hrList,
      { name: Name, contact: Contact, email: Email },
    ];
    setHrList(newHrList);
  };

  const deleteHr = async (index) => {
    // console.log("Have to delete hr at index ", index);
    let newHrList = [...hrList];
    newHrList.splice(index, 1);
    setHrList(newHrList);
  };

  const handleSend = async (e) => {
    if (company.length > 0 && hrList.length > 0 && validateName(company)) {
      await addAndGetCompanyIDAPICall(jwt, company).then(async (data) => {
        console.log("Add and get company ID:", data);
        if (data > 0) {
          const hrListCopy = new Array(...hrList);
          hrListCopy.forEach((element) => {
            element["companyId"] = data;
          });
          const value = await addHRsOfSameCompanyAPICall(jwt, hrListCopy);
          console.log("value:", value);
          if (value) {
            setHrList([]);
            setCompany("");
            alert("Added details to the database");
          } else {
            alert("Could not add details to the database");
          }
        }
      });
    }
    // call all companies again
    setFlag(!flag);
  };

  const checkAndGetHrList = async (e, value, act) => {
    console.log("EVENT:", e);
    // await setCompanySearchString(e.target.value ? e.target.value : "");
    const searchstring = e.target.value;
    console.log(
      "COMPANY SEARCH STRING STATE:",
      company,
      " and search string :",
      searchstring
    );

    console.log("Before: ", disabledNewCompany);
    if (searchstring.length === 0) {
      setDisabledNewCompany(false);
    } else {
      setDisabledNewCompany(true);
      setCompany(searchstring);
    }
    console.log("After: ", disabledNewCompany, searchstring);

    setHrList([]);
    let found = false;
    for (let i = 0; i < allCompanies.length; ++i) {
      console.log(allCompanies[i], searchstring);
      if (allCompanies[i] === searchstring) {
        found = true;
        break;
      }
    }
    console.log("Found:", found);
    if (found === true) {
      // call to get hr list
      const existingHrs = await getAllHrOfCompanyAPICall(jwt, searchstring);
      // const allHrs = [...existingHrs];
      // console.log("HRs got : ", existingHrs);
      setHrList(existingHrs);
    }
  };

  return (
    <>
      <Card
        elevation={8}
        sx={{
          width: "80vw",
          marginLeft: "10vw",
          marginTop: "5vh",
          // height:"60vh"
        }}
      >
        <CardHeader
          title="Add Company"
          titleTypographyProps={{ fontWeight: "500" }}
        />
        <Divider />
        <CardContent>
          <Stack direction={"column"} spacing="2vh">
            <Autocomplete
              options={allCompanies}
              onSelect={checkAndGetHrList}
              autoComplete
              includeInputInList
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Existing Company Names"
                  variant="standard"
                />
              )}
            />
            <TextField
              label="New Company Name"
              disabled={disabledNewCompany}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </Stack>
        </CardContent>
        <CardActions>
          <Stack
            width="100%"
            direction="column"
            justifyContent="space-between"
            padding="0px 2vw 1vh 2vw"
          >
            <Stack spacing="0.5vh">
              {hrList.map((value, index) => {
                // console.log("VALUES SENDING TO HR DETAILS:", value);
                return (
                  <HrDetails
                    key={index}
                    details={value}
                    index={index}
                    onDelete={deleteHr}
                  ></HrDetails>
                );
              })}
              <Alert severity="info">
                Click on Add Button to add the HR details
              </Alert>
              <AddHr addHr={addHr}></AddHr>
            </Stack>
            <Button variant="contained" onClick={handleSend}>
              Send
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </>
  );
}

function validateName(str) {
  // Regular expression for name validation
  var nameRegex = /^[A-Za-z0-9\s'-]+$/;
  // Test the name against the regex pattern
  return nameRegex.test(str);
}

export default AddCompany;
