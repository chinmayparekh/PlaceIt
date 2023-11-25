import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Divider,
  FormControl,
  Select,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Stack,
  Box,
  Autocomplete,
  Chip,
  CardActions,
  Button,
  CardContent,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  addJobAPICall,
  getCompanyIdAPICall,
  getAllCompaniesAPICall,
} from "../connections";
import { useSelector } from "react-redux";

const eligibilityModes = [
  "6 Month Intern",
  "11 Month Intern",
  "11 Month Intern and Fulltime",
  "6 Month Intern and Fulltime",
  "Fulltime",
  "Summer Intern",
];

function AddJob(props) {
  const jwt = useSelector((state) => state.loginReducer.token);
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [deadline, setDeadline] = useState("");
  const [salary, setSalary] = useState("");
  const [eligibilityList, setEligibilityList] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);
  const [additionalInformation, setAdditionalInformation] = useState("");
  const [spocDetails, setSpocDetails] = useState("");
  const [flag, setFlag] = useState(true);

  const select = (e) => {
    const {
      target: { value },
    } = e;
    setEligibilityList(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

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

  function validateName(str) {
    // Regular expression for name validation
    var nameRegex = /^[A-Za-z0-9\s'-]+$/;
    // Test the name against the regex pattern
    return nameRegex.test(str);
  }

  const handleCompanyChange = (event, newValue) => {
    // Update the companyName variable when a company is chosen
    setCompanyName(newValue);
  };

  const checkAllDetails = async () => {
    if (!validateName(companyName)) {
      alert(
        "Enter company name in the correct format( ^[A-Z][A-Za-z0-9&'.,-]+$ )."
      );
      return -1;
    }

    if (
      role.length <= 0 ||
      salary.length <= 0 ||
      spocDetails.length <= 0 ||
      eligibilityList.length <= 0
    ) {
      alert("Enter all the required details");
      return -1;
    }
    // Calling to get Company Id
    const companyId = await getCompanyIdAPICall(jwt, companyName);
    console.log("company ID Returned : ", await companyId);
    // if (companyId===-1) return false;
    return companyId;
  };

  const addJob = async (e) => {
    const companyId = await checkAllDetails();
    var temp = new Date(deadline);
    const deadlineDate =
      temp.getFullYear() + "-" + temp.getMonth() + "-" + temp.getDate();
    if (companyId > 0) {
      const jobAdd = await addJobAPICall(jwt, {
        companyId: companyId,
        jobRole: role,
        appDeadline: deadlineDate,
        status: "not applied",
        spocDetails: spocDetails,
        salaryBreakup: salary,
        eligibility: eligibilityList.join(","),
        addiInfo: additionalInformation,
      });
      if (!jobAdd) {
        alert("Job Couldn't be added, try again.");
        return;
      }
      alert("Job Added Successfully!! ");
      setCompanyName("");
      setRole("");
      setDeadline("");
      setSalary("");
      setEligibilityList([]);
      setAdditionalInformation("");
      setSpocDetails("");
    } else {
      alert("Details filled are invalid.");
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
          title="Create Job"
          titleTypographyProps={{ fontWeight: "500" }}
        />
        <Divider />
        <CardContent>
          <Stack direction={"column"} spacing="2vh">
            {/* <TextField
              label="Company Name"
              multiline
              maxRows={4}
              value={companyName}
              required
              onChange={(e) => setCompanyName(e.target.value)}
            /> */}
            <Autocomplete
              options={allCompanies}
              autoComplete
              includeInputInList
              value={companyName}
              onChange={handleCompanyChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Existing Company Names"
                  value={companyName}
                  variant="standard"
                />
              )}
            />
            <FormControl>
              <InputLabel id="rl">Eligibility List</InputLabel>
              <Select
                multiple
                multiline
                displayEmpty
                input={<OutlinedInput label={"Eligibility List"} />}
                value={eligibilityList}
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
                {eligibilityModes.map((name) => (
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
              label="Role"
              multiline
              maxRows={4}
              value={role}
              required
              onChange={(e) => setRole(e.target.value)}
            />
            <DatePicker
              label="Deadline"
              value={deadline}
              onChange={(newValue) => setDeadline(newValue)}
            />
            <TextField
              label="Salary with breakup"
              multiline
              // maxRows={10}
              rows={10}
              value={salary}
              required
              onChange={(e) => setSalary(e.target.value)}
            />
            <TextField
              label="Additional Information"
              multiline
              // maxRows={10}
              rows={10}
              value={additionalInformation}
              onChange={(e) => setAdditionalInformation(e.target.value)}
            />
            <TextField
              label="SPOC Details"
              multiline
              // maxRows={10}
              rows={10}
              value={spocDetails}
              required
              onChange={(e) => setSpocDetails(e.target.value)}
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
            <Button variant="contained" onClick={addJob}>
              Send
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </>
  );
}

export default AddJob;
