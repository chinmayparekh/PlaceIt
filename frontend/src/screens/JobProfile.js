import React, { useEffect, useState } from "react";
import {
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Button,
  Box,
  Stack,
  Divider,
  Container,
  TextField,
} from "@mui/material";
import "./CSS/jobProfile.css";
import { useSelector } from "react-redux";
import { getAllRelevantJobsAPICall } from "../connections";
import JobCard from "../components/JobCard";
import { sortJobList } from "../app/utils";
import DisplaySelectedJob from "../components/DisplaySelectedJob";

function JobProfile(props) {
  const [positionType, setPositionType] = useState("");
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [searchText, setSearchText] = useState("");
  const jwt = useSelector((state) => state.loginReducer.token);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [jobSelected, setJobSelected] = useState();

  const updateJobDisplayed = (jobsList) => {
    if (jobSelected != null || jobSelected !== undefined) {
      if (!jobsList.includes(jobSelected)) {
        setJobSelected(undefined);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const fetchedJobs = await getAllRelevantJobsAPICall(jwt);
      // console.log("RELEVANT JOBS FOUND :", fetchedJobs);
      setJobs([...fetchedJobs]);
      setFilteredJobs([...fetchedJobs]);
      // console.log(" JOBS SET TO :", jobs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleReset = async (e) => {
    setPositionType("");
    setStatus("");
    setSortBy("");
    setFilteredJobs(jobs);
  };

  const onChangeSearchText = async (e) => {
    setSearchText(e.target.value);
    const updatedText = e.target.value.toLowerCase();
    if (updatedText.length === 0) {
      return;
    }
    handleReset(undefined);
    let newCompanyList = [];
    for (let i = 0; i < jobs.length; ++i) {
      if (
        jobs[i].companyName.toLowerCase().includes(updatedText) ||
        jobs[i].jobRole.toLowerCase().includes(updatedText)
        // jobs[i].eligibility.toLowerCase().includes(updatedText) ||
        // jobs[i].addiInfo.toLowerCase().includes(updatedText)
      ) {
        newCompanyList.push(jobs[i]);
      }
    }
    setFilteredJobs(newCompanyList);
  };

  useEffect(() => {
    console.log("In Use Effect");
  }, [filteredJobs, positionType, sortBy, status]);

  const handlePositionType = (e, updateList = []) => {
    console.log(updateList);
    if (e?.target?.value != null || e?.target?.value !== undefined) {
      setPositionType(e.target.value);
      const selectedJobs = jobs.filter((value, index) => {
        const val1 = value.eligibility.toLowerCase(),
          val2 = e.target.value.toLowerCase();
        return val1 === val2 || val2 === "all";
      });
      // call other filters to sort the new filtered list
      const tempjobs = handleSortBy(null, selectedJobs);
      const tempjobs2 = handleStatus(null, tempjobs);
      updateJobDisplayed(tempjobs2);
      setFilteredJobs([...tempjobs2]);
    } else if (updateList.length > 0) {
      const selectedJobs = updateList.filter((value, index) => {
        const val1 = value.eligibility.toLowerCase();
        const val2 = positionType.toLowerCase();
        return val1 === val2 || val2 === "all" || val2 === "";
      });
      return selectedJobs;
    }
    return [];
  };

  const handleSortBy = (e, updateList = []) => {
    console.log(updateList);
    if (e?.target?.value != null || e?.target?.value !== undefined) {
      console.log("in the if of handle sort by");
      const orderedJobs = sortJobList(e.target.value, jobs); // call function here ;
      setSortBy(e.target.value);
      // call other filters to sort the new filtered list
      const tempjobs = handlePositionType(null, orderedJobs);
      const tempjobs2 = handleStatus(null, tempjobs);
      updateJobDisplayed(tempjobs2);
      setFilteredJobs([...tempjobs2]);
    } else if (updateList.length > 0) {
      const orderedJobs = sortJobList(sortBy, updateList); // call function here ;
      return orderedJobs;
    }
    return [];
  };

  const handleStatus = (e, updateList = []) => {
    console.log(updateList);
    if (e?.target?.value != null || e?.target?.value !== undefined) {
      setStatus(e.target.value);
      const selectedJobs = jobs.filter((value, index) => {
        const val1 = value.status.toLowerCase();
        const val2 = e.target.value.toLowerCase();
        return val1 === val2 || val2 === "all" || val2 === "";
      });
      const tempjobs = handlePositionType(null, selectedJobs);
      const tempjobs2 = handleSortBy(null, tempjobs);
      updateJobDisplayed(tempjobs2);
      setFilteredJobs([...tempjobs2]);
    } else if (updateList.length > 0) {
      const selectedJobs = updateList.filter((value, index) => {
        const val1 = value.status.toLowerCase();
        const val2 = status.toLowerCase();
        return val1 === val2 || val2 === "all" || val2 === "";
      });
      return selectedJobs;
    }
    return [];
  };

  return (
    <>
      <div className="div-container">
        <div className="selector-div">
          <FormControl className="selector">
            <InputLabel>Position Type</InputLabel>
            <Select
              label="Position-Type"
              value={positionType}
              onChange={handlePositionType}
              defaultValue="All"
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"Fulltime"}>Fulltime</MenuItem>
              <MenuItem value={"6 Month Intern"}>6 Month Intern</MenuItem>
              <MenuItem value={"11 Month Intern"}>11 Month Intern</MenuItem>
              <MenuItem value={"6 Month Intern and Fulltime"}>
                6 Month Intern and Fulltime
              </MenuItem>
              <MenuItem value={"11 Month Intern and Fulltime"}>
                11 Month Intern and Fulltime
              </MenuItem>
              <MenuItem value={"Summer Intern"}>Summer</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="selector-div">
          <FormControl className="selector">
            <InputLabel>Status</InputLabel>
            <Select label="Status" value={status} onChange={handleStatus}>
              <MenuItem value={"all"}>All</MenuItem>
              <MenuItem value={"applied"}>Applied</MenuItem>
              <MenuItem value={"not applied"}>Not Applied</MenuItem>
              <MenuItem value={"rejected"}>Rejected</MenuItem>
              <MenuItem value={"offered"}>Offered</MenuItem>
              {/* <MenuItem value={"7"}>Offer Accepted</MenuItem> */}
              {/* <MenuItem value={"8"}>Offer Rejected</MenuItem> */}
            </Select>
          </FormControl>
        </div>
        <div className="selector-div">
          <FormControl className="selector">
            <InputLabel>Sort By</InputLabel>
            <Select label="Sort-By" value={sortBy} onChange={handleSortBy}>
              {/* <MenuItem value={"created-desc"}>Created At(Recent)</MenuItem> */}
              {/* <MenuItem value={"created-asc"}>Created At(Oldest)</MenuItem> */}
              <MenuItem value={"title"}>Eligibility</MenuItem>
              <MenuItem value={"role"}>Role</MenuItem>
              <MenuItem value={"company"}>Company Name</MenuItem>
              {/* <MenuItem value={"location"}>Location</MenuItem> */}
              {/* <MenuItem value={"5"}>Status</MenuItem> */}
              <MenuItem value={"deadline"}>Application Deadline</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="selector-div">
          <Button
            variant="contained"
            className="selector"
            onClick={handleReset}
          >
            Reset Filters
          </Button>
        </div>
      </div>
      <hr></hr>

      <Stack
        direction="row"
        sx={{
          maxHeight: "80vh",
          minHeight: "80vh",
          justifyContent: "space-around",
        }}
      >
        <Box sx={{ width: "25vw" }}>
          {/* ADD search bar */}
          <TextField
            focused
            value={searchText}
            onChange={onChangeSearchText}
            sx={{
              color: "blue",
              marginTop: "1vh",
              width: "80%",
              marginBottom: "1vh",
            }}
            label="Search Job Profiles"
            variant="outlined"
          />
          <Box sx={{ overflow: "scroll", maxHeight: "80vh" }}>
            {filteredJobs.map((value, index) => {
              return (
                <JobCard
                  details={value}
                  key={index}
                  onSelect={setJobSelected}
                ></JobCard>
              );
            })}
          </Box>
        </Box>

        <Divider orientation="vertical" />
        {/* <Stack> */}
        {/* Container with the details of the job selected */}
        <Container style={{ width: "75vw" }}>
          {jobSelected !== undefined || jobSelected != null ? (
            <DisplaySelectedJob
              key={jobSelected.jobId}
              job={jobSelected}
            ></DisplaySelectedJob>
          ) : (
            <></>
          )}
        </Container>
        {/* </Stack> */}
      </Stack>
    </>
  );
}

export default JobProfile;
