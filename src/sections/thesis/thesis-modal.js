import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SvgIcon,
  Grid,
} from "@mui/material";

// Modal style
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

const ThesisModal = ({ open, handleClose, thesisData, onSubmit }) => {
  const [formData, setFormData] = useState({
    year: "",
    term: "",
    program: "",
    course_code: "",
    section: "",
    course_coordinator: "",
    group_code: "",
    topic_title: "",
    group_members: "",
    advisers: "",
    panel_members: "",
  });

  useEffect(() => {
    // If thesisData is provided, populate the form for editing
    if (thesisData) {
      setFormData(thesisData);
    }
  }, [thesisData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {thesisData ? "Edit Thesis" : "Add Thesis"}
        </Typography>
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              {/* Year Dropdown Selector */}
              <FormControl style={{ width: "100px" }} margin="normal">
                <InputLabel>Year</InputLabel>
                <Select name="year" value={formData.year} onChange={handleInputChange} label="Year">
                  {Array.from({ length: 11 }, (_, i) => 2015 + i).map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              {/* Term Dropdown */}
              <FormControl style={{ width: "100px", marginLeft: "10px" }} margin="normal">
                <InputLabel>Term</InputLabel>
                <Select name="term" value={formData.term} onChange={handleInputChange} label="Term">
                  {["1T", "2T", "3T", "4T"].map((term) => (
                    <MenuItem key={term} value={term}>
                      {term}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              {/* Program Dropdown */}
              <FormControl style={{ width: "100px", marginLeft: "10px" }} margin="normal">
                <InputLabel>Program</InputLabel>
                <Select
                  name="program"
                  value={formData.program}
                  onChange={handleInputChange}
                  label="Program"
                >
                  {["COE", "CHE", "IT", "CS", "ME", "IE"].map((program) => (
                    <MenuItem key={program} value={program}>
                      {program}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              {/* Course Code Input */}
              <TextField
                fullWidth
                margin="normal"
                label="Course Code"
                name="course_code"
                value={formData.course_code}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              {/* Section Input */}
              <TextField
                fullWidth
                margin="normal"
                label="Section"
                name="section"
                value={formData.section}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              {/* Course Coordinator Input */}
              <TextField
                fullWidth
                margin="normal"
                label="Course Coordinator"
                name="course_coordinator"
                value={formData.course_coordinator}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              {/* Group Code Input */}
              <TextField
                fullWidth
                margin="normal"
                label="Group Code"
                name="group_code"
                value={formData.group_code}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              {/* Topic Title Input */}
              <TextField
                fullWidth
                margin="normal"
                label="Topic Title"
                name="topic_title"
                value={formData.topic_title}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              {/* Group Members Input */}
              <TextField
                fullWidth
                margin="normal"
                label="Group Members"
                name="group_members"
                value={formData.group_members}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              {/* Advisers Input */}
              <TextField
                fullWidth
                margin="normal"
                label="Advisers"
                name="advisers"
                value={formData.advisers}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              {/* Panel Members Input */}
              <TextField
                fullWidth
                margin="normal"
                label="Panel Members"
                name="panel_members"
                value={formData.panel_members}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" sx={{ mt: 3 }}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default ThesisModal;

// Example usage in a parent component
// const [openModal, setOpenModal] = useState(false);
// const handleOpenModal = () => setOpenModal(true);
// const handleCloseModal = () => setOpenModal(false);
// const handleSubmitThesis = (formData) => {
//   console.log(formData);
//   // Here you'd call the addThesis or editThesis util function
// };
// <Button
//   startIcon={<SvgIcon fontSize="small"><PlusIcon /></SvgIcon>}
//   variant="contained"
//   onClick={handleOpenModal}
// >
//   Add
// </Button>
// <ThesisModal open={openModal} handleClose={handleCloseModal} onSubmit={handleSubmitThesis} />
