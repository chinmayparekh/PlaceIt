import WorkIcon from "@mui/icons-material/Work";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const SuperAdminTabs = [
    {
        text: "Jobs",
        path: "/jobs",
        icon: <WorkIcon sx={{ paddingRight: "2vw" }} />,
    },
    {
        text: "Calendar",
        path: "/calendar",
        icon: <EditCalendarIcon sx={{ paddingRight: "2vw" }} />,
    },
    {
        text: "Create Notification",
        path: "/createNotification",
        icon: <NotificationAddIcon sx={{ paddingRight: "2vw" }} />,
    },
    {
        text: "Job Profile",
        path: "/jobProfile",
        icon: <NotificationAddIcon sx={{ paddingRight: "2vw" }} />,
    },
    {
        text: "Register",
        path: "/register",
        icon: <NotificationAddIcon sx={{ paddingRight: "2vw" }} />,
    },
];

const AdminTabs = [
    {
        text: "Jobs",
        path: "/jobs",
        icon: <WorkIcon sx={{ paddingRight: "2vw" }} />,
    },
    {
        text: "Calendar",
        path: "/calendar",
        icon: <EditCalendarIcon sx={{ paddingRight: "2vw" }} />,
    },
    {
        text: "Create Notification",
        path: "/createNotification",
        icon: <NotificationAddIcon sx={{ paddingRight: "2vw" }} />,
    },
    {
        text: "Job Profile",
        path: "/jobProfile",
        icon: <NotificationAddIcon sx={{ paddingRight: "2vw" }} />,
    },
];

const UserTabs = [
    {
        text: "Job Profile",
        path: "/jobProfile",
        icon: <NotificationAddIcon sx={{ paddingRight: "2vw" }} />,
    },
    {
        text: "Calendar",
        path: "/calendar",
        icon: <EditCalendarIcon sx={{ paddingRight: "2vw" }} />,
    },
];
  
const Settings = [
    {
        text: "Profile",
        path: "/profile",
        icon: <PersonIcon sx={{ paddingRight: "2vw" }} />,
    },
    {
        text: "Settings",
        path: "/settings",
        icon: <SettingsIcon sx={{ paddingRight: "2vw" }} />,
    },
    {
        text: "Log Out",
        path: "/login",
        icon: <LogoutIcon sx={{ paddingRight: "2vw" }} />,
    },
];

export {Settings, AdminTabs, SuperAdminTabs, UserTabs};