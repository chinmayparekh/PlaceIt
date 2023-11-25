import React, { useState } from "react";
import notifs from "../app/notificationData";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  List,
  Paper,
  Stack,
} from "@mui/material";

function Notification({ fromFile }) {
  const [notifications, setNotifications] = useState(fromFile ? notifs : []);
  //   console.log("NOTIFICATIONS:", notifications);
  return (
    <>
      <Stack>
        {/* <Paper style={{ paddinTop: "20vh" }}>Notification</Paper> */}
        <List
          style={{
            marginTop: "15vh",
            flexDirection: "column",
            maxHeight: "90vh",
            overflow: "scroll",
            marginLeft: "5vw",
            marginRight: "5vw",
            width: "30vw",
          }}
        >
          {notifications.map((value, index) => {
            return (
              //   <Paper elevation={8}>
              <Card
                key={value.nid}
                style={{
                  padding: "5vh 0vw 5vh 0vw",
                }}
              >
                <CardHeader
                  avatar={<Avatar>{value.sentUserId}</Avatar>}
                  title={value.subject}
                  subheader={value.sentTime}
                />
                <CardContent>{value.body}</CardContent>
              </Card>
              //   </Paper>
            );
          })}
        </List>
      </Stack>
    </>
  );
}

export default Notification;
