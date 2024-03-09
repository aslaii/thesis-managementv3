import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { DataGrid } from "@mui/x-data-grid";
import ThesisModal from "src/sections/thesis/thesis-modal";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  viewAllThesisRealtime,
  addThesis,
  viewThesis,
  deleteThesis,
  editThesis,
} from "src/utils/thesis";

const Page = () => {
  const [openModal, setOpenModal] = useState(false);
  const [theses, setTheses] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editingThesis, setEditingThesis] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedIdForDelete, setSelectedIdForDelete] = useState(null);

  const handleSubmitThesis = async (formData) => {
    if (isEdit && editingThesis) {
      await editThesis(editingThesis.id, formData);
      // Optimistically update the UI
      setTheses(
        theses.map((t) =>
          t.id === editingThesis.id ? { ...t, ...formData, createdAt: t.createdAt } : t
        )
      );
    } else {
      const newThesis = await addThesis(formData);
      // Assuming addThesis returns the new thesis with its ID
      setTheses([
        ...theses,
        {
          ...newThesis,
          createdAt: new Date(newThesis.created_at.seconds * 1000).toLocaleDateString(),
        },
      ]);
    }
    handleCloseModal();
  };

  useEffect(() => {
    const unsubscribe = viewAllThesisRealtime((newTheses) => {
      setTheses(newTheses);
    });

    return () => unsubscribe();
  }, []);

  const handleOpenModal = (editMode = false, thesisData = null) => {
    setIsEdit(editMode);
    setEditingThesis(thesisData);
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleDeleteOpen = (id) => {
    setSelectedIdForDelete(id);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleDelete = () => {
    deleteThesis(selectedIdForDelete);
    setDeleteOpen(false);
  };

  const columns = [
    {
      field: "Actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Stack direction="row" spacing={0}>
          <IconButton
            color="primary"
            onClick={() => {
              /* handle view action */
              console.log(params.row.id);
            }}
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => {
              const thesisData = theses.find((thesis) => thesis.id === params.row.id);
              handleOpenModal(true, thesisData);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => {
              /* handle delete action */
              handleDeleteOpen(params.row.id);
              console.log(params.row.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
    { field: "group_members", headerName: "Group Members", width: 200 },
    { field: "topic_title", headerName: "Title", width: 200 },
    { field: "advisers", headerName: "Adviser", width: 150 },
    { field: "createdAt", headerName: "Started At", width: 150 },
    { field: "progress", headerName: "Progress", width: 150 },
    { field: "remarks", headerName: "Remarks", width: 150 },
  ];

  return (
    <>
      <Head>
        <title>Thesis Manager</title>
      </Head>
      <Dialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Typography variant="h4">Thesis Manager</Typography>
              <Button
                startIcon={
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                }
                variant="contained"
                onClick={() => handleOpenModal(false, null)}
              >
                Add Thesis
              </Button>
            </Stack>
            <div style={{ height: "calc(100vh - 225px)", width: "100%" }}>
              <DataGrid rows={theses} columns={columns} />
            </div>
          </Stack>
        </Container>
      </Box>
      <ThesisModal
        open={openModal}
        handleClose={handleCloseModal}
        onSubmit={handleSubmitThesis}
        isEdit={isEdit}
        thesisData={editingThesis}
      />
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
