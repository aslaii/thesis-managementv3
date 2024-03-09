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
  InputAdornment,
} from "@mui/material";

import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";

// Assuming you've imported the editThesis function correctly
import { editThesis } from "src/utils/thesis";

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

const ThesisModal = ({ open, handleClose, thesisData, onSubmit, isEdit = false }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
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
    remarks: "",
    progress: 0,
  });

  useEffect(() => {
    if (isEdit && thesisData) {
      setFormData(thesisData);
    } else {
      setFormData({
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
        remarks: "",
        progress: 0,
      });
    }
  }, [thesisData, isEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit && thesisData?.id) {
      await editThesis(thesisData.id, formData); // Use editThesis for updating
    } else {
      onSubmit(formData); // Fallback or different logic for adding
    }
    setOpenSuccessSnackbar(true);
    handleClose();
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {isEdit ? "Edit Thesis" : "Add Thesis"}
          </Typography>
          <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                {/* Year Dropdown Selector */}
                <FormControl style={{ width: "100px" }} margin="normal">
                  <InputLabel>Year</InputLabel>
                  <Select
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    label="Year"
                  >
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
                  <Select
                    name="term"
                    value={formData.term}
                    onChange={handleInputChange}
                    label="Term"
                  >
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
              {isEdit && (
                <>
                  <Grid item xs={12}>
                    {/* Remarks Input */}
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Remarks"
                      name="remarks"
                      value={formData.remarks}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {/* Progress Input */}
                    <TextField
                      fullWidth
                      type="number"
                      margin="normal"
                      label="Progress"
                      name="progress"
                      value={formData.progress}
                      onChange={handleInputChange}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        inputProps: { min: 0, max: 100 },
                      }}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <Button type="submit" variant="contained" sx={{ mt: 3 }}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSuccessSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSuccessSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {isEdit ? "Thesis successfully updated." : "Thesis successfully added."}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ThesisModal;
