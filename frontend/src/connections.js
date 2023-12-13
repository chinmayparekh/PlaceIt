import jwt_decode from "jwt-decode";

async function loginAPICall(email, passwd) {
  const url = process.env.REACT_APP_API + "auth/authenticate";
  // console.log("URL:", url);
  let ret, jwt;
  // const encryptedPasswd = bcrypt
  // console.log("password :", passwd);
  await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      collegeEmail: email,
      accPassword: passwd,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    // .then((response) => response.json())
    .then((data) => {
      // data = data.json();
      // console.log("Login data returned :", data);
      ret = data.ok;
      return data.json();
    })
    .then((data) => {
      console.log(data);
      jwt = data["token"];
    })
    .catch((err) => {
      ret = false;
      console.log(err.message);
    });
  console.log("RET: ", ret, "JWT: ", jwt);
  return [ret, jwt];
}

async function registerAPICall(
  name,
  passwd,
  rollNo,
  dob,
  personalEmail,
  address,
  gender,
  contact,
  email,
  role
) {
  let roleId = 1;
  const url = process.env.REACT_APP_API + "auth/register";
  let ret;

  if (role === "user") roleId = 3;
  else if (role === "admin") roleId = 2;

  await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      collegeEmail: email,
      accPassword: passwd,
      name: name,
      rollNo: rollNo,
      dob: dob,
      personalEmail: personalEmail,
      address: address,
      gender: gender,
      contact: contact,
      roles: [{ roleId: roleId, roleName: role }],
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    // .then((response) => response.json())
    .then((data) => {
      // data = data.json();
      // console.log("Register data returned :", data);
      ret = data.ok;
      return data.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      ret = false;
      console.log(err.message);
    });
  console.log("RET: ", ret);
  return ret;
}

const getCompanyIdAPICall = async (jwt, companyName) => {
  const url = process.env.REACT_APP_API + "company/getCompanyId";
  // console.log("URL to get CompanyId:", url);
  let ret = -1;
  await fetch(url, {
    method: "POST",
    body: companyName,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((data) => {
      // data = data.json();
      // console.log("Get CompanyId returned :", data);
      ret = data.json();
      return ret;
    })
    .catch((err) => {
      ret = -1;
      console.log(err.message);
    });
  return ret;
};

const addJobAPICall = async (jwt, jobdetails) => {
  const url = process.env.REACT_APP_API + "jobs/add";
  // console.log("URL to add jobs:", url);
  let ret;
  await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      companyId: jobdetails.companyId,
      jobRole: jobdetails.jobRole,
      appDeadline: jobdetails.appDeadline,
      status: jobdetails.status,
      // category:,
      salaryBreakup: jobdetails.salaryBreakup,
      eligibility: jobdetails.eligibility,
      addiInfo: jobdetails.addiInfo,
    }),
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((data) => {
      // data = data.json();
      // console.log("Add Job returned :", data);
      ret = data.json();
      return ret;
    })
    .catch((err) => {
      ret = false;
      console.log(err.message);
    });
  return ret;
};

const addAndGetCompanyIDAPICall = async (jwt, companyname) => {
  const url = process.env.REACT_APP_API + "company/addAndGetID";
  console.log("URL to add and get company id:", url);
  let ret;
  await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      companyName: companyname,
    }),
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((data) => {
      // data = data.json();
      console.log("Add Company and Get ID returned :", data);
      ret = data.json();
      return ret;
    })
    .catch((err) => {
      ret = false;
      console.log(err.message);
    });
  return ret;
};

const addHRsOfSameCompanyAPICall = async (jwt, hrList) => {
  const url = process.env.REACT_APP_API + "hr/addHRsOfSameCompany";
  // console.log("URL to add hr of same company:", url);
  let ret;
  console.log(hrList, JSON.stringify(hrList));
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(hrList),
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((data) => {
      // data = data.json();
      console.log("Add hrs of same company returned :", data);
      ret = data.json();
      return ret.ok;
    })
    .catch((err) => {
      ret = false;
      console.log(err.message);
    });
  return ret;
};

const getAllCompaniesAPICall = async (jwt) => {
  const url = process.env.REACT_APP_API + "company/find/all";
  // console.log("URL to find all companies", url);
  let ret;
  await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((data) => {
      // console.log("Get all companies returned:", data);
      ret = data.json();
    })
    .catch((err) => {
      ret = false;
      console.log(err.message);
    });
  return ret;
};

const getAllHrOfCompanyAPICall = async (jwt, companyName) => {
  const url =
    process.env.REACT_APP_API + "hr/find/company?companyName=" + companyName;
  // console.log("URL to find all Hr of a company:", url);
  let ret;
  await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((data) => {
      // console.log("Get all hrs of company returned:", data);
      ret = data.json();
      return ret.ok;
    })
    .catch((err) => {
      ret = false;
      console.log(err.message);
    });
  return ret;
};

