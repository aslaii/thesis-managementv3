import React from "react";
import { Modal, Box, Typography, Stack, IconButton, LinearProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SchoolIcon from "@mui/icons-material/School";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ClassIcon from "@mui/icons-material/Class";
import CodeIcon from "@mui/icons-material/Code";
import GroupIcon from "@mui/icons-material/Group";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BarChartIcon from "@mui/icons-material/BarChart";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "calc(100% - 40px)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const ViewThesisModal = ({ open, handleClose, thesisData }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="thesis-view-title"
      aria-describedby="thesis-view-description"
    >
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography id="thesis-view-title" variant="h6" component="h2">
          Thesis Details
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ my: 1 }}>
            <CalendarTodayIcon color="primary" />
            <Typography>Year: {thesisData?.year}</Typography>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ my: 1 }}>
            <SchoolIcon color="primary" color="primary" />
            <Typography>Term: {thesisData?.term}</Typography>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ my: 1 }}>
            <ClassIcon color="primary" />
            <Typography>Program: {thesisData?.program}</Typography>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ my: 1 }}>
            <CodeIcon color="primary" />
            <Typography>Course Code: {thesisData?.course_code}</Typography>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ my: 1 }}>
            <GroupIcon color="primary" />
            <Typography>Section: {thesisData?.section}</Typography>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ my: 1 }}>
            <SupervisorAccountIcon color="primary" />
            <Typography>Course Coordinator: {thesisData?.course_coordinator}</Typography>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ my: 1 }}>
            <AssignmentIcon color="primary" />
            <Typography>Group Code: {thesisData?.group_code}</Typography>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ my: 1 }}>
            <SpeakerNotesIcon color="primary" />
            <Typography>Topic Title: {thesisData?.topic_title}</Typography>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ my: 1 }}>
            <PeopleIcon color="primary" />
            <Typography>Group Members: {thesisData?.group_members}</Typography>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ my: 1 }}>
            <SupervisorAccountIcon color="primary" />
            <Typography>Advisers: {thesisData?.advisers}</Typography>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ my: 1 }}>
            <PeopleIcon color="primary" />
            <Typography>Panel Members: {thesisData?.panel_members}</Typography>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ my: 1 }}>
            <CheckCircleIcon color="primary" />
            <Typography>Remarks: {thesisData?.remarks}</Typography>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ my: 1 }}>
            <BarChartIcon color="primary" />
            <Typography>Progress: </Typography>
            <LinearProgressWithLabel value={thesisData?.progress} sx={{ width: 100 }} />
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

export default ViewThesisModal;
