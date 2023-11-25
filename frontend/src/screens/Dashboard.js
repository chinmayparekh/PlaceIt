import { Stack } from "@mui/material";
import React from "react";
import Notification from "../components/Notification";
import CalendarView from "../components/CalendarView";

function Dashboard(props) {
  return (
    <Stack direction="row" alignItems="center" height="90vh">
      <Notification fromFile={true} />
      <CalendarView />
    </Stack>
  );
}

export default Dashboard;