const getAllRelevantJobsAPICall = async (jwt) => {
  const collegeEmail = jwt_decode(jwt).sub;
  const url =
    process.env.REACT_APP_API +
    "jobs/find/relevantJobsByEmail?collegeEmail=" +
    collegeEmail;
  // console.log("URL to find all relevant jobs :", url);
  let ret;
  await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then(async (data) => {
      ret = await data.json();
      // console.log("Get all relevant jobs returned:", ret);
      // return ret.ok;
    })
    .catch((err) => {
      ret = false;
      console.log(err.message);
    });
  console.log("Returned is :", ret);
  return ret;
};

const getJobStagesAPICall = async (jwt, jobId) => {
  const url = process.env.REACT_APP_API + "jobstages/getByJobId?jobId=" + jobId;
  let ret;
  await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then(async (data) => {
      ret = await data.json();
    })
    .catch((err) => {
      ret = false;
      console.log(err.message);
    });
  console.log("Returned is :", ret);
  let returnMap = new Map();
  let maxStage = 1;
  for (let i = 0; i < ret.length; ++i) {
    let val = ret[i];
    console.log("VAL :", val);
    let studentList;
    if (returnMap.has(val.stage)) {
      studentList = returnMap.get(val.stage);
    } else {
      studentList = [];
    }
    studentList.push({
      rollNumber: val.applicantRollNumber,
      name: val.applicantName,
      email: val.applicantCollegeEmail,
    });
    returnMap.set(val.stage, studentList);
    maxStage = maxStage > val.stage ? maxStage : val.stage;
  }
  console.log("return map :", returnMap);
  let stages = [];
  for (let stageNumber = 1; stageNumber <= maxStage; ++stageNumber) {
    let stage = {
      stageNumber: stageNumber,
      jobId: jobId,
      studentList: [...returnMap.get(stageNumber)],
    };
    stages.push(stage);
  }
  console.log(" RETURNING STAGES AS :", stages);
  return stages;
};
//  {
//         "jobStageID": 1,
//         "jobId": 11,
//         "stage": 1,
//         "applicantRollNumber": "123443",
//         "applicantCollegeEmail": "john3.doe@example.com",
//         "applicantName": "User"
//     },

const addNewJobStageAPICall = async (stage, jwt) => {
  const url =
    process.env.REACT_APP_API +
    "jobstages/add/studentsToNewStage?jobId=" +
    stage.jobId +
    "&stage=" +
    stage.stageNumber;

  console.log("Student list being sent :", JSON.stringify(stage.studentList));
  await fetch(url, {
    method: "POST",
    body: JSON.stringify([...stage.studentList]),
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((data) => {
      // data = data.json();
      console.log("Add new job stage returned :", data);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const sendEmailNotification = async (emailData,jwt) => {
  try {
    console.log(JSON.stringify(emailData));
    const response = await fetch(process.env.REACT_APP_API + "Email/sendMail", {
      method: "POST",
      body: JSON.stringify(emailData),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (response.ok) {
      return "Notification sent successfully!";
    } else {
      return "Failed to send notification. Please try again.";
    }
  } catch (error) {
    console.error("Error sending notification:", error);
    return "An error occurred while sending the notification.";
  }
};


export {
  loginAPICall,
  registerAPICall,
  addJobAPICall,
  getAllCompaniesAPICall,
  getAllHrOfCompanyAPICall,
  getCompanyIdAPICall,
  addAndGetCompanyIDAPICall,
  addHRsOfSameCompanyAPICall,
  getAllRelevantJobsAPICall,
  getJobStagesAPICall,
  addNewJobStageAPICall,
  sendEmailNotification,
};

// const getJobStagesAPICallOLD = async (jwt, jobId) => {
//   console.log("GETTING JOB STAGES");
//   let students = [
//     {
//       userId: 1,
//       rollNumber: "IMT2019001",
//       name: "John Doe",
//       email: "john.doe@example.com",
//     },
//     {
//       userId: 2,
//       rollNumber: "IMT2019001",
//       name: "Jane Smith",
//       email: "jane.smith@example.com",
//     },
//     {
//       userId: 3,
//       rollNumber: "IMT2019003",
//       name: "Bob Johnson",
//       email: "bob.johnson@example.com",
//     },
//     {
//       userId: 4,
//       rollNumber: "IMT2019004",
//       name: "Alice Williams",
//       email: "alice.williams@example.com",
//     },
//     {
//       userId: 5,
//       rollNumber: "IMT2019005",
//       name: "Chris Anderson",
//       email: "chris.anderson@example.com",
//     },
//   ];
//   let stages = [];
//   for (let i = 0; i < 1; ++i) {
//     let stage = {
//       stageNumber: i + 1,
//       jobId: jobId,
//       studentList: [...students],
//     };
//     stages.push(stage);
//     // students.pop();
//   }
//   return stages;
// };
