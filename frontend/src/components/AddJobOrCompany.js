import React, { useState } from "react";
import AddJob from "./AddJob";
import { Tabs, Tab } from "@mui/material";
import AddCompany from "./AddCompany";

function AddJobOrCompany(props) {
  const [tab, setTab] = useState(0);
  const handleTabChange = async (e) => {
    if (tab === 1) setTab(0);
    else setTab(1);
  };
  return (
    <>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        centered
        textColor="inherit"
        style={{ paddingTop: "2vh" }}
      >
        <Tab label="Add Job" />
        <Tab label="Add Company" />
      </Tabs>
      {tab === 0 ? <AddJob /> : <AddCompany />}
    </>
  );
}

export default AddJobOrCompany;
