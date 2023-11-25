import React, { useState } from "react";
import { Button, Paper, Stack, TextField } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

function AddHr({ addHr }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");

  const validatePhoneNumber = (phoneNumber) => {
    // Regular expression for phone number validation
    var phoneRegex = /^\d{10}$/;

    // Test the phoneNumber against the regex pattern
    return phoneRegex.test(phoneNumber);
  };
  const validateEmail = (address) => {
    // Regular expression for email validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Test the email against the regex pattern
    return emailRegex.test(email);
  };
  function validateName(str) {
    // Regular expression for name validation
    var nameRegex = /^[A-Za-z0-9\s'-]+$/;
    // Test the name against the regex pattern
    return nameRegex.test(str);
  }

  const handleAdd = async (e) => {
    if (name.length && contact.length && email.length) {
      if (
        validateName(name) &&
        validatePhoneNumber(contact) &&
        validateEmail(email)
      ) {
        addHr(name, contact, email);
        setContact("");
        setName("");
        setEmail("");
      }
      //   console.log("ADDED HR");
      //   console.log(name, contact, email);
    }
  };

  return (
    <Paper style={{ padding: "1vh 1.5vw 1vh 1.5vw", marginBottom: "2vh" }}>
      <Stack direction="row">
        <TextField
          style={{ margin: "0.5vh 1vw 0.5vh 1vw" }}
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          style={{ margin: "0.5vh 1vw 0.5vh 1vw" }}
          fullWidth
          label="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </Stack>
      <Stack direction="row">
        <TextField
          style={{ margin: "0.5vh 1vw 0.5vh 1vw" }}
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          style={{
            margin: "0.5vh 1vw 0.5vh 1vw",
            width: "20%",
            backgroundColor: "#D2EDFF",
          }}
          onClick={handleAdd}
        >
          <PersonAddAlt1Icon />
        </Button>
      </Stack>
    </Paper>
  );
}

export default AddHr;
